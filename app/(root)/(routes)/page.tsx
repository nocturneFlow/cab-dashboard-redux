"use client";

import { useTaxiparkModal } from "@/hooks/use-taxipark-modal";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useTaxiparkModal((state) => state.onOpen);
  const isOpen = useTaxiparkModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
