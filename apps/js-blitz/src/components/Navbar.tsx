import { useTheme } from 'next-themes';
import { Button } from '@repo/ui/components/button';

interface NavbarProps {
  onTutorialClick: () => void;
  onBrandClick: () => void;
}

export function Navbar({ onTutorialClick, onBrandClick }: NavbarProps) {
  const { setTheme, theme } = useTheme();

  return (
    <div className="border-b">
      <div className="flex h-14 items-center px-4 justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 select-none"
            onClick={onBrandClick}
          >
            {/* Custom Lightning Bolt Logo */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-yellow-400 rounded-lg rotate-12"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 relative text-background transform -rotate-12"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            {/* Custom Typography */}
            <div className="flex items-baseline">
              <span className="font-black text-xl tracking-tight">JS</span>
              <span className="font-extrabold text-xl tracking-tighter bg-gradient-to-br from-yellow-400 to-yellow-500 text-transparent bg-clip-text">Blitz</span>
            </div>
          </Button>
          <div className="h-6 w-px bg-border"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Modern JavaScript Playground</span>
            <span className="text-xs text-muted-foreground">Experiment • Learn • Build</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            onClick={onTutorialClick}
            className="font-medium"
          >
            Learn JS
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9 relative"
          >
            <span className="absolute inset-0 flex items-center justify-center rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            </span>
            <span className="absolute inset-0 flex items-center justify-center rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}