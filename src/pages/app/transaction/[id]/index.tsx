import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { formatsUnix } from "~/utils/helperFunctions";

export default function ShowById() {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  if (!router.query.id || !id) {
    return <h1>Error</h1>;
  }

  const {
    data: matchingTransaction,
    isLoading: transactionIsLoading,
    isError,
  } = api.loggedTransaction.getLog.useQuery(id);

  const {
    mutate: removeLog,
    isLoading: deleteLoading,
    isSuccess: deleteIsSucessful,
  } = api.loggedTransaction.deleteLog.useMutation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    removeLog(id);
  };

  if (transactionIsLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-gray-100 pt-28">
        <div className=" min-h-[18rem] w-4/5 max-w-7xl rounded-md bg-gray-200 p-5 shadow sm:w-3/5">
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  if (isError || !matchingTransaction) {
    return <div>There was an error!</div>;
  }

  if (deleteIsSucessful) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push("/app");
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 pt-28">
      <div className=" min-h-[18rem] w-4/5 max-w-7xl rounded-md bg-gray-200 p-5 shadow sm:w-3/5">
        <div className="mb-6 flex flex-col items-center justify-between space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            ${Number(matchingTransaction.amount).toFixed(2)}
          </h1>
          <p className="text-md text-gray-500">
            {matchingTransaction.deposit ? "Deposit" : "Withdrawal"}
          </p>
          <p className="text-md text-gray-500">
            Name: {matchingTransaction.title}
          </p>
          <p className="text-md text-gray-500">
            From: {matchingTransaction.from}
          </p>
          <p className="text-md text-gray-500">
            Date: {formatsUnix(matchingTransaction.date, "long")}
          </p>
          <p className="text-md text-gray-500">
            Category: {matchingTransaction.category}
          </p>
        </div>
        <div className="flex justify-around">
          <Link href="/app">
            <button className="rounded-md border bg-sky-600 p-2 px-4 text-white hover:border-sky-500 hover:bg-white hover:text-sky-500 sm:px-6">
              Back
            </button>
          </Link>
          <Link href={`/app/transaction/${id}/edit`}>
            <button className="rounded-md border bg-sky-600 p-2 px-4 text-white hover:border-sky-500 hover:bg-white hover:text-sky-500 sm:px-6">
              Edit
            </button>
          </Link>
          <button
            className="rounded-md border bg-red-500 p-2 px-4 text-white hover:border-red-500 hover:bg-white hover:text-red-500 sm:px-6"
            onClick={handleClick}
          >
            {!deleteLoading ? "Delete" : "Loading..."}
          </button>
        </div>
      </div>
    </main>
  );
}
