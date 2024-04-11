"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarTaxiFront, Trash2, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ExpenditureItemPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="grid min-h-screen w-full border rounded-md">
          <div className="grid grid-cols-2"></div>
        </div>
      )}

      {!loading && (
        <div className="grid min-h-screen w-full border rounded-md">
          <div className="grid grid-cols-2"></div>
        </div>
      )}
    </>
  );
};

export default ExpenditureItemPage;
