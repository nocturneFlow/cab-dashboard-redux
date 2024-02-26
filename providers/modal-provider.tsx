"use client";

import { TaxiparkModal } from "@/components/modals/taxipark-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMoundted] = useState(false);

  useEffect(() => {
    setIsMoundted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <TaxiparkModal />
    </>
  );
};
