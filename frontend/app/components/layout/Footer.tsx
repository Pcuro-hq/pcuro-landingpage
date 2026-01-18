import { Logo } from '../ui/Logo';
import { LinkedInIcon, TwitterIcon, InstagramIcon } from '../ui/icons/SocialIcons';

export function Footer() {
  return (
    <footer className="w-full bg-brand-green py-20 flex flex-col items-center justify-center gap-10">
      <Logo size="md" />
      <div className="flex items-center gap-10">
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-primary hover:text-primary transition-colors"
        >
          <LinkedInIcon className="w-[31px] h-[31px]" />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-primary hover:text-primary transition-colors"
        >
          <TwitterIcon className="w-[31px] h-[31px]" />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-primary hover:text-primary transition-colors"
        >
          <InstagramIcon className="w-[31px] h-[31px]" />
        </a>
      </div>
    </footer>
  );
}
