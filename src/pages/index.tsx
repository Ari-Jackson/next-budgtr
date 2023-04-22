import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  console.log(
    api.loggedTransaction.getSingle.useQuery("clgr0o5ud0000yaaica1fgw1d").data
  );

  return (
    <>
      <Head>
        <title>Budgtr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">Hello, world!</main>
    </>
  );
};

export default Home;
