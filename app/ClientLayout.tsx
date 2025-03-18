'use client';

import Error from "./Error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useEffect, useState } from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <></>
    )
  }

  return (
    <ErrorBoundary errorComponent={Error}>
      <div>
      {children}
      </div>
    </ErrorBoundary>
  );
};

export default ClientLayout;
