"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    const text = new SplitType(textRef.current);

    const tl = gsap.timeline();
    tl.to(textRef.current, { opacity: 1, delay: 7 });

    tl.from(".char", { translateY: 215, stagger: 0.05 }).to(".char", {
      y: 0,
      stagger: 0.05,
      delay: 0.2,
      duration: 0.3,
    });
  }, []);

  return (
    <header className="h-screen w-screen flex justify-center items-center bg-[#E4E4DF] text-[#393632]">
      <div className="w-[50%] text-[80px] flex flex-col justify-center font-bold font-cerlions">
        <h1
          id="my-text"
          ref={textRef}
          className="text-7xl uppercase overflow-hidden whitespace-nowrap opacity-0"
        >
          Hi I&apos;M
          <br />
          <span className="char">SOUVIK SARKAR</span>
        </h1>
      </div>
    </header>
  );
};

export default Hero;
