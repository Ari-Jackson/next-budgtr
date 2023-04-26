import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

type datatype = {
  deposits: {
    _sum: {
      amount: string | null;
    };
  };
  withdrawl: {
    _sum: {
      amount: string | null;
    };
  };
};

export default function Navbar({ data }: { data: datatype }) {
  const depositSum = Number(data.deposits._sum.amount);
  const withdrawSum = Number(data.withdrawl._sum.amount);

  return (
    <nav className="flex min-w-full justify-between bg-sky-600 p-4 text-white">
      <Link href="/">
        <h1 className="text-3xl">Budgtr</h1>{" "}
      </Link>
      <div className="flex w-1/4 items-center justify-between">
        <div>
          <h1>Current Balance:</h1>
          <h1 className="text-xl"> ${(depositSum - withdrawSum).toFixed(2)}</h1>
        </div>

        <Link href="/app/new">
          <button className="rounded-md border p-2 transition-colors duration-200 sm:hover:bg-white sm:hover:text-sky-600">
            New Transaction
          </button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
