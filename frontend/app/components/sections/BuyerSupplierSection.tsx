'use client';

import { useState } from 'react';
import { Toggle } from '../ui/Toggle';
import { ArrowIcon } from '../ui/icons/ArrowIcon';

interface CardData {
  title: string;
  description: string;
}

const buyerCards: CardData[] = [
  {
    title: 'Run RFQs in minutes, not weeks',
    description: 'Launch RFQs instantly and let suppliers compete in one structured flow.',
  },
  {
    title: 'Compare real offers, not sales pitches',
    description: 'Side-by-side pricing, lead times, and supplier performance. No bias, no noise.',
  },
  {
    title: 'Full control from PO to payment',
    description: 'Track orders, approvals, delivery, and payment in one place.',
  },
  {
    title: 'Spend visibility without spreadsheets',
    description: "See what's ordered, in transit, and paid, in real time dashboards.",
  },
  {
    title: 'Built-in compliance and audit trails',
    description: 'Every action logged, approved, and traceable without manual effort.',
  },
];

const supplierCards: CardData[] = [
  {
    title: 'Get in front of ready-to-buy customers',
    description: 'Access buyers actively sourcing, not just browsing.',
  },
  {
    title: 'Respond to RFQs faster',
    description: 'Streamlined RFQ responses with templates and auto-fill.',
  },
  {
    title: 'List products once, sell continuously',
    description: 'Turn stocked items into listings for repeat revenue outside of RFQs.',
  },
  {
    title: 'Faster, predictable payments',
    description: 'Get paid on receipt of goods, with clear terms and status.',
  },
  {
    title: 'Fewer admin headaches',
    description: 'Orders, messages, documents, and invoices all in one workflow.',
  },
];

export function BuyerSupplierSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(2); // Start with middle card active
  
  const cards = activeIndex === 0 ? buyerCards : supplierCards;

  const handlePrev = () => {
    setCardIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="w-full py-10 lg:py-16 flex flex-col items-center gap-10 lg:gap-20 bg-gradient-to-b from-transparent to-white overflow-hidden">
      <div className="flex flex-col items-center gap-4 lg:gap-6 px-4">
        <h2 className="font-ibm-plex font-semibold text-xl md:text-2xl lg:text-h2 text-black text-center">
          How will you use Pcuro?
        </h2>
        <Toggle
          options={['BUYER', 'SUPPLIER']}
          activeIndex={activeIndex}
          onToggle={setActiveIndex}
        />
      </div>

      {/* Mobile Cards View */}
      <div className="lg:hidden w-full px-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrev}
            className="w-[30px] h-[30px] text-primary hover:text-primary/80 transition-colors cursor-pointer shrink-0"
          >
            <ArrowIcon direction="left" className="w-full h-full" />
          </button>
          
          <div className="flex-1 bg-white shadow-glass-secondary rounded-xl p-6 text-center">
            <h3 className="font-gabarito font-semibold text-lg text-neutral-900 mb-3">
              {cards[cardIndex].title}
            </h3>
            <p className="font-roboto text-body text-neutral-900">
              {cards[cardIndex].description}
            </p>
          </div>
          
          <button 
            onClick={handleNext}
            className="w-[30px] h-[30px] text-primary hover:text-primary/80 transition-colors cursor-pointer shrink-0"
          >
            <ArrowIcon direction="right" className="w-full h-full" />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCardIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === cardIndex ? 'bg-primary' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden lg:block relative w-full max-w-[1200px]">
        {/* Navigation Arrows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-[500px] xl:gap-[640px] z-10">
          <button 
            onClick={handlePrev}
            className="w-[30px] h-[30px] text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            <ArrowIcon direction="left" className="w-full h-full" />
          </button>
          <button 
            onClick={handleNext}
            className="w-[30px] h-[30px] text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            <ArrowIcon direction="right" className="w-full h-full" />
          </button>
        </div>

        {/* Cards Carousel */}
        <div className="flex items-end justify-center h-[380px] overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ 
              transform: `translateX(${-(cardIndex - 2) * 460}px)`,
            }}
          >
            {cards.map((card, index) => {
              const isActive = index === cardIndex;
              return (
                <div
                  key={`${activeIndex}-${index}`}
                  className={`
                    w-[400px] xl:w-[500px] shrink-0 -mr-10
                    transition-all duration-300
                    ${isActive ? 'pb-20' : ''}
                  `}
                >
                  <div className={`
                    flex flex-col gap-6 
                    h-[300px] 
                    p-10 xl:p-20
                    rounded-xl
                    text-center
                    items-center justify-center
                    ${isActive 
                      ? 'bg-white shadow-glass-secondary' 
                      : 'bg-primary-variant/10 shadow-card'
                    }
                  `}>
                    <h3 className={`
                      font-gabarito font-medium 
                      ${isActive ? 'text-h4 font-semibold' : 'text-body-lg'}
                      text-neutral-900
                    `}>
                      {card.title}
                    </h3>
                    <p className="font-roboto text-body text-neutral-900">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
