"use client";

import styles from "./category-tabs.module.css";

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export function CategoryTabs({
  categories,
  active,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`${styles.tab} ${
              active === category ? styles.active : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
