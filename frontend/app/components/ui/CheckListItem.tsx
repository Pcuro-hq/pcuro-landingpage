import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface CheckListItemProps {
  text: string;
  className?: string;
}

export function CheckListItem({ text, className = '' }: CheckListItemProps) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <CheckCircleIcon className="w-[30px] h-[30px] shrink-0 text-primary" />
      <p className="font-roboto text-body-lg text-black">
        {text}
      </p>
    </div>
  );
}
