import { ReactNode } from "react";

interface TimelineProps {
  children: ReactNode;
}

export default function Timeline({ children }: TimelineProps) {
  return (
    <div className="container bg-transparent mx-auto w-full h-full">
      <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
        {/* Central Line - hidden on mobile, visible on md+ */}
        <div className="hidden md:block absolute border-opacity-20 border-neutral-400 dark:border-neutral-700 h-full border left-1/2 transform -translate-x-1/2"></div>
        {/* Mobile Line - visible on small screens, positioned left */}
        <div className="md:hidden absolute border-opacity-20 border-neutral-400 dark:border-neutral-700 h-full border left-8"></div>
        {children}
      </div>
    </div>
  );
}
