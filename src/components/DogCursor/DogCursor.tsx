import { useEffect, useRef } from "react";
import runningDog from "../../assets/running_dog.webp";
import "./DogCursor.css";

export default function DogCursor() {
  const dogRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const dog = dogRef.current;
    if (!dog) return;

    document.documentElement.classList.add("dog-cursor-active");

    function moveDog(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !dog) return;

      dog.style.left = `${event.clientX}px`;
      dog.style.top = `${event.clientY}px`;
      dog.style.opacity = "1";
    }

    function hideDog() {
      if (dog) dog.style.opacity = "0";
    }

    window.addEventListener("pointermove", moveDog);
    window.addEventListener("blur", hideDog);

    return () => {
      document.documentElement.classList.remove("dog-cursor-active");
      window.removeEventListener("pointermove", moveDog);
      window.removeEventListener("blur", hideDog);
    };
  }, []);

  return <img ref={dogRef} src={runningDog} alt="" className="dog-cursor" />;
}