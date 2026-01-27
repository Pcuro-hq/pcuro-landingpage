'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { submitWaitlist, submitContact, ApiClientError } from '@/lib/api';
import { WaitlistFormData, ContactFormData, FormStatus } from '@/lib/types';
import { Logo } from '@/app/components/ui/Logo';

// Extended status type for cold start handling
type ExtendedFormStatus = FormStatus | 'waking';

export default function WaitlistPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Waitlist form state
  const [formData, setFormData] = useState<WaitlistFormData>({
    fullName: '',
    companyName: '',
    email: '',
  });
  const [status, setStatus] = useState<ExtendedFormStatus>('idle');
  const wakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Contact form state
  const [contactData, setContactData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<ExtendedFormStatus>('idle');
  const contactWakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (wakingTimeoutRef.current) clearTimeout(wakingTimeoutRef.current);
      if (contactWakingTimeoutRef.current) clearTimeout(contactWakingTimeoutRef.current);
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Show "waking up" message after 3 seconds if still loading
    wakingTimeoutRef.current = setTimeout(() => {
      setStatus((current) => current === 'loading' ? 'waking' : current);
    }, 3000);

    try {
      await submitWaitlist(formData);
      if (wakingTimeoutRef.current) clearTimeout(wakingTimeoutRef.current);
      setStatus('success');
      // Reset form
      setFormData({ fullName: '', companyName: '', email: '' });
      // Show success toast
      toast({
        title: 'Successfully added to waitlist!',
        description: 'Redirecting you to the home page...',
        variant: 'success',
      });
      // Redirect after 2 seconds
      redirectTimeoutRef.current = setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      if (wakingTimeoutRef.current) clearTimeout(wakingTimeoutRef.current);
      setStatus('error');
      if (error instanceof ApiClientError) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleChange = (field: keyof WaitlistFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');

    // Show "waking up" message after 3 seconds if still loading
    contactWakingTimeoutRef.current = setTimeout(() => {
      setContactStatus((current) => current === 'loading' ? 'waking' : current);
    }, 3000);

    try {
      await submitContact(contactData);
      if (contactWakingTimeoutRef.current) clearTimeout(contactWakingTimeoutRef.current);
      setContactStatus('success');
      // Reset form
      setContactData({ name: '', email: '', message: '' });
      // Show success toast
      toast({
        title: 'Message sent!',
        description: "We'll get back to you soon.",
        variant: 'success',
      });
    } catch (error) {
      if (contactWakingTimeoutRef.current) clearTimeout(contactWakingTimeoutRef.current);
      setContactStatus('error');
      if (error instanceof ApiClientError) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleContactChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 relative" style={{
      background: 'linear-gradient(135deg, rgba(107, 44, 243, 0.15) 0%, rgba(202, 221, 153, 0.25) 50%, rgba(107, 44, 243, 0.12) 100%)'
    }}>
      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-text-primary hover:text-primary transition-colors duration-200 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      {/* Waitlist Form Card */}
      <div className="w-full max-w-[480px] bg-white/95 backdrop-blur-sm rounded-lg shadow-glass p-8 md:p-12 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-gabarito font-medium mb-3 animate-slide-down">
              Welcome To
            </p>
            <div className="flex justify-center animate-scale-in">
              <Logo size="lg" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-text-primary font-gabarito animate-slide-up">
            Sign Up
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-lg font-semibold text-text-primary mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange('fullName')}
              placeholder="Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Company E-mail Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-text-primary mb-2"
            >
              Company E-mail
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="Company E-mail"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Company Name Field */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-lg font-semibold text-text-primary mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange('companyName')}
              placeholder="Company Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading' || status === 'waking'}
            className="w-full bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:bg-primary/50 disabled:cursor-not-allowed disabled:hover:scale-100 text-white font-semibold text-lg py-4 px-6 rounded-full transition-all duration-200 shadow-button hover:shadow-lg"
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing Up...
              </span>
            ) : status === 'waking' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Server waking up...
              </span>
            ) : 'Sign Up'}
          </button>
          
          {/* Waking up info message */}
          {status === 'waking' && (
            <p className="text-sm text-gray-500 text-center animate-fade-in">
              This may take up to 30 seconds on first request
            </p>
          )}
        </form>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-[480px] mt-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-glass p-8 md:p-10 animate-fade-in-delayed">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-text-primary font-gabarito mb-2">
            Have questions?
          </h3>
          <p className="text-gray-600">
            We&apos;re here to help! Send us a message and we&apos;ll get back to you soon.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleContactSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="contactName"
              className="block text-sm font-semibold text-text-primary mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="contactName"
              value={contactData.name}
              onChange={handleContactChange('name')}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-semibold text-text-primary mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="contactEmail"
              value={contactData.email}
              onChange={handleContactChange('email')}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="contactMessage"
              className="block text-sm font-semibold text-text-primary mb-1"
            >
              Message
            </label>
            <textarea
              id="contactMessage"
              value={contactData.message}
              onChange={handleContactChange('message')}
              placeholder="How can we help you?"
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 resize-none transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={contactStatus === 'loading' || contactStatus === 'waking'}
            className="w-full bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:bg-primary/50 disabled:cursor-not-allowed disabled:hover:scale-100 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 hover:shadow-lg"
          >
            {contactStatus === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : contactStatus === 'waking' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Server waking up...
              </span>
            ) : 'Send Message'}
          </button>
          
          {/* Waking up info message */}
          {contactStatus === 'waking' && (
            <p className="text-sm text-gray-500 text-center animate-fade-in">
              This may take up to 30 seconds on first request
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
