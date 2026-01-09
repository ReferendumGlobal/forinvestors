import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Send } from 'lucide-react';

export default function ContactForm({ categoryName }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <form
            action="https://formsubmit.co/urbinaagency@gmail.com"
            method="POST"
            encType="multipart/form-data"
            className="space-y-6 bg-midnight-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/5"
        >
            <input type="hidden" name="_subject" value={`New Investment Request: ${categoryName}`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://forinvestors.org/" />
            <input type="hidden" name="category" value={categoryName} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Professional Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="john@company.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="+1 555..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Capital to Invest (€)</label>
                    <input
                        type="text"
                        name="funds"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="Ex: 5,000,000"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                    Proof of Funds (POF) Document <AlertCircle size={14} />
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg bg-midnight-900 hover:bg-midnight-800 transition-colors group cursor-pointer relative">
                    <input
                        type="file"
                        name="attachment"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.png,.doc,.docx"
                    />
                    <div className="space-y-1 text-center">
                        {file ? (
                            <div className="flex flex-col items-center">
                                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                <p className="text-sm text-gray-300 mt-2">{file.name}</p>
                                <p className="text-xs text-gray-500">File uploaded successfully</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gold-400 transition-colors" />
                                <div className="flex text-sm text-gray-400 justify-center">
                                    <span className="font-medium text-gold-400">Upload a file</span>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                            </>
                        )}
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    * Required to access detailed asset information. Your documentation will be treated with absolute confidentiality.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Additional Message</label>
                <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    placeholder="Interested in properties in..."
                />
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]"
            >
                Send Request <Send size={18} className="ml-2" />
            </button>

            <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                    You can also contact us directly at <a href="mailto:urbinaagency@gmail.com" className="text-gold-400 hover:underline">urbinaagency@gmail.com</a>
                </p>
            </div>
        </form>
    );
}
