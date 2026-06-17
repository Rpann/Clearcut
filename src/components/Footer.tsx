import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0b] py-12 border-t border-surface-800 text-center relative z-10 w-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-surface-300 text-sm font-mono lowercase">
          clearcut — built with ❤️ by Arpan
        </p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/Rpann" target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/arpan-das-work" target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-primary-light transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
