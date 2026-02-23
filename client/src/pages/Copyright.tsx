import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Copyright() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-10 px-4">
            <div className="max-w-2xl mx-auto">
                <Card className="bg-zinc-900 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Copyright Policy
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            All content displayed on CapCutTemps is provided for preview and informational purposes only.
                        </p>
                        <p>
                            We do not claim ownership of any CapCut templates, music, or media shown on this website. All rights, trademarks, and copyrights belong to their respective owners and creators.
                        </p>
                        <p>
                            The preview videos available on this platform are used solely to demonstrate how a template looks before use. Users are redirected to the official CapCut platform to access and use the templates.
                        </p>
                        <p>
                            If you believe that any content on this website infringes upon your copyright or intellectual property rights, please contact us with the necessary details, including proof of ownership.
                        </p>
                        <p>
                            We take copyright concerns seriously and will review and remove any content if required.
                        </p>
                        <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-500/10 rounded-r my-4">
                            <p className="font-semibold text-purple-400">Contact Email:</p>
                            <a href="mailto:capcuttemps2@gmail.com" className="text-gray-300 hover:text-white transition-colors">capcuttemps2@gmail.com</a>
                        </div>
                        <p className="text-sm text-gray-500 italic">
                            By using this website, you acknowledge and agree to this copyright policy.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
