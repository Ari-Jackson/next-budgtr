import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import LoadingSpinner from "~/components/LoadingSpinner";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { isLoading, data, isError } =
    api.loggedTransaction.getTotal.useQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return <h1>Error</h1>;
  }

  return (
    <ClerkProvider {...pageProps}>
      <Navbar data={data} />

      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
