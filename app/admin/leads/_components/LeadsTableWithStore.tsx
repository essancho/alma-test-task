"use client";
import StoreProvider from "@/app/StoreProvider";
import React from "react";
import { LeadsTableClient } from "./LeadsTableClient";
import { Lead } from "@/lib/types/lead";

interface Props {
  leads: Lead[];
}

export const LeadsTableWithStore = ({ leads }: Props) => {
  return (
    <StoreProvider>
      <LeadsTableClient leads={leads} />
    </StoreProvider>
  );
};

