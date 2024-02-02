"use client";

import { forwardRef, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Magnetic from "../magnetic";

const Header = forwardRef(function index(props, ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a timeout for 8 seconds to make the burger menu visible
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
      <Magnetic>
        <div className={styles.burger}>
          <div ref={ref} className={styles.bounds}></div>
        </div>
      </Magnetic>
    </div>
  );
});

export default Header;
