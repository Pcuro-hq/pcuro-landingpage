import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';

// Local image path
const productImagesUrl = '/images/ai-product-search.png';

export function AIShopSection() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-10 lg:py-20 flex flex-col gap-10 lg:gap-20 rounded-3xl">
      <SectionHeader
        title="Use AI to Shop"
        subtitle="Search by product, spec, budget, or outcome. Pcuro's AI cuts through supplier noise to show you the most relevant, best-value options in seconds."
      />
      <div className="relative w-full aspect-[2784/1809] rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        <Image
          src={productImagesUrl}
          alt="AI Shopping Interface"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </section>
  );
}
