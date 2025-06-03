"use client";
import React, { useState } from "react";
import Image from "next/image";

const ImageModal = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false); // สำหรับ delay

  const openModal = () => {
    setOpen(true);
    setTimeout(() => setShow(true), 10); // ให้ class transition ทำงาน
  };

  const closeModal = () => {
    setShow(false);
    setTimeout(() => setOpen(false), 300); // รอ animation จบ
  };

  return (
    <div className="my-4">
      {open && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ease-in-out transform ${
            show ? "bg-black/40 opacity-100" : "bg-black/40 opacity-0"
          }`}
        >
          <div
            className={`bg-white rounded-2xl p-6 shadow-xl w-[90%] h-[90%] transition-all duration-300 ease-in-out transform
              ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <button
              onClick={() => closeModal()}
              className="absolute top-2 right-4 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">Art Toy</h2>
            <p className=" mb-4">รายละเอียดของของเล่นชิ้นนี้</p>
            <Image
              src="/rabbit.png"
              alt="กระต่ายน่ารัก"
              width={100}
              height={100}
            />
          </div>
        </div>
      )}
      <Image
        src="/rabbit.png"
        alt="กระต่ายน่ารัก"
        width={100}
        height={100}
        onClick={() => openModal()}
      />
    </div>
  );
};

export default ImageModal;
