import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';
import { CheckListItem } from '../ui/CheckListItem';

// Local image paths
const customerInfoImage = '/images/customer-info-panel.png';
const messagingThreadImage = '/images/messaging-thread.png';

const benefits = [
  'Track every order from request to delivery in one place',
  'See live status updates, changes, and confirmations',
  'Instantly spot delays, risks, or required action',
  'Remove uncertainty from fulfilment and timelines',
];

export function CommunicateSection() {
  return (
    <section className="w-full gradient-communicate rounded-3xl px-4 md:px-8 lg:px-16 pt-10 lg:pt-20 pb-10 flex flex-col gap-6 lg:gap-10 overflow-hidden relative transition-all duration-500 hover:shadow-xl">
      <SectionHeader
        title="Communicate Easily"
        subtitle="All supplier and buyer conversations in one place"
      />
      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 min-h-[300px] lg:h-[381px]">
        {/* Benefits List */}
        <div className="flex-1 flex flex-col gap-4 lg:gap-6 justify-center py-4 lg:py-6">
          {benefits.map((benefit) => (
            <CheckListItem key={benefit} text={benefit} />
          ))}
        </div>
        
        {/* Messaging Preview Images */}
        <div className="hidden lg:flex gap-6 lg:gap-10">
          <div className="relative w-[250px] lg:w-[301px] h-[500px] lg:h-[600px] transition-transform duration-300 hover:-translate-y-2">
            <Image
              src={customerInfoImage}
              alt="Customer Info Panel"
              fill
              className="object-cover object-top rounded-lg"
              unoptimized
            />
          </div>
          <div className="relative w-[340px] lg:w-[407px] h-[490px] lg:h-[584px] transition-transform duration-300 hover:-translate-y-2">
            <Image
              src={messagingThreadImage}
              alt="Messaging Thread"
              fill
              className="object-cover object-top rounded-lg"
              unoptimized
            />
          </div>
        </div>
      </div>
      
      {/* Fade Overlay */}
      <div className="hidden lg:block absolute bottom-0 right-10 w-[748px] h-[161px] bg-gradient-to-b from-transparent to-[#f8f9fa] pointer-events-none" />
    </section>
  );
}
