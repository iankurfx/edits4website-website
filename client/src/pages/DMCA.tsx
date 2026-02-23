import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DMCA() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-10 px-4">
            <div className="max-w-2xl mx-auto">
                <Card className="bg-zinc-900 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            DMCA Policy
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            CapCutTemps respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond to properly submitted copyright infringement notices.
                        </p>
                        <p>
                            We do not host any copyrighted templates or media files on our servers. All content on this website is provided for preview and informational purposes only, and users are redirected to the official CapCut platform or original sources.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-6 mb-2">Filing a DMCA Complaint</h3>
                        <p>
                            If you are a copyright owner or an authorized representative and believe that any content on this website infringes your copyright, please send a written DMCA notice to the email address below with the following information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
                            <li>Your full name and contact information.</li>
                            <li>Identification of the copyrighted work you claim has been infringed.</li>
                            <li>The exact URL or location of the allegedly infringing content on our website.</li>
                            <li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
                            <li>A statement that the information in the notice is accurate, and under penalty of perjury, you are authorized to act on behalf of the copyright owner.</li>
                            <li>Your physical or electronic signature.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-white mt-6 mb-2">Contact for DMCA Notices</h3>
                        <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-500/10 rounded-r">
                            <span className="font-semibold text-purple-400">Email:</span> <a href="mailto:capcuttemps2@gmail.com" className="text-gray-300 hover:text-white transition-colors">capcuttemps2@gmail.com</a>
                        </div>

                        <p className="mt-4">
                            Upon receiving a valid DMCA notice, we will review the request and take appropriate action, which may include removing or disabling access to the allegedly infringing content. We may also contact the person who posted the material to give them an opportunity to respond.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
