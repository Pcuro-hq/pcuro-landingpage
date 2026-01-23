'use client';

import { useState, FormEvent } from 'react';
import { submitWaitlist, submitContact, ApiClientError } from '@/lib/api';
import { WaitlistFormData, ContactFormData, FormStatus } from '@/lib/types';
import { Logo } from '@/app/components/ui/Logo';

export default function WaitlistPage() {
  // Waitlist form state
  const [formData, setFormData] = useState<WaitlistFormData>({
    fullName: '',
    companyName: '',
    email: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Contact form state
  const [contactData, setContactData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<FormStatus>('idle');
  const [contactError, setContactError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitWaitlist(formData);
      setStatus('success');
      // Reset form
      setFormData({ fullName: '', companyName: '', email: '' });
    } catch (error) {
      setStatus('error');
      if (error instanceof ApiClientError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
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
    setContactError('');

    try {
      await submitContact(contactData);
      setContactStatus('success');
      // Reset form
      setContactData({ name: '', email: '', message: '' });
    } catch (error) {
      setContactStatus('error');
      if (error instanceof ApiClientError) {
        setContactError(error.message);
      } else {
        setContactError('Something went wrong. Please try again.');
      }
    }
  };

  const handleContactChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 py-12">
      {/* Waitlist Form Card */}
      <div className="w-full max-w-[480px] bg-white rounded-lg shadow-glass p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-gabarito font-medium mb-3">
              Welcome To
            </p>
            <div className="flex justify-center">
              <Logo size="lg" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-text-primary font-gabarito">
            Sign Up
          </h2>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center font-medium">
              ✓ Successfully added to waitlist!
            </p>
          </div>
        )}

        {/* Error Message */}
        {status === 'error' && errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center">{errorMessage}</p>
          </div>
        )}

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold text-lg py-4 px-6 rounded-full transition-colors duration-200 shadow-button"
          >
            {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-[480px] mt-8 bg-white rounded-lg shadow-glass p-8 md:p-10">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-text-primary font-gabarito mb-2">
            Have questions?
          </h3>
          <p className="text-gray-600">
            We&apos;re here to help! Send us a message and we&apos;ll get back to you soon.
          </p>
        </div>

        {/* Contact Success Message */}
        {contactStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center font-medium">
              ✓ Message sent! We&apos;ll get back to you soon.
            </p>
          </div>
        )}

        {/* Contact Error Message */}
        {contactStatus === 'error' && contactError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center">{contactError}</p>
          </div>
        )}

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={contactStatus === 'loading'}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
          >
            {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
