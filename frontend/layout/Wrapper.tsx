import React from "react";
import Header from "./Header";
import AppSnackbar from "@/ui/AppSnackbar";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <AppSnackbar />
    </>
  );
};

export default Wrapper;
