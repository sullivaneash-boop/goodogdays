"use client";

import Link from "next/link";
import { m } from "framer-motion";
import styles from "./Popup.module.css";

type ScrollOfferCardProps = {
  title: string;
  body: string;
  href: string;
  onDismiss: () => void;
  onAccept: () => void;
};

export function ScrollOfferCard({ title, body, href, onDismiss, onAccept }: ScrollOfferCardProps) {
  return (
    <m.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.24 }}
      aria-label="Help finding the right service"
      className={`${styles.surface} ${styles.offer}`}
    >
      <button type="button" onClick={onDismiss} aria-label="Dismiss offer" className={styles.close}>×</button>
      <p className={styles.eyebrow}>A little guidance</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
      <Link href={href} onClick={onAccept} className={styles.action}>
        Get Started <span aria-hidden="true">→</span>
      </Link>
    </m.aside>
  );
}
