'use client';

import Image from 'next/image';

export default function MailingTestPage() {
  const mockEntry = {
    fullName: 'John Smith',
    companyName: 'Acme Corporation',
    email: 'john.smith@acme.com',
    createdAt: new Date().toISOString(),
  };

  return (
    <div style={{ backgroundColor: '#f9fafb', padding: '40px 20px', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
        {/* Logo Section */}
        <div style={{ textAlign: 'center', padding: '48px 40px 32px' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <Image 
              src="/images/pcuro-logo-new.png" 
              alt="Pcuro" 
              width={180} 
              height={39}
              style={{ display: 'inline-block', cursor: 'pointer' }}
            />
          </a>
        </div>
        
        {/* Main Heading */}
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 700, 
          color: '#1a1a1a', 
          textAlign: 'center', 
          margin: '0 40px 40px',
          lineHeight: '1.2'
        }}>
          You're on the waitlist!
        </h1>
        
        {/* Welcome Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(107, 44, 243, 0.1) 0%, rgba(202, 221, 153, 0.15) 100%)',
          borderRadius: '16px',
          padding: '48px 40px',
          margin: '0 40px 32px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Image 
              src="/images/pcuro-icon.png" 
              alt="Pcuro Icon" 
              width={36} 
              height={36}
              style={{ display: 'block' }}
            />
          </div>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            color: '#1a1a1a', 
            marginBottom: '16px',
            lineHeight: '1.4'
          }}>
            Welcome to the future of B2B procurement
          </div>
          <p style={{ 
            fontSize: '15px', 
            color: '#4a4a4a', 
            lineHeight: '1.6', 
            marginBottom: '32px'
          }}>
            Thanks for joining, <strong>{mockEntry.fullName}</strong>! We're excited to have{' '}
            <strong>{mockEntry.companyName}</strong> as part of our early community. You'll be among 
            the first to know when we launch our platform where businesses discover, compare, and buy 
            from trusted suppliers with real-time AI insights.
          </p>
          <a 
            href="/" 
            style={{
              display: 'inline-block',
              backgroundColor: '#6B46C1',
              color: '#ffffff',
              padding: '16px 48px',
              borderRadius: '28px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Get in Touch
          </a>
          <p style={{ 
            fontSize: '13px', 
            color: '#6b7280', 
            marginTop: '24px',
            lineHeight: '1.5'
          }}>
            Want to learn more? Reach out at contact@pcuro.com
          </p>
        </div>
        
        {/* Social Links */}
        <div style={{ textAlign: 'center', padding: '32px 40px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '24px',
            marginBottom: '24px'
          }}>
            <a href="https://www.linkedin.com/company/pcuro" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <Image 
                src="/images/linkedin-icon.png" 
                alt="LinkedIn" 
                width={32} 
                height={32} 
                style={{ display: 'block' }}
              />
            </a>
            <a href="https://x.com/pcurohq?s=11" style={{ 
              textDecoration: 'none', 
              display: 'inline-block', 
              width: '32px', 
              height: '32px', 
              backgroundColor: '#000000', 
              borderRadius: '4px', 
              textAlign: 'center', 
              lineHeight: '32px' 
            }}>
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '16px' }}>𝕏</span>
            </a>
            <a href="https://www.instagram.com/pcurohq" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <Image 
                src="/images/instagram-icon.png" 
                alt="Instagram" 
                width={32} 
                height={32} 
                style={{ display: 'block' }}
              />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div style={{ 
          textAlign: 'center', 
          fontSize: '13px', 
          color: '#6b7280',
          padding: '0 40px 32px'
        }}>
          <div>Copyright © {new Date().getFullYear()}. All Rights Reserved.</div>
          <div style={{ fontWeight: 600, color: '#1a1a1a', margin: '16px 0' }}>Pcuro</div>
          <div>701 Tillery St, Unit 12, Austin, TX 78702</div>
        </div>
        
      </div>
    </div>
  );
}
