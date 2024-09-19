import React from "react";
import "./style.css";
import { FaSearch } from "react-icons/fa";
const SearchComponent = (props) => {
  const {search, placeholder,onChange } = props;
  return (
    <div className="input-wrapper">
      <input value={search} onChange={onChange} type="text" placeholder={placeholder} />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchComponent;
