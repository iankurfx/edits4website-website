import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Edit2, Check, X } from "lucide-react";
import { updateProfile } from "firebase/auth";
// @ts-ignore
import { auth } from "../firebase";

export default function Profile() {
    const { user, isLoading, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = () => {
        setNewName(user?.firstName ? `${user.firstName} ${user.lastName}`.trim() : "");
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!auth.currentUser || !newName.trim()) return;
        setIsSaving(true);
        try {
            await updateProfile(auth.currentUser, { displayName: newName.trim() });
            // Force reload to reflect new name in context
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile", error);
        } finally {
            setIsSaving(false);
            setIsEditing(false);
        }
    };
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-10 px-4">
            <div className="max-w-lg mx-auto">
                <Card className="bg-zinc-900 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            My Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 flex flex-col items-center">
                        {user ? (
                            <>
                                <Avatar className="h-24 w-24 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                                    <AvatarImage src={user.profileImageUrl || ""} />
                                    <AvatarFallback className="bg-purple-900 text-white text-xl">
                                        {user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="text-center space-y-1 w-full max-w-xs">
                                    {isEditing ? (
                                        <div className="flex items-center gap-2 mt-2">
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-full py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50"
                                                autoFocus
                                            />
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={handleSave}
                                                disabled={isSaving}
                                                className="text-green-400 hover:text-green-300 hover:bg-green-400/10 p-2 h-8 w-8 rounded-full"
                                            >
                                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setIsEditing(false)}
                                                disabled={isSaving}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 h-8 w-8 rounded-full"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 group">
                                            <h2 className="text-2xl font-semibold text-white">
                                                {user.firstName} {user.lastName}
                                            </h2>
                                            <button
                                                onClick={handleEdit}
                                                className="text-white/40 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                    <p className="text-gray-400 text-sm mt-1">{user.email || "No email provided"}</p>
                                </div>

                                <Button
                                    onClick={() => logout()}
                                    variant="destructive"
                                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <div className="text-center space-y-4">
                                <p className="text-gray-300">You are currently not logged in.</p>
                                <div className="flex flex-col gap-3 w-full">
                                    <Button
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                        onClick={() => window.location.href = "/login"} // Or whatever the existing login flow is
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-white"
                                        onClick={() => window.location.href = "/register"} // Or whatever the existing register flow is (often handled via same login page if external auth)
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
