import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
// @ts-ignore
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                toast({ title: "Logged in successfully!" });
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                toast({ title: "Account created successfully!" });
            }
            window.location.href = "/";
        } catch (error: any) {
            let errorMessage = "An unexpected error occurred. Please try again.";
            if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                errorMessage = "Invalid email or password. Please check your credentials and try again.";
            } else if (error.code === "auth/email-already-in-use") {
                errorMessage = "An account with this email already exists. Please sign in instead.";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password should be at least 6 characters.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Please enter a valid email address.";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
            }

            toast({
                title: "Login Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-card border border-white/10 p-8 rounded-[14px] hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_-5px_rgba(168,85,247,0.2)]">
                <h2 className="text-3xl font-display font-bold text-white text-center mb-6 text-glow">
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all duration-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all duration-300"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-bold transition-all duration-300 shadow-sm rounded-full mt-4"
                    >
                        {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-white/60 hover:text-primary transition-colors"
                    >
                        {isLogin
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}
