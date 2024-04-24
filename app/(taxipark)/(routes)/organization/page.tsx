"use client";

import React from "react";

import { OrganizationProfile } from "@clerk/nextjs";

export default function OrganizationPage() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center space-y-6">
        <OrganizationProfile />
      </div>
    </>
  );
}
