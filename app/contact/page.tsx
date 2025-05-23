'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import {
  FacebookIcon,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  User
} from 'lucide-react';
import { StatusBar } from '@/components/status-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simulate form submission
    try {
      // In a real app, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#569cd6] mb-4 flex items-center">
            <MessageSquare className="mr-2 h-7 w-7" /> Contact Me
          </h1>
          <p className="text-lg opacity-90">
            I'm always open to new opportunities and collaborations. Feel free
            to reach out to me through the form below or via my social media
            profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <Card className="bg-[#252526] border-[#3e3e3e] md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#dcdcaa] mb-4">
                Send a Message
              </h2>

              {isSubmitted ? (
                <div className="bg-[#2d2d2d] p-6 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#007acc]/20 text-[#007acc] mb-4">
                    <Send className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
                  <p className="mb-4">
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#007acc] hover:bg-[#007acc]/80">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-[#1e1e1e] border-[#3e3e3e] focus:border-[#007acc] focus:ring-[#007acc]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        required
                        className="bg-[#1e1e1e] border-[#3e3e3e] focus:border-[#007acc] focus:ring-[#007acc]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      required
                      className="bg-[#1e1e1e] border-[#3e3e3e] focus:border-[#007acc] focus:ring-[#007acc]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      required
                      rows={6}
                      className="bg-[#1e1e1e] border-[#3e3e3e] focus:border-[#007acc] focus:ring-[#007acc]"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-900/20 border border-red-800 text-red-400 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#007acc] hover:bg-[#007acc]/80 w-full">
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-[#252526] border-[#3e3e3e]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#dcdcaa] mb-4">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div id="email" className="space-y-2">
                  <div className="flex items-center text-[#569cd6]">
                    <Mail className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Email</h3>
                  </div>
                  <Link
                    href="mailto:newdexm@gmail.com"
                    className="block pl-7 hover:text-[#569cd6] transition-colors">
                    newdexm@gmail.com
                  </Link>
                </div>

                <div id="social" className="space-y-4">
                  <div className="flex items-center text-[#569cd6]">
                    <User className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Social Profiles</h3>
                  </div>

                  <div className="pl-7 space-y-3">
                    <a
                      href="https://www.facebook.com/mindex.jsx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-[#569cd6] transition-colors">
                      <FacebookIcon className="h-5 w-5 mr-2" />
                      <span>Dex Miranda</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3e3e3e]">
                  <p className="text-sm opacity-80">
                    I'm currently available for freelance work and full-time
                    positions. Response time is typically within 24-48 hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Terminal-like Section */}
        <Card className="bg-[#1e1e1e] border-[#3e3e3e] mb-8">
          <CardContent className="p-0">
            <div className="bg-[#323233] px-4 py-2 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-sm opacity-70">terminal</span>
            </div>
            <div className="p-4 font-mono text-sm">
              <div className="flex">
                <span className="text-[#4ec9b0] mr-2">user@portfolio:~$</span>
                <span className="text-[#d4d4d4]">contact --quick-response</span>
              </div>
              <div className="mt-2 text-[#d4d4d4]">
                <p>Initializing contact protocol...</p>
                <p className="mt-1">
                  Preferred contact method: Email at newdexm@gmail.com
                </p>
                <p className="mt-1">
                  Response time: Usually within 24-48 hours
                </p>
                <p className="mt-1">
                  Currently: Available for new opportunities
                </p>
                <p className="mt-3 text-[#4ec9b0]">
                  Thank you for visiting my portfolio!
                </p>
                <div className="mt-2 flex items-center">
                  <span className="text-[#4ec9b0] mr-2">user@portfolio:~$</span>
                  <span className="animate-pulse">▌</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <StatusBar />
    </div>
  );
}
