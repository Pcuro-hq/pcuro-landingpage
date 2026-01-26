import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface CheckListItemProps {
  text: string;
  className?: string;
}

export function CheckListItem({ text, className = '' }: CheckListItemProps) {
  return (
    <div className={`flex items-center gap-6 transition-transform duration-200 hover:translate-x-1 ${className}`}>
      <CheckCircleIcon className="w-[30px] h-[30px] shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
      <p className="font-roboto text-body-lg text-black">
        {text}
      </p>
    </div>
  );
}
