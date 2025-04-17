/**
 * Team Types
 * 
 * Type definitions for team members and related data structures
 */
import { ReactNode } from 'react';

/**
 * Interface for team member data
 */
export interface TeamMember {
  /** Team member name */
  name: string;
  /** Role or position in the company */
  role: string;
  /** Description or bio (can be string or React node) */
  description: string | ReactNode;
  /** Gatsby Image data for profile picture */
  image?: any;
  /** Image source URL if no Gatsby image is provided */
  imageSrc?: string | null;
  /** LinkedIn profile URL */
  linkedin?: string | null;
  /** Twitter/X profile URL */
  twitter?: string | null;
  /** GitHub profile URL */
  github?: string | null;
  /** Personal blog URL */
  blog?: string | null;
}

/**
 * Interface for team data structure
 */
export interface TeamData {
  /** Lead team members (e.g., founders, C-level) */
  leads: TeamMember[];
  /** Partner team members */
  partners: TeamMember[];
  /** Advisory team members (optional) */
  advisors?: TeamMember[];
}
