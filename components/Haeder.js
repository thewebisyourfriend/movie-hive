import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../public/movie-hive.png";
import styles from "../styles/Header.module.scss";

function Header() {
  const [isDark, setIsDark] = useState(false);

  const onScrollEffect = () => {
    if (window.scrollY > 100) {
      setIsDark(true);
    } else setIsDark(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollEffect);
    return () => {
      window.removeEventListener("scroll", onScrollEffect);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isDark && "bg-black"}`}>
      <Image src={logo} alt="Movie Hive" width={180} height={37} quality={100} />
    </header>
  );
}

export default Header;
