"use client";
import React from "react";
import Link from "next/link";

const ButtonPrimary = ({ children }: { children: React.ReactNode }) => {
  return (
    // แก้เอา button ออกเพราะ Link เป็น element ที่สามารถคลิกได้อยู่แล้ว
    <Link href="/toy" className="btn-primary">
      {children}
    </Link>
  );
};

export default ButtonPrimary;
