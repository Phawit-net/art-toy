"use client";
import React from "react";

const SlidebarSide = () => {
  const [open, setOpen] = React.useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <button className="text-3xl" onClick={() => toggleSidebar()}>
          ☰
        </button>
      </div>

      {/* Overlay ส่วนที่ไม่ใช่ sidebar ทำให้มีสีเทาๆ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`bg-[var(--color-primary)] text-white fixed top-0 right-0 h-full w-64 p-4 z-50  transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-3xl mb-4 absolute top-4 right-4"
          aria-label="Close Sidebar"
          onClick={() => toggleSidebar()}
        >
          ✕
        </button>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Gachapon</li>
        </ul>
      </div>
    </div>
  );
};

export default SlidebarSide;

// โค้ดนี้เป็นการสร้าง Sidebar ที่สามารถเปิดปิดได้โดยไม่ต้องใช้ไลบรารีเพิ่มเติม
// สร้าง SlidebarSide component ที่มีปุ่มเปิด sidebar
// และมี overlay สีเทาๆ เมื่อ sidebar เปิดอยู่
// และเมื่อคลิกที่ overlay จะปิด sidebar
