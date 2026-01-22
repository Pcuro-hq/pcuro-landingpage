import { Logo } from '../ui/Logo';
import { LinkedInIcon, TwitterIcon } from '../ui/icons/SocialIcons';

export function Footer() {
  return (
    <footer className="w-full bg-brand-green py-20 flex flex-col items-center justify-center gap-10">
      <Logo size="md" />
      <div className="flex items-center gap-10">
        <a 
          href="https://www.linkedin.com/company/pcuro" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-primary hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="w-[31px] h-[31px]" />
        </a>
        <a 
          href="https://x.com/pcurohq?s=11" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-primary hover:text-primary transition-colors"
          aria-label="Twitter/X"
        >
          <TwitterIcon className="w-[31px] h-[31px]" />
        </a>
      </div>
    </footer>
  );
}
