import styles from "../styles/Hero.module.scss";
import CustomImage from "./CustomImage";

import { useRouter } from "next/router";

export default function Hero(props) {
  const router = useRouter();
  const href = `/get/${encodeURIComponent(props.type)}/${encodeURIComponent(props.id)}`;
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  if (props.isItemPage === true) return <Content {...props} />;

  return (
    <a href={href} onClick={handleClick}>
      <Content {...props} />
    </a>
  );
}

function Content({ isItemPage, title, type, id, imgPath, overview, genres, raiting }) {
  return (
    <div className={styles.hero}>
      <CustomImage alt={title} src={imgPath} layout="fill" objectFit="cover" quality={50} />
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{overview}</p>
      </div>
    </div>
  );
}
