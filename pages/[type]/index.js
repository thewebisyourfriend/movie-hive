import { wrapper } from "../../store";

export default function Type({ title }) {
  return (
    <>
      <h1>{title}</h1>
      <h2>ffff</h2>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  if (params.type.toString() != "movies" && params.type.toString() != "shows") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      title: params.type,
    },
  };
});
