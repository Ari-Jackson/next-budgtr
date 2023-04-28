import { useRouter } from "next/router";
import TransactionForm from "~/components/TransactionForm";
import { api } from "~/utils/api";
import type { newTransactionType } from "~/utils/types";

export default function EditPage() {
  const { mutate, isSuccess } = api.loggedTransaction.updateLog.useMutation({});
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  if (!router.query.id || !id) {
    return <h1>Error</h1>;
  }
  const { data, isError, isLoading } =
    api.loggedTransaction.getLog.useQuery(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || !data) {
    return <h1>Error</h1>;
  }

  const { transactionId } = data;

  const onSubmit = (values: newTransactionType) => {
    mutate({ content: values, transactionId: transactionId });
  };
  if (isSuccess) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`/app/transaction/${id}`);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gray-100 pt-16">
        <div className="w-4/5 max-w-7xl rounded-md bg-gray-200 p-2 py-5 sm:w-3/5">
          <h1 className="text-center text-2xl font-bold text-gray-700">
            Update Transaction
          </h1>
          <TransactionForm
            initialValues={{ ...data, amount: Number(data.amount) }}
            onSubmit={onSubmit}
          />
        </div>
      </main>
    </>
  );
}
