import { useRouter } from "next/router";
import TransactionForm from "~/components/TransactionForm";
import { api } from "~/utils/api";
import type { newTransactionType } from "~/utils/types";

export default function NewForm() {
  const mutate = api.loggedTransaction.createLog.useMutation();
  const router = useRouter();
  const onSubmit = (values: newTransactionType) => {
    mutate.mutate(values);
  };
  if (mutate.isSuccess) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push("/app");
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gray-100 pt-28">
        <div className=" w-4/5 max-w-7xl rounded-md bg-gray-200 p-2 sm:w-3/4">
          <h1 className="text-center text-2xl font-bold text-gray-700">
            Create New
          </h1>
          <TransactionForm onSubmit={onSubmit} />
        </div>
      </main>
    </>
  );
}
