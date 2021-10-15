// import CustomHead from "./CustomHead";
import Header from "./Haeder";

export default function Layout({ children }) {
  return (
    <>
      {/* <CustomHead pageTitle={title} pageDescription={description} /> */}
      <Header />
      <main>{children}</main>
    </>
  );
}
