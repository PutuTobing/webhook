'use client';
import type { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Bell,
  BarChart3,
  Cog,
  Home,
  User,
  Webhook,
  LifeBuoy,
  LogOut,
  Moon,
  Sun,
  ShieldAlert,
} from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes"; // Note: next-themes is not in package.json, we will mock it
import { useEffect, useState } from "react";

// Mock useTheme hook since next-themes is not in package.json
const useMockTheme = () => {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
    }, []);

    const toggleTheme = (newTheme: 'light' | 'dark') => {
        if(newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setTheme(newTheme);
    }

    return { theme, setTheme: toggleTheme };
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useMockTheme();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-7 text-primary" />
            <span className="font-headline text-xl font-semibold">Sentinel</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" tooltip="Dashboard" isActive>
                <Home />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Webhooks">
                <Webhook />
                Webhooks
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Monitoring">
                <BarChart3 />
                Monitoring
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Alerting">
                <ShieldAlert />
                Alerting
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Settings">
                <Cog />
                Settings
              </SidebarMenuButton>
               <SidebarMenuSub>
                  <SidebarMenuSubButton href="#">Profile</SidebarMenuSubButton>
                  <SidebarMenuSubButton href="#">Team</SidebarMenuSubButton>
                  <SidebarMenuSubButton href="#">Billing</SidebarMenuSubButton>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                 <Avatar className="size-8">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="user avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start overflow-hidden">
                    <span className="font-medium truncate">User</span>
                    <span className="text-xs text-muted-foreground truncate">user@sentinel.com</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem>
              <DropdownMenuItem><Cog className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem>
              <DropdownMenuItem><LifeBuoy className="mr-2 h-4 w-4" /><span>Support</span></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-16 sm:px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
             <h1 className="font-headline text-lg font-semibold md:text-xl">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Upgrade</Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="size-5" />
               <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-background">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
