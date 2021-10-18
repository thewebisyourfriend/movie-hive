import Head from "next/head";

function CustomHead({ title, description }) {
  return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
  );
}

export default CustomHead;
