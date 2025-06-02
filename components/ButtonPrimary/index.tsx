"use client";
import React from "react";
import Link from "next/link";

const ButtonPrimary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link href="/toy">
      <button className="btn-primary">{children}</button>
    </Link>
  );
};

export default ButtonPrimary;
