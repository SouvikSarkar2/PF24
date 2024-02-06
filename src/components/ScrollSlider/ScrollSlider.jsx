"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./scrollslider.css";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ScrollSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentTopValue = useRef(0);
  const lastScrollTimestamp = useRef(0);
  const router = useRouter();

  const elements = [
    { selector: ".prefix", delay: 0 },
    { selector: ".names", delay: 0.15 },
    { selector: ".years", delay: 0.3 },
  ];

  useGSAP(() => {
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide, idx) => {
      if (idx !== 0) {
        const img = slide.querySelector("img");
        gsap.set(img, { scale: 2, top: "4em" });
      }
    });
  }, []);

  const showSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const slide = document.querySelectorAll(".slide")[index];
    const img = slide.querySelector("img");

    currentTopValue.current -= 30;

    elements.forEach((elem) => {
      gsap.to(document.querySelector(elem.selector), {
        y: `${currentTopValue.current}px`,
        duration: 2,
        ease: "power4.inOut",
        delay: elem.delay,
      });
    });

    gsap.to(img, {
      scale: 1,
      top: "0%",
      duration: 2,
      ease: "power3.inOut",
    });

    gsap.to(
      slide,
      {
        clipPath: "polygon(0 0%,100% 0%,100% 100%,0 100%)",
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => {
          setIsAnimating(false);
        },
      },
      "<"
    );
  };

  const hideSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const slide = document.querySelectorAll(".slide")[index];
    const img = slide.querySelector("img");

    currentTopValue.current += 30;
    elements.forEach((elem) => {
      gsap.to(document.querySelector(elem.selector), {
        y: `${currentTopValue.current}px`,
        duration: 2,
        ease: "power4.inOut",
        delay: elem.delay,
      });
    });

    gsap.to(slide, {
      clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
      duration: 2,
      ease: "power4.inOut",
    });

    gsap.to(img, {
      scale: 2,
      top: "4em",
      duration: 2,
      ease: "power3.inOut",
    });

    gsap.to(
      slide,
      {
        clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => {
          setIsAnimating(false);
        },
      },
      "<"
    );
  };

  const handleWheel = (e) => {
    e.preventDefault();

    if (isAnimating) return;

    const currentTimestamp = new Date().getTime();
    const delta = e.deltaY;

    if (currentTimestamp - lastScrollTimestamp.current > 50) {
      if (delta > 0 && currentSlideIndex < 5) {
        showSlide(currentSlideIndex + 1);
        setCurrentSlideIndex((prevIndex) => prevIndex + 1);
      } else if (delta < 0 && currentSlideIndex > 0) {
        hideSlide(currentSlideIndex);
        setCurrentSlideIndex((prevIndex) => prevIndex - 1);
      }
      lastScrollTimestamp.current = currentTimestamp;
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSlideIndex, isAnimating]);

  return (
    <>
      <div className="absolute  z-[53] top-10 left-10 text-3xl">
        <ArrowBigLeft
          onClick={() => router.push("/work")}
          className="text-white w-10 h-10 cursor-pointer"
        />
      </div>
      <div className="absolute left-0 top-0">
        <div className="slider-content">
          <div className="slide-number">
            <div className="prefix">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
            </div>
            <div className="postfix">
              <span>/</span> 6
            </div>
          </div>

          <div className="slide-name">
            <div className="names">
              <div>Landing Page</div>
              <div>Home Page</div>
              <div>All Quesitons</div>
              <div>Quiz page</div>
              <div>Leaderboard</div>
              <div>user Page</div>
            </div>
          </div>

          <div className="slide-year">
            <div className="years">
              <div>Scroll Down</div>
              <div>Scroll</div>
              <div>Scroll</div>
              <div>Scroll</div>
              <div>Scroll</div>
              <div>Scroll Up</div>
            </div>
          </div>
        </div>

        <div className="slider">
          <div className="slide z-[51]" id="slide-1">
            <Image src="/ss1.webp" alt="" fill />
          </div>
          <div className="slide z-[51]" id="slide-2">
            <Image src="/ss2.webp" alt="" fill />
          </div>
          <div className="slide z-[51]" id="slide-3">
            <Image src="/ss3.webp" alt="" fill />
          </div>
          <div className="slide z-[51]" id="slide-4">
            <Image src="/ss4.webp" alt="" fill />
          </div>
          <div className="slide z-[51]" id="slide-5">
            <Image src="/ss5.webp" alt="" fill />
          </div>
          <div className="slide z-[51]" id="slide-6">
            <Image src="/ss6.webp" alt="" fill />
          </div>
          <div style={{ height: "400vh" }}></div>
        </div>
      </div>
    </>
  );
};

export default ScrollSlider;
