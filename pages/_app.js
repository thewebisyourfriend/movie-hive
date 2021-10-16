import { wrapper } from "../store";
import Error from "next/error";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import "keen-slider/keen-slider.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App({ Component, pageProps }) {
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
