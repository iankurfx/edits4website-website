import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-10 px-4">
            <div className="max-w-2xl mx-auto">
                <Card className="bg-zinc-900 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            About CapCutTemps
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            CapCutTemps is a modern platform built to help creators find the best CapCut templates quickly and easily. We collect trending, aesthetic, and high-quality templates from across the internet and present them in a clean, organized, and easy-to-use format.
                        </p>
                        <p>
                            Our goal is simple: save your time and improve your edits. Instead of searching through multiple apps and links, you can discover popular templates, preview them instantly, and start editing in just a few clicks.
                        </p>

                        <h3 className="text-lg font-semibold text-white mt-4 mb-2">We focus on:</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4 text-gray-300 mb-6">
                            <li>Trending and viral CapCut templates</li>
                            <li>Clean previews before you use a template</li>
                            <li>Fast and simple navigation</li>
                            <li>Regularly updated collections</li>
                        </ul>

                        <p>
                            CapCutTemps is designed for everyone—from beginners making their first edit to experienced creators looking for the next viral style.
                        </p>
                        <p>
                            If you can’t find the template you’re looking for, you can send us a request. We’re always adding new styles and helping users get the edits they want.
                        </p>
                        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-4">
                            Create faster. Edit smarter. Stay trending.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
