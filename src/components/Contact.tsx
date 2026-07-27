import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Send,
  User,
  Building2,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Clock,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useReveal } from '../hooks/useReveal';

const SERVICE_OPTIONS = [
  'Cloud Infrastructure & Migration',
  'Custom ERP / Enterprise System',
  'Modern Web / Mobile Application',
  'DevOps & System Architecture',
  'General Technical Inquiry',
];

export default function Contact() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [message, setMessage] = useState('');

  // Status
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    setError('');

    const formattedCompany = company.trim() ? `${company.trim()} (${name.trim()})` : name.trim();
    const generatedId = `NBX-${Math.floor(100000 + Math.random() * 900000)}`;

    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setInquiryId(generatedId);
        setSubmitting(false);
        setSubmitted(true);
      }, 600);
      return;
    }

    try {
      const { error: dbError } = await supabase.from('project_inquiries').insert({
        company_name: formattedCompany,
        project_focus: service,
        message: `Email: ${email} | Service: ${service} | Message: ${message}`,
      });

      if (dbError) {
        console.error('Supabase Error:', dbError);
        setError('Failed to record inquiry. Please try again.');
        setSubmitting(false);
        return;
      }

      setInquiryId(generatedId);
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission Exception:', err);
      setError('An unexpected error occurred. Please try again later.');
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setService(SERVICE_OPTIONS[0]);
    setMessage('');
    setSubmitted(false);
    setInquiryId('');
    setError('');
  };

  return (
    <section id="contact" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto space-y-10">
      {/* Header */}
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} text-center space-y-3 max-w-3xl mx-auto mb-4`}>
        <h1 className="font-headline-lg text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
          Get in touch with our team
        </h1>
        <p className="font-body-md text-on-surface-variant text-base lg:text-lg">
          Tell us about your project requirements or technical challenges and our engineering team will respond within 24 hours.
        </p>
      </div>

      {submitted ? (
        /* Contact Confirmation Screen */
        <div className="apple-liquid-glass max-w-2xl mx-auto rounded-[40px] p-8 sm:p-12 border border-white/90 shadow-2xl bg-white/90 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
            <CheckCircle2 size={44} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              CONFIRMATION #{inquiryId}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Inquiry Submitted Successfully!
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-md mx-auto leading-relaxed pt-1">
              Thank you, <strong className="text-slate-900">{name}</strong>. We have received your details and our lead architects will reach out to <strong className="text-slate-900">{email}</strong> within 24 hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 text-sm">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase">SUMMARY</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <div><span className="font-semibold text-slate-900">Service:</span> {service}</div>
              {company && <div><span className="font-semibold text-slate-900">Company:</span> {company}</div>}
              <div className="col-span-full"><span className="font-semibold text-slate-900">Message:</span> {message}</div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              <span>Send Another Message</span>
            </button>
            <Link
              to="/services"
              className="w-full sm:w-auto apple-liquid-cta-btn px-6 py-3 rounded-full text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md"
            >
              <span>Explore Services</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        /* Simple Contact Form Screen */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="apple-liquid-glass p-8 rounded-[40px] border border-white/90 shadow-md bg-white/90 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Contact Information</h3>
              <div className="space-y-5 text-sm text-slate-600 font-medium">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">EMAIL US</div>
                    <a href="mailto:contact@xublix.com" className="text-slate-900 font-bold hover:text-primary transition-colors">
                      contact@xublix.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">RESPONSE TIME</div>
                    <div className="text-slate-900 font-bold">Within 24 Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="apple-liquid-glass p-8 sm:p-10 rounded-[40px] border border-white/90 shadow-xl bg-white/90 space-y-6">
              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2">
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} className="text-slate-500" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200 text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail size={14} className="text-slate-500" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200 text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 size={14} className="text-slate-500" />
                    <span>Company Name</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp (Optional)"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200 text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                  />
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Primary Interest
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200 text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-slate-500" />
                  <span>Project Overview / Message *</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project requirements, goals, or technical challenges..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200 text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full apple-liquid-cta-btn py-4 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
