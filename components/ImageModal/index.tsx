"use client";
import React, { useState } from "react";
import Image from "next/image";
import CustomCanvas from "../CustomCanvas";

const buttonConfig = {
  body: { top: 250, left: 375, max: 2 },
  shirt: { top: 450, left: 375, max: 2 },
  pants: { top: 600, left: 375, max: 3 },
  cap: { top: 220, left: 735, max: 2 },
  hoodie: { top: 450, left: 735, max: 3 },
  shoe: { top: 660, left: 735, max: 3 },
};

const ImageModal = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false); // สำหรับ delay
  const [hoveredPart, setHoveredPart] = useState<
    keyof typeof buttonConfig | null
  >(null); // สำหรับเก็บส่วนที่ถูก hover

  const [visibleMap, setVisibleMap] = useState({
    body: 0,
    shirt: 0,
    pants: 0,
    hoodie: 0,
    cap: 0,
    shoe: 0,
  });

  const HoverButtonGroup = ({
    partKey,
    top,
    left,
    max,
    onNext,
    onPrev,
    setHover,
  }: {
    partKey: keyof typeof buttonConfig;
    top: number;
    left: number;
    max: number;
    onNext: () => void;
    onPrev: () => void;
    setHover: (p: keyof typeof buttonConfig | null) => void;
  }) => (
    <div
      onMouseEnter={() => setHover(partKey)}
      onMouseLeave={() => setHover(null)}
      className="absolute"
      style={{ top, left }}
    >
      <button onClick={onPrev}>⬅️</button>
      <button onClick={onNext}>➡️</button>
    </div>
  );

  const handleNext = (partKey: keyof typeof visibleMap, max: number) => {
    setVisibleMap((prev) => ({
      ...prev,
      [partKey]: (prev[partKey] + 1) % max,
    }));
  };

  const handlePrev = (partKey: keyof typeof visibleMap, max: number) => {
    setVisibleMap((prev) => ({
      ...prev,
      [partKey]: (prev[partKey] - 1 + max) % max,
    }));
  };

  const openModal = () => {
    setOpen(true);
    setTimeout(() => setShow(true), 10); // ให้ class transition ทำงาน
  };

  const closeModal = () => {
    setShow(false);
    setTimeout(() => setOpen(false), 300); // รอ animation จบ
  };

  console.log("Hovered Part:", hoveredPart); // แสดงส่วนที่ถูก hover ใน console

  return (
    <div className="my-4">
      {open && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ease-in-out transform ${
            show ? "bg-black/40 opacity-100" : "bg-black/40 opacity-0"
          }`}
        >
          <div
            className={`bg-white rounded-2xl p-6 shadow-xl w-[90%] h-[90%] overflow-hidden transition-all duration-300 ease-in-out transform
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
            <CustomCanvas
              onHoverPart={setHoveredPart}
              visibleMap={visibleMap}
            />
            {hoveredPart && buttonConfig[hoveredPart] && (
              <HoverButtonGroup
                partKey={hoveredPart}
                top={buttonConfig[hoveredPart].top}
                left={buttonConfig[hoveredPart].left}
                max={buttonConfig[hoveredPart].max}
                onPrev={() =>
                  handlePrev(hoveredPart, buttonConfig[hoveredPart].max)
                }
                onNext={() =>
                  handleNext(hoveredPart, buttonConfig[hoveredPart].max)
                }
                setHover={setHoveredPart}
              />
            )}
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
