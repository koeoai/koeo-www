"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

interface CareerFormData {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  currentRole: string;
  yearsExperience: string;
  areasOfInterest: string[];
  whyKoeo: string;
  whatYouBring: string;
  resumeFileName: string;
  resumeBase64: string;
  anythingElse: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

const EXPERIENCE_OPTIONS = [
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "10+", label: "10+ years" },
];

const INTEREST_OPTIONS = [
  { value: "Engineering", label: "Engineering" },
  { value: "Product", label: "Product" },
  { value: "Design", label: "Design" },
  { value: "Operations", label: "Operations" },
  { value: "Sales & Partnerships", label: "Sales & Partnerships" },
  { value: "Marketing", label: "Marketing" },
  { value: "Other", label: "Other" },
];

const INITIAL_FORM_DATA: CareerFormData = {
  fullName: "",
  email: "",
  phone: "",
  linkedIn: "",
  portfolio: "",
  currentRole: "",
  yearsExperience: "",
  areasOfInterest: [],
  whyKoeo: "",
  whatYouBring: "",
  resumeFileName: "",
  resumeBase64: "",
  anythingElse: "",
};

export default function CareersPage() {
  const [formData, setFormData] = useState<CareerFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const updateField = (field: keyof CareerFormData) => (value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, resume: "Please upload a PDF or Word document" }));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: "File size must be less than 5MB" }));
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setFormData((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeBase64: base64,
      }));
      if (errors.resume) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.areasOfInterest.length === 0) newErrors.areasOfInterest = "Please select at least one area";
    if (!formData.whyKoeo.trim()) newErrors.whyKoeo = "Please tell us why you're interested in Koeo";
    if (!formData.whatYouBring.trim()) newErrors.whatYouBring = "Please tell us what you'd bring to the team";
    if (!formData.resumeBase64) newErrors.resume = "Please upload your resume";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState("submitting");
    try {
      const response = await fetch("/api/career-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setFormState("success");
      setFormData(INITIAL_FORM_DATA);
    } catch {
      setFormState("error");
    }
  };

  const GlassCard = ({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-purple-primary/20 via-magenta/20 to-pink-light/20" />
      </div>
      <div className="relative">
        <div className="mb-6 border-b border-white/10 pb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {description && <p className="mt-1 text-sm text-white/60">{description}</p>}
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 overflow-hidden">
        {/* Gradient Background with Neural Network - same as about page */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #2D1B4E 0%, #4C1D95 30%, #5B21B6 60%, #7C3AED 100%)"
            }}
          />
          <NetworkBackground variant="dark" density="normal" />
        </div>

        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-8 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                Careers at Koeo
              </div>

              {/* Headline */}
              <h1 className="animate-fade-in-up mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
                Build the future of{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  AI infrastructure
                </span>
              </h1>

              {/* Subtext */}
              <p className="animate-fade-in-up mx-auto max-w-2xl text-lg text-white/70 sm:text-xl" style={{ animationDelay: "200ms" }}>
                We&apos;re not actively hiring right now, but we&apos;re always interested in meeting talented people who share our mission.
              </p>
            </div>
          </Container>
        </section>

        {/* Not Hiring Notice */}
        <section className="relative py-12">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-pink-light/30 bg-purple-deep/30 p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-white">No open positions right now</h2>
                    <p className="text-white/70">
                      While we don&apos;t have any active roles at the moment, we&apos;re always excited to connect with exceptional people. 
                      If you&apos;re passionate about AI infrastructure and think you&apos;d be a great fit, we&apos;d love to hear from you. 
                      Submit your information below and we&apos;ll keep you in mind for future opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Form Section */}
        <section className="relative py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              {/* Header */}
              <div className="mb-12 text-center">
                <h2 className="bg-gradient-to-r from-white via-pink-light to-white bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  Express your interest
                </h2>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
                  <span className="text-lg">🔒</span>
                  Your information is kept confidential
                </div>
              </div>

              {formState === "success" ? (
                <div className="rounded-3xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-xl">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta shadow-lg shadow-magenta/30">
                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white">Thanks for your interest!</h3>
                  <p className="text-lg text-white/70">
                    We&apos;ve received your application and will keep it on file. If a role opens up that matches your profile, we&apos;ll be in touch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <GlassCard title="Contact information" description="How can we reach you?">
                    <FormField
                      id="fullName"
                      label="Full name"
                      placeholder="Jane Smith"
                      required
                      value={formData.fullName}
                      onChange={updateField("fullName")}
                      error={errors.fullName}
                      variant="glass"
                    />
                    <FormField
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      value={formData.email}
                      onChange={updateField("email")}
                      error={errors.email}
                      variant="glass"
                    />
                    <FormField
                      id="phone"
                      label="Phone number"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={updateField("phone")}
                      variant="glass"
                    />
                    <FormField
                      id="linkedIn"
                      label="LinkedIn profile"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedIn}
                      onChange={updateField("linkedIn")}
                      variant="glass"
                    />
                    <FormField
                      id="portfolio"
                      label="Portfolio / GitHub / Website"
                      placeholder="https://github.com/yourusername"
                      value={formData.portfolio}
                      onChange={updateField("portfolio")}
                      variant="glass"
                    />
                  </GlassCard>

                  <GlassCard title="Your background" description="Tell us about your experience.">
                    <FormField
                      id="currentRole"
                      label="Current role / title"
                      placeholder="e.g. Senior Software Engineer"
                      value={formData.currentRole}
                      onChange={updateField("currentRole")}
                      variant="glass"
                    />
                    <FormField
                      id="yearsExperience"
                      label="Years of experience"
                      type="select"
                      placeholder="Select your experience level"
                      options={EXPERIENCE_OPTIONS}
                      value={formData.yearsExperience}
                      onChange={updateField("yearsExperience")}
                      variant="glass"
                    />
                    <FormField
                      id="areasOfInterest"
                      label="Areas of interest"
                      type="multiselect"
                      helperText="What kind of work excites you?"
                      options={INTEREST_OPTIONS}
                      required
                      value={formData.areasOfInterest}
                      onChange={updateField("areasOfInterest")}
                      error={errors.areasOfInterest}
                      variant="glass"
                    />
                  </GlassCard>

                  <GlassCard title="Why Koeo?" description="Help us understand why you'd be a great fit.">
                    <FormField
                      id="whyKoeo"
                      label="Why are you interested in Koeo?"
                      type="textarea"
                      placeholder="What draws you to our mission? What excites you about AI infrastructure?"
                      required
                      value={formData.whyKoeo}
                      onChange={updateField("whyKoeo")}
                      error={errors.whyKoeo}
                      variant="glass"
                    />
                    <FormField
                      id="whatYouBring"
                      label="What would you bring to the team?"
                      type="textarea"
                      placeholder="Tell us about your skills, experiences, or perspectives that would make you a valuable addition..."
                      required
                      value={formData.whatYouBring}
                      onChange={updateField("whatYouBring")}
                      error={errors.whatYouBring}
                      variant="glass"
                    />
                  </GlassCard>

                  <GlassCard title="Resume" description="Upload your resume so we can learn more about you.">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/90">
                        Resume / CV <span className="text-pink-light">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 cursor-pointer opacity-0"
                          aria-describedby={errors.resume ? "resume-error" : undefined}
                        />
                        <div
                          className={cn(
                            "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200",
                            "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10",
                            errors.resume && "border-red-400/50"
                          )}
                        >
                          <svg className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-white/60">
                            {formData.resumeFileName || "Click to upload PDF or Word document (max 5MB)"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-white/50">Accepted formats: PDF, DOC, DOCX</p>
                      {errors.resume && (
                        <p id="resume-error" className="text-sm text-red-300" role="alert">
                          {errors.resume}
                        </p>
                      )}
                    </div>
                  </GlassCard>

                  <GlassCard title="Anything else?">
                    <FormField
                      id="anythingElse"
                      label="Is there anything else you'd like us to know?"
                      type="textarea"
                      placeholder="Side projects, interests, questions for us..."
                      value={formData.anythingElse}
                      onChange={updateField("anythingElse")}
                      variant="glass"
                    />
                  </GlassCard>

                  {formState === "error" && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 backdrop-blur-sm" role="alert">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={formState === "submitting"}
                    className="w-full bg-gradient-to-r from-purple-primary to-magenta text-lg font-semibold shadow-lg shadow-magenta/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-magenta/40"
                  >
                    {formState === "submitting" ? "Submitting..." : "Submit application"}
                  </Button>
                </form>
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
