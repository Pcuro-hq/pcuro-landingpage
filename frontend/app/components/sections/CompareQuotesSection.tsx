import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';
import { FeatureCard } from '../ui/FeatureCard';

// Local image paths
const quoteComparisonImage = '/images/quote-comparison.png';
const container3Image = '/images/product-card-1.png';
const container12Image = '/images/product-card-2.png';
const frame10000060874Image = '/images/product-card-featured.png';

const features = [
  {
    title: 'Product Listings',
    description: 'List and discover live, supplier-verified products with real pricing, availability, and lead times. No PDFs. No chasing reps.',
  },
  {
    title: "RFQ's",
    description: 'Create RFQs in minutes and let suppliers compete for your business. Centralised responses, clear terms, zero email chaos.',
  },
  {
    title: 'Quote Comparisons',
    description: 'Compare quotes side-by-side across price, delivery, ratings, and availability. Pick the best option instantly, not the loudest supplier.',
  },
];

export function CompareQuotesSection() {
  return (
    <section className="w-full flex flex-col gap-16 lg:gap-32">
      {/* Main Feature Card */}
      <div className="w-full gradient-feature rounded-3xl px-6 md:px-10 lg:px-16 py-10 lg:py-20 flex flex-col xl:flex-row gap-10 lg:gap-20 items-center">
        <div className="flex flex-col gap-10 lg:gap-20 flex-1">
          <div className="flex flex-col gap-6 lg:gap-10">
            <h2 className="font-gabarito font-semibold text-2xl md:text-3xl lg:text-h1 text-text-primary max-w-[656px]">
              Product Listings, RFQ's & Quote Comparisons
            </h2>
            <p className="font-roboto text-body lg:text-body-lg text-black max-w-[673px] leading-relaxed">
              List products, request RFQs, and compare supplier quotes side-by-side. 
              No emails. No spreadsheets. No wasted time.
            </p>
          </div>
          <div className="relative w-full aspect-[2060/548]">
            <Image
              src={quoteComparisonImage}
              alt="Quote Comparison"
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>
        </div>
        
        {/* Product Cards Stack */}
        <div className="hidden xl:flex items-start justify-between flex-1 h-[413px] relative min-w-[600px]">
          <div className="flex h-full items-start justify-center w-[220px]">
            <div className="relative h-[297px] w-[220px]">
              <Image
                src={container3Image}
                alt="Product Card"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          <div className="flex h-full items-start justify-center w-[220px]">
            <div className="relative h-[297px] w-[220px]">
              <Image
                src={container12Image}
                alt="Product Card"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[417px] flex items-end justify-center">
            <div className="relative h-[331px] w-[220px]">
              <Image
                src={frame10000060874Image}
                alt="Featured Product"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            className="flex-1 min-h-[180px]"
          />
        ))}
      </div>
    </section>
  );
}
