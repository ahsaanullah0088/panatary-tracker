import { useState } from 'react';
import TextField from '@mui/material/TextField';
import '../styles/main.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
    onSearch(searchValue);
  };

  return (
    <div className="searchBarContainer">
      <TextField
        InputProps={{ className: 'searchBar' }} // Apply the searchBar class to InputProps
        label="Search Items"
        value={query}
        onChange={handleSearch}
        variant="outlined"
        aria-label="Search Input"
      />
    </div>
  );
};

export default SearchBar;
