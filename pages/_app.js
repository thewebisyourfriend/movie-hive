import { wrapper } from "../store";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import "keen-slider/keen-slider.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
