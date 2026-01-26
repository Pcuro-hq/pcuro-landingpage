import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';
import { InfoCard } from '../ui/InfoCard';

// Local image paths
const poPreviewImage = '/images/po-preview.png';
const orderTimelineImage = '/images/order-timeline.png';

const column1Features = [
  {
    title: 'PO & Invoice Matching',
    description: 'Automatically generate POs and match invoices to receipts. Fewer errors, faster approvals, clean audit trails.',
  },
  {
    title: "Payment held until good's Receipt",
    description: 'Release supplier payments only once goods are received and verified',
  },
  {
    title: 'Order Communication',
    description: 'All order updates, changes, and messages linked directly to the PO.',
  },
];

const column2Features = [
  {
    title: 'Track Orders',
    description: 'Follow every order through placement, processing, shipment, and delivery in real time.',
  },
  {
    title: 'Purchase History & Audit Trail',
    description: 'Instant access to a full, auditable history of every purchase and change.',
  },
];

export function OrderTrackingSection() {
  return (
    <section className="w-full py-10 lg:py-20 flex flex-col gap-10 lg:gap-20">
      <SectionHeader title="Simplified PO's & Order Tracking" />
      
      <div className="flex flex-col xl:flex-row gap-10 lg:gap-20 items-start xl:items-center">
        {/* Info Cards */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 lg:gap-10 xl:gap-20">
            {column1Features.map((feature) => (
              <InfoCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                className="w-full md:w-[280px] lg:w-[300px] min-h-[200px] lg:h-[225px]"
              />
            ))}
          </div>
          
          {/* Column 2 - offset on xl */}
          <div className="flex flex-col gap-6 lg:gap-10 xl:gap-20 xl:pt-20">
            {column2Features.map((feature) => (
              <InfoCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                className="w-full md:w-[280px] lg:w-[300px] min-h-[200px] lg:h-[225px]"
              />
            ))}
          </div>
        </div>
        
        {/* Preview Images */}
        <div className="hidden xl:block relative flex-1 h-[608px] min-w-[500px]">
          <div className="absolute left-0 top-0 w-[368px] h-[470px] transition-transform duration-300 hover:-translate-y-2 hover:z-10">
            <Image
              src={poPreviewImage}
              alt="PO Preview"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="absolute left-[90px] top-[181px] w-[469px] h-[427px] transition-transform duration-300 hover:-translate-y-2 hover:z-10">
            <Image
              src={orderTimelineImage}
              alt="Order Timeline Tracker"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
