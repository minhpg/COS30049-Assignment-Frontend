import { useEffect, useState } from "react";

// https://betterprogramming.pub/autocomplete-search-component-with-react-and-typescript-94fa0e21fa04

const useAutocomplete = (
  data,
  inputSearchRef
) => {
  const [searchedValue, setSearchedValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  useEffect(() => {
    if (inputSearchRef) {
      inputSearchRef.focus();
    }
  }, []);

  const handleChange = (event) => {
    if (event.target.value !== "") {
      const filteredSuggestions = data.filter((itemData) => {
        const value = event.target.value.toUpperCase();
        const name = itemData.name.common.toUpperCase();

        return value && name.startsWith(value) && name !== value;
      });
      setSearchedValue(event.target.value);
      setSuggestions(filteredSuggestions);
    } else {
      setSearchedValue("");
      setSuggestions([]);
      setSelectedSuggestion("");
      setActiveSuggestion(0);
    }
  };

  const handleKeyDown = (
    event
  ) => {
    if (event.key === "ArrowDown" && activeSuggestion < suggestions.length) {
      setActiveSuggestion(activeSuggestion + 1);
    } else if (event.key === "ArrowUp" && activeSuggestion > 1) {
      setActiveSuggestion(activeSuggestion - 1);
    } else if (event.key === "Enter") {
      setSearchedValue(suggestions[activeSuggestion - 1].name.common);
      setSelectedSuggestion(suggestions[activeSuggestion - 1].name.common);
      setSuggestions([]);
      setActiveSuggestion(0);
    }
  };

  const handleClick = (value) => {
    setSearchedValue(value);
    setSuggestions([]);
    setSelectedSuggestion(value);
    setActiveSuggestion(0);
  };

  return {
    searchedValue,
    suggestions,
    selectedSuggestion,
    activeSuggestion,
    handleChange,
    handleKeyDown,
    handleClick,
  };
};

export default useAutocomplete;