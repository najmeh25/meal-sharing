"use client";
import { useState } from "react";
import styles from "./SearchBox.module.css";

function SearchBox({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    onSearch(input.trim());
  };

  return (
    <div className={styles.searchBoxContainer}>
      <input
        type="text"
        placeholder="Search meals..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
}

export default SearchBox;
