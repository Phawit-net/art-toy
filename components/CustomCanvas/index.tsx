"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, useGLTF } from "@react-three/drei";
import { AxesHelper } from "three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HoverDetection } from "../HoverDetection";

function Axes() {
  const { scene } = useThree();
  const helperRef = useRef(null);

  useEffect(() => {
    const helper = new AxesHelper(2); // ความยาวเส้น 2 หน่วย
    scene.add(helper);
    return () => {
      if (helperRef.current) {
        scene.remove(helperRef.current);
      }
    };
  }, []);

  return null;
}

function LightWithHelper() {
  const { scene } = useThree();
  const lightRef = useRef(null);

  useEffect(() => {
    if (lightRef.current) {
      const helper = new THREE.DirectionalLightHelper(lightRef.current, 1);
      scene.add(helper);
      return () => {
        if (lightRef.current) {
          scene.remove(helper);
        }
      };
    }
  }, []);

  return (
    <directionalLight
      ref={lightRef}
      position={[-6.13302, 7.09576, -9.59759]}
      intensity={0.5}
    />
  );
}

const CustomCanvas = ({
  onHoverPart,
  visibleMap = {
    body: 0,
    shirt: 0,
    pants: 0,
    cap: 0,
    hoodie: 0,
    shoe: 0,
  },
}: {
  onHoverPart: React.Dispatch<
    React.SetStateAction<
      "body" | "shirt" | "pants" | "cap" | "hoodie" | "shoe" | null
    >
  >;
  visibleMap?: {
    body: number;
    shirt: number;
    pants: number;
    cap: number;
    hoodie: number;
    shoe: number;
  };
}) => {
  const { nodes, materials, scene, animations } = useGLTF("/sprue_part.gltf");
  // console.log(nodes);

  const bodyParts = [nodes.Hit_Body];
  const shirtParts = [nodes.Hit_Shirt];
  const pantsParts = [nodes.Hit_Pants];
  const hoodieParts = [nodes.Hit_Hoodie];
  const shoesParts = [nodes.Hit_Shoe];
  const capParts = [nodes.Hit_Cap];
  const allParts = [
    ...bodyParts,
    ...shirtParts,
    ...pantsParts,
    ...hoodieParts,
    ...shoesParts,
    ...capParts,
  ];

  return (
    <Canvas className="w-full h-full">
      <HoverDetection
        targets={[...allParts]}
        onHoverChange={(name) => {
          if (name?.includes("Body")) onHoverPart("body");
          else if (name?.includes("Shirt")) onHoverPart("shirt");
          else if (name?.includes("Pants")) onHoverPart("pants");
          else if (name?.includes("Hoodie")) onHoverPart("hoodie");
          else if (name?.includes("Shoe")) onHoverPart("shoe");
          else if (name?.includes("Cap")) onHoverPart("cap");
          else onHoverPart(null);
        }}
      />
      <OrthographicCamera
        makeDefault
        position={[0, 0, 10]} // กล้องมองจากหน้าเข้าไป
        zoom={90} // ยิ่ง zoom มาก ยิ่งเข้าใกล้
      />
      <Axes />
      {/* <LightWithHelper /> */}
      <directionalLight
        position={[-6.13302, 7.09576, -9.59759]}
        intensity={0.5}
      />
      <directionalLight position={[6.64021, 16.9986, 4.94522]} intensity={3} />
      <directionalLight position={[7.53397, 7.11137, 17.5447]} intensity={1} />

      <group>
        <primitive object={nodes.Black_eye} />
        <primitive object={nodes.Eyelash} />
        <primitive object={nodes.White_eye} />
        <primitive object={nodes.Sprue} />
        <primitive
          object={nodes.Hit_Body}
          onUpdate={(self: {
            traverse: (arg0: (child: any) => void) => void;
          }) => {
            self.traverse((child) => {
              if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
                child.material.depthWrite = false; // optional กันซ้อน
              }
            });
          }}
        />
        <primitive
          object={nodes.Hit_Shirt}
          onUpdate={(self: {
            traverse: (arg0: (child: any) => void) => void;
          }) => {
            self.traverse((child) => {
              if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
                child.material.depthWrite = false; // optional กันซ้อน
              }
            });
          }}
        />
        <primitive
          object={nodes.Hit_Pants}
          onUpdate={(self: {
            traverse: (arg0: (child: any) => void) => void;
          }) => {
            self.traverse((child) => {
              if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
                child.material.depthWrite = false; // optional กันซ้อน
              }
            });
          }}
        />
        <primitive
          object={nodes.Hit_Hoodie}
          onUpdate={(self: {
            traverse: (arg0: (child: any) => void) => void;
          }) => {
            self.traverse((child) => {
              if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
                child.material.depthWrite = false; // optional กันซ้อน
              }
            });
          }}
        />
        <primitive
          object={nodes.Hit_Shoe}
          onUpdate={(self: {
            traverse: (arg0: (child: any) => void) => void;
          }) => {
            self.traverse((child) => {
              if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
                child.material.depthWrite = false; // optional กันซ้อน
              }
            });
          }}
        />
        <primitive
          object={nodes.Hit_Cap}
          onUpdate={(self: {
            traverse: (arg0: (child: any) => void) => void;
          }) => {
            self.traverse((child) => {
              if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
                child.material.depthWrite = false; // optional กันซ้อน
              }
            });
          }}
        />
        {/* BODY */}
        {visibleMap.body === 0 && <primitive object={nodes.Body} />}
        {visibleMap.body === 1 && <primitive object={nodes.Body_Dark} />}
        {/* SHIRTS */}
        {visibleMap.shirt === 0 && <primitive object={nodes.Shirt} />}
        {visibleMap.shirt === 1 && <primitive object={nodes.Shirt_White} />}
        {/* PANTS */}
        {visibleMap.pants === 0 && <primitive object={nodes.Pants} />}
        {visibleMap.pants === 1 && <primitive object={nodes.Pants_Black} />}
        {visibleMap.pants === 2 && <primitive object={nodes.Pants_Jeans} />}
        {/* HOODIE */}
        {visibleMap.hoodie === 0 && <primitive object={nodes.Hoodie} />}
        {visibleMap.hoodie === 1 && <primitive object={nodes.Hoodie_Red} />}
        {visibleMap.hoodie === 2 && <primitive object={nodes.Hoodie_Blue} />}
        {/* SHOES */}
        {visibleMap.shoe === 0 && <primitive object={nodes.Shoe} />}
        {visibleMap.shoe === 1 && <primitive object={nodes.Shoe_Red} />}
        {visibleMap.shoe === 2 && <primitive object={nodes.Shoe_Blue} />}
        {/* CAPS */}
        {visibleMap.cap === 0 && <primitive object={nodes.Cap} />}
        {visibleMap.cap === 1 && <primitive object={nodes.Cap_White} />}
      </group>

      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default CustomCanvas;
