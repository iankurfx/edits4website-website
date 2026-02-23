import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function RequestEdit() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        instaId: "",
        templateName: "",
        instructions: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Replace 'YOUR_FORM_ID_HERE' with your actual form ID from Formspree
            // You can get one for free at https://formspree.io/
            const response = await fetch("https://formspree.io/f/xeelrybv", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast({
                    title: "Request Successfully Received",
                    description: "Thank you for your submission. Our team is reviewing your request and will be in touch shortly.",
                });
                setFormData({ name: "", email: "", instaId: "", templateName: "", instructions: "" });
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            toast({
                title: "Failed to send request",
                description: "Something went wrong. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-10 px-4">
            <div className="max-w-2xl mx-auto">
                <Card className="bg-zinc-900 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Request an Edit
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Name</label>
                                <Input
                                    required
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-black/50 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email</label>
                                <Input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-black/50 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Instagram ID</label>
                                <Input
                                    placeholder="@username (optional)"
                                    value={formData.instaId}
                                    onChange={(e) => setFormData({ ...formData, instaId: e.target.value })}
                                    className="bg-black/50 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Template Name</label>
                                <Input
                                    required
                                    placeholder="Template to edit"
                                    value={formData.templateName}
                                    onChange={(e) => setFormData({ ...formData, templateName: e.target.value })}
                                    className="bg-black/50 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Special Instructions</label>
                                <Textarea
                                    placeholder="Specific details, timing, text changes..."
                                    value={formData.instructions}
                                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                    className="bg-black/50 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-gray-600 min-h-[120px]"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                {isSubmitting ? "Sending..." : "Send Request"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
