import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Star, TrendingUp, FileInput, Pencil, Info, Shield, Scale, User as UserIcon } from "lucide-react";
import type { User } from "@shared/models/auth";

interface DrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
    logout: () => void;
}

export function Drawer({ open, onOpenChange, user, logout }: DrawerProps) {
    const [location] = useLocation();

    const isActive = (path: string) => location === path;

    // Exact order from requirements
    const menuItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/new", label: "New Arrivals", icon: Star },
        { href: "/trending", label: "Trending", icon: TrendingUp },
        { href: "/request", label: "Request for Template", icon: FileInput },
        { href: "/request-edit", label: "Request for Edit", icon: Pencil },
        { href: "/about", label: "About Us", icon: Info },
        { href: "/copyright", label: "Copyright", icon: Shield },
        { href: "/dmca", label: "DMCA", icon: Scale },
        { href: "/profile", label: "Profile", icon: UserIcon },
    ];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="w-[300px] bg-black/95 border-r border-purple-500/20 p-0 text-white backdrop-blur-xl">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for CapCut Templates</SheetDescription>
                {/* Header */}
                <div className="p-6 border-b border-purple-500/10">
                    <Link href="/" onClick={() => onOpenChange(false)} className="flex items-center gap-3 group">
                        <img src="/templates/logo.jpg" alt="Logo" className="w-10 h-10 rounded object-cover shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all" />
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                                CapCut<span className="text-primary text-glow">Temps</span>
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium tracking-wide">
                                Trending CapCut templates daily
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col py-4 h-[calc(100vh-180px)] overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => onOpenChange(false)}
                                className={`relative flex items-center gap-4 px-6 py-3 text-sm font-medium transition-all duration-300 group
                  ${active
                                        ? "text-white bg-purple-500/10 border-r-2 border-purple-500"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 transition-colors ${active ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "group-hover:text-purple-400"}`} />
                                <span className={active ? "text-glow" : ""}>{item.label}</span>
                                {active && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer / User Profile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-500/10 bg-black/50 backdrop-blur-sm">
                    {user ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9 border border-purple-500/30">
                                    <AvatarImage src={user.profileImageUrl || undefined} />
                                    <AvatarFallback className="bg-purple-900/50 text-purple-200 text-xs">
                                        {user.firstName?.[0] || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-medium text-white truncate">{user.firstName}</span>
                                    <span className="text-xs text-gray-500 truncate">{user.email}</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 mt-1"
                                onClick={() => logout()}
                            >
                                <LogOut className="mr-2 h-3.5 w-3.5" />
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_15px_-5px_rgba(168,85,247,0.5)]">
                            <a href="/login">Sign In</a>
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
