"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import styles from "./product-card.module.css";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  creditPrice: number;
  image: string;
  isVerified: boolean;
  description?: string;
  onAddToSourcing?: (product: ProductCardProps) => void;
}

export function ProductCard({
  id,
  name,
  category,
  price,
  creditPrice,
  image,
  isVerified,
  description,
  onAddToSourcing,
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToSourcing = () => {
    setIsAdded(true);
    onAddToSourcing?.({
      id,
      name,
      category,
      price,
      creditPrice,
      image,
      isVerified,
      description,
    });

    // Reset button state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          width={280}
          height={200}
          className={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-product.png";
          }}
        />
        {isVerified && <div className={styles.verifiedBadge}>✓ Verified</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.category}>{category}</span>
        </div>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.pricing}>
          <div className={styles.priceItem}>
            <span className={styles.label}>Cash Price</span>
            <span className={styles.amount}>₦{price.toLocaleString()}</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.priceItem}>
            <span className={styles.label}>Credit Price</span>
            <span className={styles.creditAmount}>
              ₦{creditPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToSourcing}
          className={`${styles.button} ${isAdded ? styles.added : ""}`}
        >
          {isAdded ? "✓ Added" : "Add to Sourcing"}
        </button>
      </div>
    </div>
  );
}
