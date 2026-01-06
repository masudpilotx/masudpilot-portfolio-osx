import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Mail, Send, Github, Linkedin } from 'lucide-react';

export const ContactApp: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        // Simulate sending
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 3000);
        }, 1500);
    };

    return (
        <div className="h-full bg-white flex flex-col md:flex-row">
            {/* Contact Info Sidebar */}
            <div className="bg-blue-600 text-white p-8 md:w-1/3 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Let's talk</h2>
                    <p className="text-blue-100 mb-8">I'm always interested in hearing about new projects and opportunities.</p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Mail size={20} className="text-blue-200" />
                            <span className="font-mono text-sm">{portfolioData.bio.social.email.replace('mailto:', '')}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                     <a href={portfolioData.bio.social.github} className="hover:text-blue-200 transition-colors"><Github /></a>
                     <a href={portfolioData.bio.social.linkedin} className="hover:text-blue-200 transition-colors"><Linkedin /></a>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 p-8 md:p-12 overflow-auto bg-gray-50">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                            type="text" 
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white"
                            placeholder="Your Name"
                            value={formState.name}
                            onChange={e => setFormState({...formState, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white"
                            placeholder="you@example.com"
                            value={formState.email}
                            onChange={e => setFormState({...formState, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea 
                            required
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white resize-none"
                            placeholder="Tell me about your project..."
                            value={formState.message}
                            onChange={e => setFormState({...formState, message: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={sending || sent}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {sending ? 'Sending...' : sent ? 'Message Sent!' : (
                            <>
                                Send Message <Send size={18} className="ml-2" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
