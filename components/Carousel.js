import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import CustomImage from "./CustomImage";
import Loader from "react-loader-spinner";

import styles from "../styles/Carousel.module.scss";

export default function Carousel({ items, add, config, totalItems, pending, error }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasInitilized, setHasInitilized] = useState(false);

  const carouselConfig = {
    ...config,
    ...{
      created: (slider) => {
        setHasInitilized(true);
        setCurrentSlide(1);
      },
    },
  };
  const [sliderRef, slider] = useKeenSlider(carouselConfig);

  function slide(direction) {
    if (direction === "left" && currentSlide === 1) return;

    if (direction === "left") {
      slider.prev();
      setCurrentSlide(currentSlide - 1);
    } else if (direction === "right") {
      slider.next();
      setCurrentSlide(currentSlide + 1);
    } else {
      console.error("A direction of left or right must be set.");
    }
  }

  useEffect(() => {
    if (currentSlide === items.length - 10) add();
  }, [currentSlide, items]);

  useEffect(() => {
    if (hasInitilized) slider.resize();
  }, [hasInitilized, items]);

  return (
    <>
      <div className={styles.navigation_wrapper}>
        <div ref={sliderRef} className="keen-slider">
          {items.map((item) => {
            return (
              <div className="keen-slider__slide" key={item.id}>
                <Link href={item.link}>
                  <a>
                    <CustomImage alt={item.title} src={item.imageUrl} width="300" height="450" />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
        {slider && (
          <>
            <ArrowLeft onClick={(e) => slide("left")} disabled={currentSlide === 1} />
            <ArrowRight onClick={(e) => slide("right")} disabled={items.length === totalItems} pending={pending} />
          </>
        )}
      </div>
    </>
  );
}

function ArrowLeft(props) {
  const disabeld = props.disabled ? styles.arrow_disabled : "";
  return (
    <div className={styles.left} onClick={props.onClick}>
      <svg className={`${styles.arrow} ${styles.arrow_left} ${disabeld}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
    </div>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? styles.arrow_disabled : "";
  if (props.pending) {
    return (
      <div className={styles.arrow_spinner_right}>
        <Loader type="Oval" color="#C4A80A" height={30} width={30} />
      </div>
    );
  } else {
    return (
      <div className={styles.right} onClick={props.onClick}>
        <svg className={`${styles.arrow} ${styles.arrow_right} ${disabeld}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        </svg>
      </div>
    );
  }
}
