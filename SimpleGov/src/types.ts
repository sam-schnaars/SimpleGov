// src/types.ts

// Define types for political donor data
export type DonorData = {
    id: number;
    name: string;
    amount: string;
    numericAmount: number; // Added for proper sorting
    party: string;
  };
  
  // Define types for legislation data
  export type LegislationData = {
    id: number;
    billName: string;
    status: string;
    sponsoredBy: string;
  };
  
  // Comment type for discussion section
  export type Comment = {
    id: number;
    author: string;
    text: string;
    timestamp: string;
  };
  
  // Loading states to track data fetching
  export type LoadingState = {
    donors: boolean;
    legislation: boolean;
    comments: boolean;
  };
  
  // Error states to track potential API errors
  export type ErrorState = {
    donors: string | null;
    legislation: string | null;
    comments: string | null;
  };
  
  // Sort direction type
  export type SortDirection = "asc" | "desc";
  
  // Form data for submitting a new comment
  export type CommentFormData = {
    author: string;
    text: string;
  };