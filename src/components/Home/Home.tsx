import { useEffect, useRef } from "react";
import "./Home.css";

import chance from "../../assets/carousel/Chance.webp";
import twinkle from "../../assets/carousel/Twinkle.webp";
// import Stella from "../../assets/carousel/Stella.webp";
import wilson from "../../assets/carousel/Wilson.webp";
import Casey from "../../assets/carousel/Casey.webp"

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
    src: Casey,
    alt: "Pet care with Casey",
  },
  // {
  //   src: Stella,
  //   alt: "Pet care with Stella",
  // },
  {
    src: wilson,
    alt: "Pet care with Wilson",
  },
];

const Home = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const carouselImages = [...images, ...images];

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    let animationFrameId: number;
    let previousTime = 0;

    const pixelsPerSecond = 50;

    const animate = (currentTime: number) => {
      if (previousTime === 0) {
        previousTime = currentTime;
      }

      const elapsedSeconds = (currentTime - previousTime) / 1000;
      previousTime = currentTime;

      carousel.scrollLeft += pixelsPerSecond * elapsedSeconds;

      const halfwayPoint = carousel.scrollWidth / 2;

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
    <section id="home" className="home">
      <div className="container home-grid">
        <div className="home-content">
          <p className="eyebrow">Local Pet Care You Can Count On</p>

          <h1>Reliable care for your pets when you can’t be there.</h1>

          <p className="home-text">
            Dog walking, drop-in visits, in-home pet sitting, pet boarding, and
            pet transportation throughout Glyndon, Reisterstown, Owings Mills,
            and surrounding areas.
          </p>

          <div className="home-buttons">
            <a href="#contact" className="button button-primary">
              Request a Visit
            </a>

            <a href="#services" className="button button-secondary">
              View Services
            </a>
          </div>
        </div>

        <div className="home-carousel-wrapper">
          <div
            className="home-carousel"
            ref={carouselRef}
            aria-label="Photos of pets receiving care"
          >
            {carouselImages.map((image, index) => (
              <div
                className="home-carousel-slide"
                key={`${image.src}-${index}`}
                aria-hidden={index >= images.length}
              >
                <img
                  src={image.src}
                  alt={index < images.length ? image.alt : ""}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;