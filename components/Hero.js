import TMDBConstants from "../shared/routes/tmdbApi";
import styles from "../styles/Hero.module.scss";
import CustomImage from "./CustomImage";

export default function Hero({ item }) {
  const { BASE_IMAGE_HERO } = TMDBConstants;
  return (
    <div className={styles.hero}>
      <CustomImage alt={item.media_type === "tv" ? item.name : item.original_title} src={`${BASE_IMAGE_HERO}${item.backdrop_path}`} layout="fill" objectFit="cover" quality={50} />
      <div className={styles.content}>
        <h1>{item.media_type === "tv" ? item.name : item.original_title}</h1>
        <p>{item.overview}</p>
      </div>
    </div>
  );
}
