import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { formatsUnix, getsAndFormatsTotal } from "~/utils/helperFunctions";
// import { Modal } from "~/components/dialog";

const App: NextPage = () => {
  const { data, isLoading } = api.loggedTransaction.getAll.useQuery();

  const currentBalance = getsAndFormatsTotal(data);

  if (isLoading || !data) {
  }

  return (
    <>
      <Head>
        <title>Budgtr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gray-100 p-10">
        <div className="w-4/5 max-w-7xl sm:w-3/4 ">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">Welcome to Budgtr</h1>
            Current Balance:
            <p>
              <span
                className={
                  currentBalance < 0
                    ? "text-red-400"
                    : currentBalance < 100
                    ? "text-yellow-400"
                    : "text-emerald-600"
                }
              >{`$${currentBalance.toFixed(2)}`}</span>
            </p>
            {data?.map((item) => {
              return (
                <Link
                  // href={`/app/transaction/[transactionId]`}
                  href={`app/transaction/${encodeURIComponent(
                    item.transactionId
                  )}`}
                  key={item.transactionId}
                  className="w-full"
                >
                  <div className=" flex  cursor-pointer border-b hover:bg-gray-200">
                    <div className="p-3">{formatsUnix(item.date)}</div>
                    <div className="flex-grow p-3">
                      {item.title}
                      <span className=" text-xs text-gray-500">{` · ${
                        item.deposit ? "Deposit" : "Withdrawl"
                      }`}</span>
                    </div>
                    <div
                      className={`p-3 ${
                        !item.deposit ? "text-red-500" : "text-emerald-600"
                      }`}
                    >{`$${Number(item.amount).toFixed(2)}`}</div>
                  </div>
                </Link>
              );
            })}
            <div className="mt-5 w-full"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
