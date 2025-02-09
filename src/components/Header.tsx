"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Header.module.css"; 

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        <button className={styles.navButton} onClick={() => router.push("/Homepage")}>
          Homepage
        </button>
        <button className={styles.navButton} onClick={() => router.push("/ProfilePage")}>
          Profile
        </button>
        <button className={styles.navButton} onClick={() => router.push("/Events")}>
          Events
        </button>
        <button className={styles.navButton} onClick={() => router.push("/ChatBox")}>
          ChatBox
        </button>
      </header>
      <div className={styles.spacer}></div> {/* Push content down */}
    </>
  );
};

export default Header;


