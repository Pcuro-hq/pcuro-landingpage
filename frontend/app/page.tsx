'use client';

import {
  Header,
  Footer,
  HeroSection,
  CompareQuotesSection,
  AIShopSection,
  CommunicateSection,
  OrderTrackingSection,
  BuyerSupplierSection,
  CTASection,
} from './components';
import { useToast } from '@/hooks/use-toast';

export default function LandingPage() {
  const { toast } = useToast();

  const handleRequestDemo = () => {
    toast({
      title: 'Demo Coming Soon!',
      description: 'Join our waitlist to stay updated on demo availability.',
    });
  };

  return (
    <main className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* Header */}
      <Header onRequestDemo={handleRequestDemo} />
      
      {/* Hero Section */}
      <HeroSection onRequestDemo={handleRequestDemo} />
      
      {/* Features Section */}
      <section className="flex flex-col gap-16 lg:gap-32 px-4 md:px-6 lg:px-10 py-16 lg:py-24">
        {/* Compare Quotes */}
        <CompareQuotesSection />
        
        {/* Use AI to Shop */}
        <AIShopSection />
        
        {/* Communicate Easily */}
        <CommunicateSection />
        
        {/* Simplified PO's & Order Tracking */}
        <OrderTrackingSection />
      </section>
      
      {/* Buyer/Supplier Toggle Section */}
      <BuyerSupplierSection />
      
      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <CTASection />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
