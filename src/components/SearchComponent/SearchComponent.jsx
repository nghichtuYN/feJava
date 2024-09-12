import React from "react";
import "./style.css";
import { FaSearch } from "react-icons/fa";
const SearchComponent = (props) => {
  const { placeholder } = props;
  return (
    <div className="input-wrapper">
      <input type="text" placeholder={placeholder} />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchComponent;
