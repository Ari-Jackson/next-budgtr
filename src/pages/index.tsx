import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Budgtr | Home</title>
      </Head>
      <main className="flex flex-col items-center">
        <h1>Welcome to Budgtr</h1>
        {!!user.isSignedIn && (
          <button className="">
            <Link href="/app">See transactions</Link>
          </button>
        )}
        {!user.isSignedIn && (
          <button>
            <Link href="/sign-in">Sign In</Link>
          </button>
        )}
      </main>
    </>
  );
};

export default Home;
