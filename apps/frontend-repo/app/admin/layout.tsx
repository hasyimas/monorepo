"use client";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import * as React from "react";
import { useRouter } from "next/navigation";
import AppTheme from "@/theme/AppTheme";
import { CssBaseline } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  console.log(user);
  React.useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  return (
     <AppTheme >
          <CssBaseline enableColorScheme />
      {children}
      </AppTheme>
  );
}
