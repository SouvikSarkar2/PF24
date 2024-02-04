"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../css/notfound.css";
import Link from "next/link";

const NotFoundPage = () => {
  useGSAP(() => {
    gsap.from(".navbar > div", {
      opacity: 0,
      y: 60,
      ease: "expo.inOut",
      delay: 2.4,
    });

    gsap.from(".site-logo", {
      opacity: 0,
      y: 40,
      ease: "expo.inOut",
      delay: 2.4,
    });

    gsap.from(".header > span", {
      top: "-100vh",
      ease: "bounce.out",
      delay: 1,
      stagger: 0.2,
    });

    gsap.to(".footer span", {
      y: -40,
      ease: "expo.inOut",
      delay: 2.4,
    });
  }, []);

  return (
    <div className="container absolute bg-[#E4E4DF]">
      <div className="header-container">
        <div className="header font-canopee">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
      </div>

      <div className="footer font-mono text-xl">
        <span>
          Seems you are lost go
          <Link href="/" className="font-bold">
            {" "}
            Home
          </Link>
        </span>
        <div className="footer-wrapper"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
