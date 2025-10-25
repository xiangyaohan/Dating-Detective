import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  recentSearches?: string[];
  className?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '搜索...',
  value = '',
  onChange,
  onSearch,
  suggestions = [],
  recentSearches = [],
  className = '',
  autoFocus = false
}) => {
  const [query, setQuery] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange?.(newValue);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      onSearch?.(finalQuery.trim());
      setShowSuggestions(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onChange?.(suggestion);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setQuery('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase()) && 
      suggestion.toLowerCase() !== query.toLowerCase()
  );

  const showRecentSearches = query.length === 0 && recentSearches.length > 0;
  const showFilteredSuggestions = query.length > 0 && filteredSuggestions.length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className={`relative flex items-center transition-all duration-200 ${
        isFocused 
          ? 'ring-2 ring-blue-500 ring-opacity-50' 
          : 'ring-1 ring-gray-300'
      } rounded-lg bg-white`}>
        <Search className="w-5 h-5 text-gray-400 ml-3" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => handleSearch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200"
        >
          搜索
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (showRecentSearches || showFilteredSuggestions) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {/* Recent Searches */}
          {showRecentSearches && (
            <div className="p-2">
              <div className="flex items-center px-3 py-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                最近搜索
              </div>
              {recentSearches.slice(0, 5).map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-150"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {showFilteredSuggestions && (
            <div className="p-2">
              {showRecentSearches && <div className="border-t border-gray-100 my-2" />}
              <div className="flex items-center px-3 py-2 text-sm text-gray-500">
                <TrendingUp className="w-4 h-4 mr-2" />
                搜索建议
              </div>
              {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-150"
                >
                  <span className="font-medium">
                    {suggestion.substring(0, suggestion.toLowerCase().indexOf(query.toLowerCase()))}
                  </span>
                  <span className="bg-yellow-200">
                    {suggestion.substring(
                      suggestion.toLowerCase().indexOf(query.toLowerCase()),
                      suggestion.toLowerCase().indexOf(query.toLowerCase()) + query.length
                    )}
                  </span>
                  <span className="font-medium">
                    {suggestion.substring(suggestion.toLowerCase().indexOf(query.toLowerCase()) + query.length)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;