import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Menu, X, User as UserIcon, LogOut, Instagram, Send, MessageCircle, Search } from "lucide-react";
import { useSearch } from "@/lib/search-context";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer } from "@/components/layout/Drawer";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [location] = useLocation();
  const { user, isLoading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { toast } = useToast();

  const links = [
    { href: "/", label: "Home" },
    { href: "/trending", label: "Trending" },
    { href: "/new", label: "New Arrivals" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Left Section: Menu + Logo + Desktop Links */}
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Drawer
              open={isOpen}
              onOpenChange={setIsOpen}
              user={user ?? null}
              logout={logout}
            />

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/templates/logo.jpg" alt="Logo" className="w-8 h-8 rounded object-cover group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300" />
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300 hidden sm:inline-block">
                CapCut<span className="text-primary">Temps</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links (Shifted Left) */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary text-glow" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className={`flex-1 max-w-md transition-all duration-300 ${isSearchExpanded ? 'absolute inset-x-4 top-2 z-50 bg-black/90 p-2 rounded-xl border border-purple-500/50 shadow-lg md:static md:bg-transparent md:p-0 md:border-none md:shadow-none' : ''}`}>
          <div className="relative group">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isSearchExpanded || searchQuery ? 'text-primary' : 'text-muted-foreground'}`}>
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search templates..."
              className={`w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all duration-300 ${!isSearchExpanded ? 'hidden md:block' : 'block'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => !searchQuery && setIsSearchExpanded(false)}
              autoFocus={isSearchExpanded}
            />
            {/* Mobile Search Icon Trigger */}
            {!isSearchExpanded && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white/70 hover:text-white"
                onClick={() => setIsSearchExpanded(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            {/* Close Mobile Search */}
            {isSearchExpanded && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 md:hidden text-white/70 hover:text-white h-full"
                onClick={() => {
                  setIsSearchExpanded(false);
                  setSearchQuery("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Section: Socials + Auth */}
        <div className={`flex items-center gap-2 md:gap-4 ${isSearchExpanded ? 'hidden md:flex' : 'flex'}`}>
          {/* Social Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full w-8 h-8 md:w-9 md:h-9 text-white/70 hover:text-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              <a href="https://www.instagram.com/ft.edits4baddies_/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full w-8 h-8 md:w-9 md:h-9 text-white/70 hover:text-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300"
            >
              <a href="https://t.me/edits4baddies" target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4 md:h-5 md:w-5 -ml-0.5 mt-0.5" /> {/* Optically aligned for Send icon */}
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast({
                  title: "Coming Soon...",
                  description: "Our WhatsApp channel is launching soon. Stay tuned!",
                });
              }}
              className="rounded-full w-8 h-8 md:w-9 md:h-9 text-white/70 hover:text-green-400 hover:bg-green-500/10 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-offset-background hover:ring-2 hover:ring-primary/50 transition-all p-0 overflow-hidden">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} />
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">
                          {user.firstName?.[0] || <UserIcon className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-card border-white/10" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-white">{user.firstName} {user.lastName}</p>
                        <p className="w-[200px] truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer" onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_15px_-3px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_-3px_rgba(168,85,247,0.7)] transition-all duration-300">
                  <a href="/login">Sign In</a>
                </Button>
              )
            )}
          </div>
        </div>


      </div>
    </nav>
  );
}

