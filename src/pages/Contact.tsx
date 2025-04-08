
import React, { useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-srv-gray">
              Have a question or want to learn more about Silicon Roundabout Ventures? Get in touch with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 text-center">
              <div className="text-4xl text-srv-teal mb-4">✉️</div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <a href="mailto:info@siliconroundabout.ventures" className="text-srv-gray hover:text-srv-teal transition-colors">
                info@siliconroundabout.ventures
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 text-center">
              <div className="text-4xl text-srv-teal mb-4">🏢</div>
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-srv-gray">
                London, United Kingdom
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 text-center">
              <div className="text-4xl text-srv-teal mb-4">🌐</div>
              <h3 className="text-xl font-bold text-white mb-2">Social</h3>
              <div className="flex justify-center space-x-4">
                <a href="https://twitter.com/siliconroundabt" target="_blank" rel="noopener noreferrer" className="text-srv-gray hover:text-srv-teal transition-colors">
                  Twitter
                </a>
                <a href="https://www.linkedin.com/company/siliconroundabout/" target="_blank" rel="noopener noreferrer" className="text-srv-gray hover:text-srv-teal transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-srv-gray text-sm mb-2">
                    Name <span className="text-srv-teal">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-srv-gray text-sm mb-2">
                    Email <span className="text-srv-teal">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-srv-gray text-sm mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-srv-gray text-sm mb-2">
                  Message <span className="text-srv-teal">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                />
              </div>
              
              <div className="text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    bg-srv-teal hover:bg-srv-teal/80 text-white font-medium py-3 px-8 rounded-md transition-colors
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
