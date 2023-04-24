import dayjs from "dayjs";
import { useState } from "react";
import type { newTransactionType } from "~/utils/types";
const defaultFormValues = {
  name: "",
  amount: 0,
  date: dayjs().valueOf(),
  from: "",
  category: "",
  deposit: false,
};
type TransactionFormProps = {
  onSubmit: (transaction: newTransactionType) => void;
  initialValues?: newTransactionType;
};

export default function TransactionForm({
  onSubmit,
  initialValues = defaultFormValues,
}: TransactionFormProps) {
  const [transaction, setTransaction] = useState({ ...initialValues });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "amount") {
      setTransaction((old) => ({
        ...old,
        [e.target.id]: Number(e.target.value),
      }));
    } else if (e.target.id === "date") {
      setTransaction((old) => ({
        ...old,
        [e.target.id]: dayjs(e.target.value).valueOf(),
      }));
    } else if (e.target.id === "deposit") {
      setTransaction((old) => ({
        ...old,
        [e.target.id]: e.target.checked,
      }));
    } else {
      setTransaction((old) => ({
        ...old,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(transaction);
  };
  console.log(transaction.deposit);

  return (
    <form
      className="mx-auto flex w-1/2 flex-col space-y-3"
      onSubmit={handleSubmit}
    >
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="name"
      >
        Name
      </label>
      <input
        type="text"
        id="name"
        className="rounded-md px-4 py-2"
        onChange={handleChange}
        value={transaction.name}
      />
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="from"
      >
        From
      </label>
      <input
        type="text"
        id="from"
        className="rounded-md px-4 py-2"
        onChange={handleChange}
        value={transaction.from}
      />
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="date"
      >
        Date
      </label>
      <input
        type="date"
        id="date"
        className="rounded-md px-4 py-2"
        onChange={handleChange}
        value={dayjs(transaction.date).format("YYYY-MM-DD")}
      />
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="date"
      >
        Category
      </label>
      <input
        type="text"
        id="category"
        className="rounded-md px-4 py-2"
        onChange={handleChange}
        value={transaction.category}
      />
      <div className="flex gap-36">
        <div>
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="rounded-md px-4 py-2"
            min={0.01}
            step={0.01}
            onChange={handleChange}
            value={transaction.amount}
          />
        </div>
        <div>
          <label
            htmlFor="deposit"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Depsoit
          </label>
          <label className="relative mb-4 ml-8 inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={transaction.deposit}
              id="deposit"
              className="peer sr-only"
              onChange={handleChange}
            />
            <div className="after:border-gray-00 peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-sky-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-sky-800"></div>
          </label>
        </div>
      </div>
      <input
        type="submit"
        className=" mx-auto w-fit rounded-md border bg-sky-500 p-3 text-white transition-colors duration-200 sm:hover:cursor-pointer sm:hover:border-sky-500 sm:hover:bg-gray-100 sm:hover:text-sky-500"
      />
    </form>
  );
}
