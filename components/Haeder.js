import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../public/movie-hive.png";
import styles from "../styles/Header.module.scss";

function Header() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  const onScrollEffect = () => {
    if (window.scrollY > 100) {
      setIsDark(true);
    } else setIsDark(false);
  };

  useEffect(() => {
    console.log(router)
  }, [router]);

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
      <div>
        <Link href="/movies">
          <a className={`${styles.link} ${router.asPath.includes("/movies") ? styles.active : ""}`}>Movies</a>
        </Link>
        <Link href="/shows">
          <a className={`${styles.link} ${router.asPath.includes("/shows") ? styles.active : ""}`}>Shows</a>
        </Link>
      </div>
    </header>
  );
}

export default Header;
