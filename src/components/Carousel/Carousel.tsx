import { useEffect, useRef } from "react";
import "./Carousel.css";

import chance from "../../assets/carousel/Chance.webp";
import twinkle from "../../assets/carousel/Twinkle.webp"
import Stella from "../../assets/carousel/Stella.webp";
import wilson from "../../assets/carousel/Wilson.webp";

type CarouselImage = {
  src: string;
  alt: string;
};

const images: CarouselImage[] = [
  {
    src: chance,
    alt: "Pet care with Chance",
  },
  {
    src: twinkle,
    alt: "Pet care with Twinkle",
  },
  {
    src: Stella,
    alt: "Pet care with two dogs",
  },
  {
    src: wilson,
    alt: "Pet care with Wilson",
  },
];

function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Duplicate the images so the carousel can loop forever.
  const carouselImages = [...images, ...images];

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const scrollSpeed = 100;

    let animationFrameId: number;

    const animate = () => {
      carousel.scrollLeft += scrollSpeed;

      // Because the images are duplicated,
      // half of the total scroll width is one full image set.
      const halfwayPoint = carousel.scrollWidth / 2;

      // Reset to the same position in the first set.
      // The user should not see the reset happen.
      if (carousel.scrollLeft >= halfwayPoint) {
        carousel.scrollLeft -= halfwayPoint;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {carouselImages.map((image, index) => (
          <article
            className="carousel-slide"
            key={`${image.src}-${index}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              draggable={false}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

export default Carousel;