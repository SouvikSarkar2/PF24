"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import "./hero.css";
import Image from "next/image";

const Hero = () => {
  const textRef = useRef(null);
  const descRef = useRef(null);

  useGSAP(() => {
    const text = new SplitType(textRef.current);
    const description = new SplitType(descRef.current);

    const tl = gsap.timeline({ repeat: 0 });
    const t2 = gsap.timeline({ repeat: 0 });
    tl.to(textRef.current, { opacity: 1 });
    t2.to(descRef.current, { opacity: 1 });

    tl.from(".char", { translateY: 215, stagger: 0.05, delay: 4 }).to(".char", {
      y: 0,
      stagger: 0.05,
      delay: 0.2,
      duration: 0.3,
    });

    t2.from(".desc", {
      translateY: 115,
      stagger: 0.05,
      opacity: 0,
    }).to(
      ".desc",
      {
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.3,
      },
      "<"
    );

    gsap.from(".img", {
      opacity: 0,
      delay: 9,
    });
    gsap.to(".img", {
      opacity: 1,
      duration: 10,
      delay: 9,
    });
  }, []);

  return (
    <header className="h-screen w-screen flex sm:flex-row flex-col justify-center items-center bg-[#E4E4DF] text-[#393632]">
      <div className="w-[100%] sm:w-[50%] text-[80px] flex flex-col justify-center font-bold font-cerlions">
        <h1
          id="my-text"
          ref={textRef}
          className="p-5 text-5xl sm:text-7xl font-bold uppercase overflow-hidden whitespace-nowrap opacity-0 z-10"
        >
          Hi I&apos;M
          <br />
          <span className="char">SOUVIK SARKAR</span>
        </h1>
      </div>
      <p
        className="p-5 w-[100%] sm:w-auto text-2xl sm:text-3xl font-[Oswald] desc overflow-hidden z-10 "
        ref={descRef}
      >
        Fullstack Web Developer and Designer
      </p>
    </header>
  );
};

export default Hero;
