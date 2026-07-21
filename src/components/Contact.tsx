import { useState } from 'react';
import {
  Building2,
  FolderKanban,
  Wrench,
  DollarSign,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Mail,
  Phone,
  User,
  Send,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useReveal } from '../hooks/useReveal';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const BUSINESS_TYPES = [
  { id: 'enterprise', label: 'Enterprise / Global Brand', desc: 'Established organization with multi-region scaling requirements.' },
  { id: 'startup', label: 'Tech Startup / Scale-up', desc: 'Fast-moving company building core product infrastructure.' },
  { id: 'smb', label: 'Small / Medium Business', desc: 'Growing business modernizing digital operations.' },
  { id: 'agency', label: 'Agency / Technical Partner', desc: 'Delivering complex client systems with specialized talent.' },
];

const PROJECT_CATEGORIES = [
  { id: 'cloud_infra', label: 'Cloud Infrastructure & IaC', desc: 'AWS/GCP architectures, Terraform provisioning, high availability.' },
  { id: 'web_app', label: 'Modern Web Application', desc: 'High-performance React/TypeScript web apps and scalable APIs.' },
  { id: 'devops_k8s', label: 'DevOps & Kubernetes Automation', desc: 'CI/CD pipelines, container orchestration, cluster management.' },
  { id: 'legacy_migration', label: 'Legacy Migration & Refactoring', desc: 'Migrating monoliths to cloud-native microservices.' },
];

const TECH_REQUIREMENTS = [
  'AWS',
  'Docker',
  'Kubernetes',
  'Terraform',
  'React / TypeScript',
  'Node.js / Express',
  'Python / FastAPI',
  'Supabase / PostgreSQL',
  'Redis / Caching',
  'Datadog / Prometheus',
];

const BUDGET_RANGES = [
  { id: 'b1', label: '$10,000 – $25,000', desc: 'Initial discovery, architecture MVP, or single-system optimization.' },
  { id: 'b2', label: '$25,000 – $50,000', desc: 'Complete production platform or multi-service migration.' },
  { id: 'b3', label: '$50,000 – $100,000', desc: 'Enterprise-grade cloud infrastructure and multi-region deployment.' },
  { id: 'b4', label: '$100,000+', desc: 'Full custom digital transformation & dedicated engineering team.' },
];

const TIMELINES = [
  { id: 't1', label: 'Urgent (< 1 Month)', desc: 'Accelerated sprint for critical launches or system fixes.' },
  { id: 't2', label: 'Standard (1 – 3 Months)', desc: 'Optimal timeline for end-to-end architecture & delivery.' },
  { id: 't3', label: 'Strategic (3 – 6 Months)', desc: 'Phased roadmap deployment with multi-milestone validation.' },
  { id: 't4', label: 'Flexible Roadmap', desc: 'Ongoing advisory & continuous engineering iterations.' },
];

const TIME_SLOTS = [
  '09:00 AM EST',
  '11:00 AM EST',
  '02:00 PM EST',
  '04:00 PM EST',
];

export default function Contact() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Form State
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0].label);
  const [projectCategory, setProjectCategory] = useState(PROJECT_CATEGORIES[0].label);
  const [selectedTech, setSelectedTech] = useState<string[]>(['AWS', 'Kubernetes', 'Terraform']);
  const [budget, setBudget] = useState(BUDGET_RANGES[1].label);
  const [timeline, setTimeline] = useState(TIMELINES[1].label);

  // Contact & Meeting Info
  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState(TIME_SLOTS[0]);

  // Submission Status
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1 && currentStep < 7) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !email.trim()) {
      setError('Please fill in your name, company name, and email address.');
      return;
    }

    setSubmitting(true);
    setError('');

    const formattedMessage = `Contact: ${contactName} (${email}) | Tech Stack: ${selectedTech.join(
      ', '
    )} | Meeting Scheduled: ${meetingDate || 'TBD'} at ${meetingTime}`;

    const formattedFocus = `${businessType} | ${projectCategory} | Budget: ${budget} | Timeline: ${timeline}`;

    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured. Simulating project planner submission.');
      setTimeout(() => {
        setInquiryId(`SK-INQ-${Math.floor(100000 + Math.random() * 900000)}`);
        setSubmitting(false);
        setCurrentStep(7);
      }, 700);
      return;
    }

    try {
      const { error: dbError } = await supabase.from('project_inquiries').insert({
        company_name: `${companyName.trim()} (${contactName.trim()})`,
        project_focus: formattedFocus,
        message: formattedMessage,
      });

      if (dbError) {
        console.error('Supabase Error:', dbError);
        setError('Failed to record inquiry in database. Please try again.');
        setSubmitting(false);
        return;
      }

      setInquiryId(`SK-INQ-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitting(false);
      setCurrentStep(7);
    } catch (err) {
      console.error('Submission Exception:', err);
      setError('An unexpected error occurred. Please try again later.');
      setSubmitting(false);
    }
  };

  const resetPlanner = () => {
    setCurrentStep(1);
    setCompanyName('');
    setContactName('');
    setEmail('');
    setMeetingDate('');
    setError('');
  };

  const stepsList = [
    { num: 1, label: 'Business' },
    { num: 2, label: 'Category' },
    { num: 3, label: 'Tech Stack' },
    { num: 4, label: 'Budget' },
    { num: 5, label: 'Timeline' },
    { num: 6, label: 'Meeting' },
    { num: 7, label: 'Confirmation' },
  ];

  return (
    <section id="contact" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
      <div ref={ref} className={`reveal ${shown ? 'reveal-shown' : 'reveal-hidden'} space-y-stack-md`}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-label-sm">
            <Sparkles size={16} />
            <span>PREMIUM PROJECT PLANNER</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Architect your project <br />
            <span className="text-primary italic">in 7 streamlined steps.</span>
          </h2>
          <p className="font-body-md text-on-surface-variant text-lg">
            Configure your technical requirements, budget, and timeline to instantly schedule a lead architecture review.
          </p>
        </div>

        {/* 7-Step Progress Stepper */}
        <div className="glass-panel p-6 rounded-[32px] bg-white/80 border border-white max-w-4xl mx-auto overflow-x-auto">
          <div className="flex items-center justify-between min-w-[640px] px-4">
            {stepsList.map((st, i) => (
              <div key={st.num} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStep === st.num
                        ? 'bg-primary text-on-primary ring-4 ring-primary/20 scale-110'
                        : currentStep > st.num
                        ? 'bg-green-500 text-white'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                  >
                    {currentStep > st.num ? <CheckCircle2 size={20} /> : st.num}
                  </div>
                  <span className={`text-[11px] font-semibold ${currentStep === st.num ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {st.label}
                  </span>
                </div>
                {i < stepsList.length - 1 && (
                  <div
                    className={`h-0.5 w-10 md:w-16 mx-2 transition-all ${
                      currentStep > st.num ? 'bg-green-500' : 'bg-surface-container-highest'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content Container */}
        <div className="glass-panel p-8 lg:p-14 rounded-[48px] bg-white/90 border border-white max-w-4xl mx-auto shadow-lg relative min-h-[500px] flex flex-col justify-between">
          {/* STEP 1: BUSINESS TYPE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Building2 size={28} />
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface">Step 1: Select Business Type</h3>
              </div>
              <p className="text-on-surface-variant text-sm">Tell us about your organization format so we can tailor infrastructure expectations.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {BUSINESS_TYPES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBusinessType(b.label)}
                    className={`p-6 rounded-3xl text-left transition-all border-2 flex flex-col justify-between ${
                      businessType === b.label
                        ? 'border-primary bg-primary/5 text-primary shadow-md'
                        : 'border-surface-container-highest bg-white text-on-surface hover:border-primary/50'
                    }`}
                  >
                    <div>
                      <h4 className="font-headline-lg text-lg font-bold mb-2 text-on-surface">{b.label}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{b.desc}</p>
                    </div>
                    {businessType === b.label && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                        <CheckCircle2 size={16} /> Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: PROJECT CATEGORY */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <FolderKanban size={28} />
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface">Step 2: Project Category</h3>
              </div>
              <p className="text-on-surface-variant text-sm">Choose the primary focus area for your technical engagement.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {PROJECT_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setProjectCategory(c.label)}
                    className={`p-6 rounded-3xl text-left transition-all border-2 flex flex-col justify-between ${
                      projectCategory === c.label
                        ? 'border-primary bg-primary/5 text-primary shadow-md'
                        : 'border-surface-container-highest bg-white text-on-surface hover:border-primary/50'
                    }`}
                  >
                    <div>
                      <h4 className="font-headline-lg text-lg font-bold mb-2 text-on-surface">{c.label}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{c.desc}</p>
                    </div>
                    {projectCategory === c.label && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                        <CheckCircle2 size={16} /> Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: TECHNOLOGY REQUIREMENTS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Wrench size={28} />
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface">Step 3: Technology Requirements</h3>
              </div>
              <p className="text-on-surface-variant text-sm">Select the technologies, cloud providers, or tooling required for your system (Multi-select).</p>

              <div className="flex flex-wrap gap-3 pt-4">
                {TECH_REQUIREMENTS.map((tech) => {
                  const isSelected = selectedTech.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`px-5 py-3 rounded-2xl font-semibold text-sm transition-all border-2 flex items-center gap-2 ${
                        isSelected
                          ? 'border-primary bg-primary text-on-primary shadow-md scale-105'
                          : 'border-surface-container-highest bg-white text-on-surface-variant hover:border-primary'
                      }`}
                    >
                      {isSelected ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border border-current opacity-40" />}
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: BUDGET */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <DollarSign size={28} />
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface">Step 4: Budget Range</h3>
              </div>
              <p className="text-on-surface-variant text-sm">Select your target budget range to calibrate architectural scope and resource allocation.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {BUDGET_RANGES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBudget(b.label)}
                    className={`p-6 rounded-3xl text-left transition-all border-2 flex flex-col justify-between ${
                      budget === b.label
                        ? 'border-primary bg-primary/5 text-primary shadow-md'
                        : 'border-surface-container-highest bg-white text-on-surface hover:border-primary/50'
                    }`}
                  >
                    <div>
                      <h4 className="font-headline-lg text-xl font-bold mb-2 text-on-surface">{b.label}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{b.desc}</p>
                    </div>
                    {budget === b.label && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                        <CheckCircle2 size={16} /> Selected Range
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: TIMELINE */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Clock size={28} />
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface">Step 5: Delivery Timeline</h3>
              </div>
              <p className="text-on-surface-variant text-sm">Specify your urgency or target launch date for initial delivery.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {TIMELINES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTimeline(t.label)}
                    className={`p-6 rounded-3xl text-left transition-all border-2 flex flex-col justify-between ${
                      timeline === t.label
                        ? 'border-primary bg-primary/5 text-primary shadow-md'
                        : 'border-surface-container-highest bg-white text-on-surface hover:border-primary/50'
                    }`}
                  >
                    <div>
                      <h4 className="font-headline-lg text-lg font-bold mb-2 text-on-surface">{t.label}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{t.desc}</p>
                    </div>
                    {timeline === t.label && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                        <CheckCircle2 size={16} /> Selected Timeline
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: MEETING & CONTACT DETAILS */}
          {currentStep === 6 && (
            <form onSubmit={handleScheduleMeeting} className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Calendar size={28} />
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface">Step 6: Schedule Technical Meeting</h3>
              </div>
              <p className="text-on-surface-variant text-sm">Provide your contact info and pick a convenient time for a 30-minute discovery call.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 flex items-center gap-1.5">
                    <User size={14} /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-highest rounded-2xl px-5 py-3.5 text-on-surface outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 flex items-center gap-1.5">
                    <Building2 size={14} /> Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Cloud Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-highest rounded-2xl px-5 py-3.5 text-on-surface outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 flex items-center gap-1.5">
                    <Mail size={14} /> Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-highest rounded-2xl px-5 py-3.5 text-on-surface outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 flex items-center gap-1.5">
                    <Calendar size={14} /> Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-highest rounded-2xl px-5 py-3.5 text-on-surface outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 flex items-center gap-1.5">
                    <Clock size={14} /> Time Slot
                  </label>
                  <select
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-highest rounded-2xl px-5 py-3.5 text-on-surface outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-error text-sm p-4 bg-error/10 rounded-2xl">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-3 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Submitting Inquiry...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Confirm &amp; Schedule Meeting
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 7: CONFIRMATION */}
          {currentStep === 7 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                <CheckCircle2 size={56} />
              </div>

              <div className="space-y-2">
                <span className="px-4 py-1.5 bg-green-500/10 text-green-600 rounded-full font-mono text-xs font-bold">
                  {inquiryId || 'SK-INQ-CONFIRMED'}
                </span>
                <h3 className="font-headline-lg text-3xl font-bold text-on-surface">Project Inquiry Confirmed!</h3>
                <p className="text-on-surface-variant max-w-lg mx-auto">
                  Thank you <span className="font-semibold text-on-surface">{contactName}</span>. A calendar invitation and preliminary architecture review document have been sent to <span className="font-semibold text-on-surface">{email}</span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-surface-container-low p-6 rounded-3xl border border-surface-container-highest max-w-2xl mx-auto text-left space-y-4 text-sm">
                <h4 className="font-bold text-on-surface text-base border-b border-surface-container-highest pb-3">Inquiry Specification Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-on-surface-variant block">Business Type</span>
                    <span className="font-semibold text-on-surface">{businessType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block">Category</span>
                    <span className="font-semibold text-on-surface">{projectCategory}</span>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block">Target Budget</span>
                    <span className="font-semibold text-on-surface">{budget}</span>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block">Timeline</span>
                    <span className="font-semibold text-on-surface">{timeline}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs text-on-surface-variant block">Tech Stack</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedTech.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 bg-white text-primary text-xs font-semibold rounded-md border border-primary/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2 pt-2 border-t border-surface-container-highest flex justify-between items-center text-xs">
                    <span>Meeting Slot: <strong className="text-on-surface">{meetingDate || 'Next Available'} ({meetingTime})</strong></span>
                    <span className="text-green-600 font-bold">Lead Lead Assigned</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={resetPlanner}
                  className="px-8 py-3.5 rounded-2xl bg-primary text-on-primary font-bold text-sm hover:scale-105 transition-all shadow-md"
                >
                  Configure Another Project
                </button>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons (Steps 1 to 5) */}
          {currentStep < 6 && (
            <div className="flex justify-between items-center pt-8 border-t border-surface-container-highest/60 mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 rounded-2xl border border-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-container-low transition-all flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft size={18} /> Back
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-8 py-3.5 rounded-2xl bg-primary text-on-primary font-bold text-sm hover:scale-105 transition-all shadow-md flex items-center gap-2"
              >
                Next Step <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
