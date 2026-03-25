"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./sourcing-sidebar.module.css";

interface SourcingItem {
  id: string;
  name: string;
  creditPrice: number;
  image: string;
}

interface SourcingSidebarProps {
  items: SourcingItem[];
  onRemove: (id: string) => void;
}

export function SourcingSidebar({ items, onRemove }: SourcingSidebarProps) {
  const total = items.reduce((sum, item) => sum + item.creditPrice, 0);

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>Sourcing List</h3>
        <span className={styles.badge}>{items.length}</span>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            Add items to your sourcing list to get started
          </p>
        </div>
      ) : (
        <>
          <div className={styles.itemsList}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-product.png";
                    }}
                  />
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>
                    ₦{item.creditPrice.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className={styles.removeBtn}
                  title="Remove from sourcing list"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className={styles.breakdown}>
            <h4 className={styles.breakdownTitle}>Payment Breakdown</h4>

            <div className={styles.breakdownItems}>
              <div className={styles.breakdownItem}>
                <span>Order Total:</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Cash Total:</span>
                <span>₦{(total * 0.9).toLocaleString()}</span>
              </div>
            </div>

            <div className={styles.marketplaceStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Maize</span>
                <span className={styles.statValue}>₦250k/ton</span>
                <span className={styles.statTrend}>↑</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Cassava</span>
                <span className={styles.statValue}>₦185k/ton</span>
                <span className={styles.statTrend}>↑</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Sorghum</span>
                <span className={styles.statValue}>₦654k/ton</span>
                <span className={styles.statTrend}>↓</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Wheat</span>
                <span className={styles.statValue}>₦213k/ton</span>
                <span className={styles.statTrend}>↑</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Cocoa</span>
                <span className={styles.statValue}>₦1.5m/ton</span>
                <span className={styles.statTrend}>↑</span>
              </div>
            </div>

            <button className={styles.payButton}>
              💳 Pay with Credit Line
            </button>
          </div>
        </>
      )}
    </div>
  );
}
