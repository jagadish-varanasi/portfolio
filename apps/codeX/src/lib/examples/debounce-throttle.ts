export const debounceThrottleExample = {
  js: `import React, { useState, useCallback } from 'react';

/**
 * Debouncing: Delays the execution of a function until after a specified delay
 * of no more function calls. Useful for handling frequent events like search input.
 * 
 * Example: User typing in a search box - we want to wait until they stop typing
 * before making an API call.
 */
function useDebounce(callback, delay) {
  const [timeoutId, setTimeoutId] = useState(null);

  const debouncedCallback = useCallback((...args) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  }, [callback, delay, timeoutId]);

  return debouncedCallback;
}

/**
 * Throttling: Limits the rate at which a function can be called.
 * Executes the function at most once per specified interval.
 * 
 * Example: Window resize or scroll events - we want to limit how often
 * we handle these frequent events.
 */
function useThrottle(callback, limit) {
  const [lastRun, setLastRun] = useState(Date.now());

  const throttledCallback = useCallback((...args) => {
    const now = Date.now();

    if (now - lastRun >= limit) {
      callback(...args);
      setLastRun(now);
    }
  }, [callback, lastRun, limit]);

  return throttledCallback;
}

function DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulate API call
  const searchAPI = async (term) => {
    setIsSearching(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setResults([term + '1', term + '2', term + '3']);
    setIsSearching(false);
  };

  // Debounce the search API call by 300ms
  const debouncedSearch = useDebounce((term) => {
    searchAPI(term);
  }, 300);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-4">Debounced Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          debouncedSearch(value);
        }}
        placeholder="Type to search..."
        className="w-full p-2 border rounded"
      />
      {isSearching ? (
        <p className="mt-2">Searching...</p>
      ) : (
        <ul className="mt-2">
          {results.map((result, index) => (
            <li key={index} className="p-2 hover:bg-gray-100">
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ThrottledWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [updateCount, setUpdateCount] = useState(0);

  // Throttle window resize updates to once per 500ms
  const throttledHandleResize = useThrottle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setUpdateCount(count => count + 1);
  }, 500);

  React.useEffect(() => {
    window.addEventListener('resize', throttledHandleResize);
    return () => window.removeEventListener('resize', throttledHandleResize);
  }, [throttledHandleResize]);

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-4">Throttled Window Resize</h2>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
      <p className="text-sm text-gray-500 mt-2">
        Updates: {updateCount} (Throttled to once per 500ms)
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Debounce & Throttle Examples
      </h1>
      <DebouncedSearch />
      <ThrottledWindowSize />
    </div>
  );
}

export default App;`,

  css: `.debounce-throttle {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
}

.results-list {
  list-style: none;
  padding: 0;
}

.result-item {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.result-item:last-child {
  border-bottom: none;
}

.window-size {
  margin-top: 24px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.update-count {
  color: #666;
  font-size: 14px;
  margin-top: 8px;
}`
};