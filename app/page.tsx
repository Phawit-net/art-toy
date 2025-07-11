import Image from "next/image";
import ButtonPrimary from "@/components/ButtonPrimary";
import SlidebarSide from "@/components/SlidebarSide";
import ImageModal from "@/components/ImageModal";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center text-center text-[#4A5B54] m-[20px] gap-2">
        <h2 className="text-4xl font-medium text-shadow">Create Your</h2>
        <h1 className="text-5xl font-medium">
          Own <span className="text-[#fb936a]">Art Toy</span>
        </h1>
        <p className="text-[20px] py-[10px]">Customize Post Collect</p>
        <ButtonPrimary>Start Customizing</ButtonPrimary>
        <ImageModal />
      </main>
      <SlidebarSide />
    </>
  );
}
