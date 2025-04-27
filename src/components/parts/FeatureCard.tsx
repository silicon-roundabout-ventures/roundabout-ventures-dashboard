import React from 'react';
import { GlassCard } from './GlassCard';

interface FeatureCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
}

/**
 * Feature card component for consistent display of feature information
 * Used primarily in the "Our Mission" section to show company features
 */
export function FeatureCard({ title, description, className = '' }: FeatureCardProps) {
  return (
    <div className={`glass-card ${className}`}>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-white">{description}</p>
    </div>
  );
}
