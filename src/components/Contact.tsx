import { useState } from 'react';
import { Mail, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useReveal } from '../hooks/useReveal';

const FOCI = ['Web Application', 'Infrastructure', 'Mobile Dev', 'Legacy Migration'] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [company, setCompany] = useState('');
  const [focus, setFocus] = useState<string>('Web Application');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) {
      setStatus('error');
      setError('Please enter your company name.');
      return;
    }
    setStatus('submitting');
    setError('');
    const { error: dbError } = await supabase
      .from('project_inquiries')
      .insert({ company_name: company.trim(), project_focus: focus, message: message.trim() || null });
    if (dbError) {
      setStatus('error');
      setError('Something went wrong submitting your inquiry. Please try again.');
      return;
    }
    setStatus('success');
    setCompany('');
    setMessage('');
  };

  return (
    <section className="py-stack-lg px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} glass-panel rounded-[48px] p-12 lg:p-20 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-md relative z-10">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
              Let's build something <br /> amazing together.
            </h2>
            <p className="font-body-md text-on-surface-variant text-lg mb-10 max-w-md">
              Tell us about your project and we'll have a technical lead reach out to you within 24 hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={22} />
                </div>
                <span className="text-on-surface-variant font-medium">engineering@sk.io</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone size={22} />
                </div>
                <span className="text-on-surface-variant font-medium">+1 (555) 000-0000</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-10 rounded-[32px] shadow-sm border border-white">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 className="text-green-500 mb-4" size={56} />
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">Inquiry received</h3>
                <p className="text-on-surface-variant font-body-md">
                  Thanks — a technical lead will reach out within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-primary font-semibold hover:underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block font-label-sm mb-2 text-on-surface-variant">Step 1: Your Business</label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary transition-all text-on-surface outline-none"
                    placeholder="Company Name"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-sm mb-2 text-on-surface-variant">Step 2: Project Focus</label>
                  <div className="grid grid-cols-2 gap-4">
                    {FOCI.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFocus(f)}
                        className={`p-4 rounded-2xl text-center font-semibold text-sm transition-all ${
                          focus === f
                            ? 'border-2 border-primary bg-primary/5 text-primary'
                            : 'border-2 border-surface-container-highest text-on-surface-variant hover:border-primary'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm mb-2 text-on-surface-variant">Step 3: Tell us more</label>
                  <textarea
                    className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary transition-all text-on-surface outline-none resize-none"
                    placeholder="Tell us about the challenges you're facing..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-error text-sm">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    'Next: Schedule Meeting'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
