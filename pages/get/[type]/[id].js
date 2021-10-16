import { wrapper } from "../../../store";

export default function Item({}) {
  return (
    <>
      <h1>hello</h1>
      <h2>world</h2>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  console.log("params", params);
  return {
    props: {},
  };
});
