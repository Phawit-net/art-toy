import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const HoverDetection = ({
  targets,
  onHoverChange,
}: {
  targets: THREE.Object3D<THREE.Object3DEventMap>[];
  onHoverChange: (name: string | null) => void;
}) => {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handlePointerMove = (e: { clientX: number; clientY: number }) => {
    const bounds = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.current.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
  };
  useEffect(() => {
    const handle = () => {
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(targets, true);
      if (intersects.length > 0) {
        const name = intersects[0].object.name;
        onHoverChange(name);
      } else {
        onHoverChange(null);
      }
    };
    gl.domElement.addEventListener("pointermove", handlePointerMove);
    const loop = () => {
      handle();
      requestAnimationFrame(loop);
    };
    loop();
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
    };
  }, [camera, gl, targets]);

  return null;
};
