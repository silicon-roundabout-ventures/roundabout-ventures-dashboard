
import React, { useState } from 'react';
import AirtableService from '../services/AirtableService';
import ParticleBackground from '../components/ParticleBackground';
import { toast } from "sonner";

const Apply = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    founderName: '',
    email: '',
    website: '',
    linkedIn: '',
    stage: '',
    industry: '',
    description: '',
    fundingTarget: '',
    pitchDeck: null as File | null
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, pitchDeck: e.target.files![0] }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.companyName || !formData.email || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      const success = await AirtableService.submitApplication(formData);
      
      if (success) {
        toast.success('Application submitted successfully!');
        setSubmitted(true);
        // Reset form
        setFormData({
          companyName: '',
          founderName: '',
          email: '',
          website: '',
          linkedIn: '',
          stage: '',
          industry: '',
          description: '',
          fundingTarget: '',
          pitchDeck: null
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Apply for Funding</h1>
            <p className="text-srv-gray">
              We're looking for exceptional founders building innovative solutions. 
              Tell us about your startup and how we can help you grow.
            </p>
          </div>
          
          {submitted ? (
            <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8 text-center">
              <div className="mb-6 text-srv-teal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Thank You for Your Application!</h2>
              <p className="text-srv-gray mb-6">
                We've received your information and will review your application. 
                Our team will be in touch with you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-srv-teal hover:bg-srv-teal/80 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Company Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className="block text-srv-gray text-sm mb-2">
                        Company Name <span className="text-srv-teal">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-srv-gray text-sm mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="industry" className="block text-srv-gray text-sm mb-2">
                        Industry <span className="text-srv-teal">*</span>
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        required
                        className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                      >
                        <option value="">Select Industry</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="HealthTech">HealthTech</option>
                        <option value="FinTech">FinTech</option>
                        <option value="Enterprise Software">Enterprise Software</option>
                        <option value="CleanTech">CleanTech</option>
                        <option value="DeepTech">DeepTech</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="stage" className="block text-srv-gray text-sm mb-2">
                        Stage <span className="text-srv-teal">*</span>
                      </label>
                      <select
                        id="stage"
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        required
                        className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                      >
                        <option value="">Select Stage</option>
                        <option value="Pre-seed">Pre-seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-srv-gray text-sm mb-2">
                      Company Description <span className="text-srv-teal">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fundingTarget" className="block text-srv-gray text-sm mb-2">
                      Funding Target <span className="text-srv-teal">*</span>
                    </label>
                    <input
                      type="text"
                      id="fundingTarget"
                      name="fundingTarget"
                      value={formData.fundingTarget}
                      onChange={handleChange}
                      required
                      placeholder="e.g. £500,000"
                      className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                    />
                  </div>
                </div>
                
                {/* Founder Information */}
                <div className="space-y-6 pt-4 border-t border-srv-blue/30">
                  <h2 className="text-xl font-semibold text-white">Founder Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="founderName" className="block text-srv-gray text-sm mb-2">
                        Founder Name <span className="text-srv-teal">*</span>
                      </label>
                      <input
                        type="text"
                        id="founderName"
                        name="founderName"
                        value={formData.founderName}
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
                    <label htmlFor="linkedIn" className="block text-srv-gray text-sm mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedIn"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pitchDeck" className="block text-srv-gray text-sm mb-2">
                      Pitch Deck (PDF)
                    </label>
                    <input
                      type="file"
                      id="pitchDeck"
                      name="pitchDeck"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="w-full bg-srv-blue/10 border border-srv-blue/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-srv-teal"
                    />
                    <p className="text-srv-gray text-xs mt-1">
                      Max file size: 10MB. For security reasons, only PDF files are accepted.
                    </p>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-6 text-center md:text-right">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      bg-srv-teal hover:bg-srv-teal/80 text-white font-medium py-3 px-8 rounded-md transition-colors
                      ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;
