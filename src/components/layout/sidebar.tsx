'use client';

import {
  Code,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Wrench,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import NavLink from './nav-link';

export default function Sidebar() {
  const navLinks = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/practice/code', icon: Code, label: 'Code Practice' },
    { href: '/practice/behavioral', icon: MessageSquare, label: 'Behavioral' },
    { href: '/tool', icon: Wrench, label: 'Interview Tool' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <div className="mb-2">
            <Logo className="text-transparent" />
          </div>

          {navLinks.map((link) => (
            <Tooltip key={link.href}>
              <TooltipTrigger asChild>
                <NavLink href={link.href} icon={link.icon} label={link.label} />
              </TooltipTrigger>
              <TooltipContent side="right">{link.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink href="#" icon={Settings} label="Settings" />
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
