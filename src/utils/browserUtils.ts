/**
 * Utility functions for safely interacting with browser APIs
 * These help prevent hydration errors by ensuring code only runs in browser context
 */

/**
 * Determines if code is running in a browser environment
 * This prevents SSR/hydration mismatches by ensuring browser APIs are only accessed client-side
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Safely get window location without causing SSR errors
 */
export const safeWindowLocation = (): Location | null => {
  if (isBrowser()) {
    return window.location;
  }
  return null;
};

/**
 * Safely execute browser-only code
 * @param callback Function to run only in browser context
 */
export const onlyInBrowser = (callback: () => void): void => {
  if (isBrowser()) {
    callback();
  }
};

/**
 * Safely get a value from localStorage without causing SSR errors
 */
export const safeLocalStorage = {
  getItem: (key: string, defaultValue: any = null): any => {
    if (isBrowser()) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
    return defaultValue;
  },
  
  setItem: (key: string, value: any): void => {
    if (isBrowser()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};

/**
 * Wait until document is ready
 * @param callback Function to execute when document is ready
 */
export const documentReady = (callback: () => void): void => {
  if (isBrowser()) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Call on next tick to ensure React is fully hydrated
      setTimeout(callback, 1);
    } else {
      document.addEventListener('DOMContentLoaded', () => callback());
    }
  }
};
