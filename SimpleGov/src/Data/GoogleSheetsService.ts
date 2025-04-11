// src/services/googleSheetsService.ts
import { DonorData, LegislationData, Comment } from '../types'; // Assuming types are in '../types'

// --- Configuration ---
// TODO: Replace with your actual published Google Sheet URLs
const DONORS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQXfvHlFkpidb5Gs9jZobqfr47_3m1xotSd3BktCX1jIojWi67NoeFrVlOaj6ulkdkK5NrqVZ5QxRQ6/pub?output=csv';
const LEGISLATION_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9keVNlZyIC1pxK3E0z4Kw8tcGDI2ov8IPbHixLx47GESl9fDAIm02aIpRU-PLXmAhRrgsVmyS3k2f/pub?gid=1896981274&single=true&output=csv';
const COMMENTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRTV1CPv8wQSfHTpi1G3Njd86NODvL-EQLHrXmFPULRXKVFb9bzWUNolygCDKOWdq6Eq1zpymrxKmC/pub?gid=0&single=true&output=csv';

// TODO: Replace with your actual Google Form URL and Entry IDs if using Form submission
const COMMENT_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
const COMMENT_FORM_AUTHOR_ENTRY = 'entry.123456789'; // Replace with actual Author field entry ID
const COMMENT_FORM_TEXT_ENTRY = 'entry.987654321';   // Replace with actual Text field entry ID

// TODO: Replace with your actual Google Apps Script URL if using Apps Script submission
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
// --- End Configuration ---


/**
 * Parses CSV data, attempting to handle quoted fields and escaped quotes ("").
 * NOTE: For maximum robustness, consider using a dedicated library like papaparse.
 * @param csv The raw CSV string.
 * @returns An array of objects representing the rows.
 */
const parseCSV = (csv: string): Record<string, string>[] => {
  const lines = csv.split(/\r?\n/); // Handle both \n and \r\n line endings
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(header => header.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines

    const values: string[] = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === '"') {
        if (insideQuotes && j + 1 < line.length && line[j + 1] === '"') {
          // Handle escaped double quote ""
          currentValue += '"';
          j++; // Skip the second quote
        } else {
          // Toggle quote state (entering or exiting quotes)
          insideQuotes = !insideQuotes;
          // Don't add the quote character itself to the value here
        }
      } else if (char === ',' && !insideQuotes) {
        // End of a field
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        // Regular character
        currentValue += char;
      }
    }
    values.push(currentValue.trim()); // Add the last value

    if (values.length === headers.length) {
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || ''; // Assign value, default to empty string if undefined
      });
      data.push(obj);
    } else {
        console.warn(`Skipping line ${i+1}: Mismatched number of values (${values.length}) and headers (${headers.length}). Line content: "${line}"`);
    }
  }
  // Type assertion needed here because filter(Boolean) wasn't used
  return data as Record<string, string>[];
};


export const convertAmountToNumber = (amountStr: string | undefined): number => {
    if (!amountStr || typeof amountStr !== 'string') {
      // Changed to console.warn
      console.warn("Warning: Invalid amount value encountered:", amountStr);
      return 0;
    }
    const valueStr = amountStr.replace(/[$,]/g, '');
    if (valueStr.endsWith('M')) {
      return parseFloat(valueStr.slice(0, -1)) * 1000000;
    } else if (valueStr.endsWith('K')) {
      return parseFloat(valueStr.slice(0, -1)) * 1000;
    }
    return parseFloat(valueStr) || 0;
};


export const getDonors = async (): Promise<DonorData[]> => {
    try {
        const response = await fetch(DONORS_SHEET_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch donors data: ${response.status} ${response.statusText}`);
        }
        const csv = await response.text();
        // console.log('First 100 chars of Donors CSV:', csv.substring(0, 100)); // Debugging log commented out
        const parsedData = parseCSV(csv);
        // console.log('First parsed Donor item:', parsedData[0]); // Debugging log commented out

        return parsedData.map(item => ({
          id: parseInt(item.id) || 0,
          name: item.name || '',
          amount: item.amount || '$0', // Keep original amount string if needed by UI
          party: item.party || '',
          numericAmount: convertAmountToNumber(item.amount)
        }));
    } catch (error) {
        console.error('Error fetching donors:', error);
        throw error; // Re-throw for calling code to handle
    }
};


export const getLegislation = async (): Promise<LegislationData[]> => {
    try {
        const response = await fetch(LEGISLATION_SHEET_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch legislation data: ${response.status} ${response.statusText}`);
        }
        const csv = await response.text();
        const parsedData = parseCSV(csv);

        return parsedData.map(item => ({
            id: parseInt(item.id) || 0,
            billName: item.billName || '',
            status: item.status || '',
            sponsoredBy: item.sponsoredBy || '',
        }));
    } catch (error) {
        console.error('Error fetching legislation:', error);
        throw error;
    }
};


export const getComments = async (): Promise<Comment[]> => {
  try {
    // Removed unnecessary Content-Type header for GET request
    const response = await fetch(COMMENTS_SHEET_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status} ${response.statusText}`);
    }
    const csv = await response.text();
    const parsedData = parseCSV(csv);

    return parsedData.map(item => ({
      // Added fallbacks for robustness
      id: parseInt(item.id) || Date.now() + Math.random(), // Use timestamp/random as fallback ID if needed
      author: item.author || 'Unknown Author',
      text: item.text || '',
      timestamp: item.timestamp || new Date().toISOString(), // Provide fallback timestamp
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};


export const addComment = async (comment: { author: string; text: string }): Promise<Comment> => {
  try {
    const formData = new FormData();
    // Use configured entry IDs
    formData.append(COMMENT_FORM_AUTHOR_ENTRY, comment.author);
    formData.append(COMMENT_FORM_TEXT_ENTRY, comment.text);

    // Submit the form - response cannot be checked due to 'no-cors'
    await fetch(COMMENT_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });

    // Optimistic update: Return the comment with a temporary ID and current timestamp
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19); // Include seconds

    return {
      id: Date.now(), // Temporary ID
      author: comment.author,
      text: comment.text,
      timestamp: timestamp // Use more precise timestamp
    };
  } catch (error) {
    console.error('Error adding comment via Google Form:', error);
    throw error; // Let calling code know something went wrong
  }
};


export const addCommentWithAppsScript = async (comment: { author: string; text: string }): Promise<Comment> => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // Apps Script web apps often need 'text/plain' for simple POSTs,
      // check your Apps Script doPost(e) implementation.
      // If your script specifically handles JSON:
      headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         action: 'addComment', // Optional: If your script handles multiple actions
         author: comment.author,
         text: comment.text
       }),
      // If your script expects form data:
      // body: JSON.stringify({ author: comment.author, text: comment.text }) // Example if script parses JSON body
    });

    if (!response.ok) {
       // Try to get more info from the response body if available
       const errorBody = await response.text();
       throw new Error(`Failed to add comment via Apps Script: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    // Assuming Apps Script returns the added comment as JSON including id and timestamp
    const result = await response.json();

    return {
      id: result.id || Date.now(), // Use fallback ID if script doesn't return one
      author: result.author || comment.author,
      text: result.text || comment.text,
      timestamp: result.timestamp || new Date().toISOString() // Use fallback timestamp
    };
  } catch (error) {
    console.error('Error adding comment via Apps Script:', error);
    throw error;
  }
};