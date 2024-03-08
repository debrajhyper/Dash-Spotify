import { useState, useEffect } from "react";

// Custom hook to debounce a value
export const useDebounce = (value, delay = 300) => {
    // State to hold the debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Effect to update the debounced value after a delay
    useEffect(() => {
        // Set a timeout to update the debounced value
        const timeout = setTimeout(() => {
            setDebouncedValue(value); // Update the debounced value after the delay
        }, delay);

        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(timeout); // Clear the timeout when component unmounts or value changes
        };
    }, [value, delay]); // Run the effect whenever the value or delay changes

    // Return the debounced value
    return debouncedValue;
};
