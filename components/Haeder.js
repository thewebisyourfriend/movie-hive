import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
      <Link href="/">
        <a>
          <Image src={logo} alt="Movie Hive" width={180} height={37} quality={100} />
        </a>
      </Link>
    </header>
  );
}

export default Header;
