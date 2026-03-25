"use client";

import { useState } from "react";
import { ProductCard } from "@/components/marketplace/product-card";
import { SourcingSidebar } from "@/components/marketplace/sourcing-sidebar";
import { CategoryTabs } from "@/components/marketplace/category-tabs";
import styles from "./marketplace.module.css";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  creditPrice: number;
  image: string;
  isVerified: boolean;
  description?: string;
}

interface SourcingItem {
  id: string;
  name: string;
  creditPrice: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "NPK 20-20-20 (50kg bag)",
    category: "Inputs & Supplies",
    price: 18000,
    creditPrice: 18500,
    image: "/MarketplaceImg/AddtosourcingImg-1.png",
    isVerified: true,
    description: "Premium NPK fertilizer for optimal crop growth",
  },
  {
    id: "2",
    name: "Yellow Corn Seed (50LB)",
    category: "Seeds",
    price: 17000,
    creditPrice: 17500,
    image: "/MarketplaceImg/AddtosourcingImg-2.png",
    isVerified: true,
    description: "High-yielding hybrid corn seed variety",
  },
  {
    id: "3",
    name: "Drip Irrigation (1 Hectare)",
    category: "Equipment",
    price: 70000,
    creditPrice: 71000,
    image: "/MarketplaceImg/AddtosourcingImg-3.jpg",
    isVerified: true,
    description: "Complete drip irrigation system for 1 hectare",
  },
  {
    id: "4",
    name: "Corn Seed (50kg bag)",
    category: "Seeds",
    price: 16000,
    creditPrice: 16500,
    image: "/MarketplaceImg/AddtosourcingImg-2.png",
    isVerified: true,
    description: "Quality corn seeds for improved yield",
  },
  {
    id: "5",
    name: "Organic Fertilizer (25kg)",
    category: "Inputs & Supplies",
    price: 12000,
    creditPrice: 12500,
    image: "/MarketplaceImg/AddtosourcingImg-1.png",
    isVerified: true,
    description: "Organic fertilizer for sustainable farming",
  },
  {
    id: "6",
    name: "Soil Testing Kit",
    category: "Equipment",
    price: 8000,
    creditPrice: 8500,
    image: "/MarketplaceImg/AddtosourcingImg-3.jpg",
    isVerified: false,
    description: "Professional soil analysis kit",
  },
  {
    id: "7",
    name: "Rice Seed Premium Grade",
    category: "Seeds",
    price: 14000,
    creditPrice: 14500,
    image: "/MarketplaceImg/AddtosourcingImg-2.png",
    isVerified: true,
    description: "Superior quality rice seeds",
  },
  {
    id: "8",
    name: "Pest Control Spray (5L)",
    category: "Inputs & Supplies",
    price: 9000,
    creditPrice: 9500,
    image: "/MarketplaceImg/AddtosourcingImg-1.png",
    isVerified: true,
    description: "Effective pest management solution",
  },
  {
    id: "9",
    name: "Farm Tools Bundle",
    category: "Equipment",
    price: 25000,
    creditPrice: 25500,
    image: "/MarketplaceImg/AddtosourcingImg-3.jpg",
    isVerified: true,
    description: "Complete set of essential farm tools",
  },
];

const CATEGORIES = [
  "All Products",
  "Seeds",
  "Inputs & Supplies",
  "Equipment",
  "Services",
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [sourcingList, setSourcingList] = useState<SourcingItem[]>([]);

  const filteredProducts =
    activeCategory === "All Products"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToSourcing = (product: Product) => {
    const exists = sourcingList.some((item) => item.id === product.id);

    if (!exists) {
      setSourcingList([
        ...sourcingList,
        {
          id: product.id,
          name: product.name,
          creditPrice: product.creditPrice,
          image: product.image,
        },
      ]);
    }
  };

  const handleRemoveFromSourcing = (id: string) => {
    setSourcingList(sourcingList.filter((item) => item.id !== id));
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Agricultural Marketplace</h1>
          <p className={styles.subtitle}>
            Access premium agricultural inputs, seeds, and equipment with
            flexible credit terms
          </p>
        </div>
      </div>

      <CategoryTabs
        categories={CATEGORIES}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className={styles.container}>
        <div className={styles.productsSection}>
          <div className={styles.productsHeader}>
            <h2 className={styles.sectionTitle}>
              {activeCategory === "All Products"
                ? "Featured Products"
                : activeCategory}
            </h2>
            <span className={styles.productCount}>
              {filteredProducts.length} products
            </span>
          </div>

          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToSourcing={handleAddToSourcing}
              />
            ))}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <SourcingSidebar
            items={sourcingList}
            onRemove={handleRemoveFromSourcing}
          />
        </aside>
      </div>
    </main>
  );
}
