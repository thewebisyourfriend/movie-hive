import React, { useState, useEffect } from "react";
import CustomImage from "./CustomImage";
import Link from "next/link";
import styles from "../styles/Grid.module.scss";

function Grid({ items }) {
  return (
    <section className={styles.container}>
      {items.length > 0 &&
        items.map((item) => {
          if (!item.link) return <Content key={item.id} item={item} />;
          return (
            <div key={item.id}>
              <Link href={item.link}>
                <a>
                  <Content item={item} />
                </a>
              </Link>
            </div>
          );
        })}
    </section>
  );
}

function Content({ item }) {
  return (
    <div>
      <CustomImage alt={item.title} src={item.imageUrl} width="300" height="450" />
      <div>
        <p>{item.title}</p>
        {item.additional && item.additional.length > 0 && item.additional.map((item) => <p key={item.id}>{item.text}</p>)}
      </div>
    </div>
  );
}

export default Grid;
