"use client";
import React from "react";
import styles from "./SortControl.module.css";

function SortControl({ sortKey, setSortKey, sortDir, setSortDir }) {
  return (
    <div className={styles.sortContainer}>
      <select
        className={styles.sortSelect}
        onChange={(e) => setSortKey(e.target.value)}
        value={sortKey}
      >
        <option value="title">Title</option>
        <option value="price">Price</option>
      </select>

      <select
        className={styles.sortSelect}
        onChange={(e) => setSortDir(e.target.value)}
        value={sortDir}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default SortControl;
