import React, { useState, useEffect } from 'react';
import youtube from '../api/youtube';

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (term.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timerId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timerId);
  }, [term]);

  const fetchSuggestions = async () => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        type: 'video',
        maxResults: 10,
      },
    });
    setSuggestions(response.data.items);
    setShowSuggestions(true);
  };

  const onInputChange = (event) => {
    setTerm(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(term);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    onFormSubmit(suggestion.snippet.title);
    setTerm(suggestion.snippet.title);
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onSubmit} className="ui form">
        <div className="field">
          <input
            type="text"
            value={term}
            onChange={onInputChange}
            placeholder="Suche nach Videos..."
          />
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="ui list suggestion-list">
          {suggestions.map((video) => (
            <li
              key={video.id.videoId}
              className="item"
              onClick={() => handleSuggestionClick(video)}
            >
              {video.snippet.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
