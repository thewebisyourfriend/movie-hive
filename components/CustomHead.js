import Head from "next/head";

function CustomHead({ pageTitle, pageDescription }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
    </>
  );
}

export default CustomHead;
