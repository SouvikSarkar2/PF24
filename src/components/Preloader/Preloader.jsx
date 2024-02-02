"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./preloader.css";

function Preloader() {
  const counter3Ref = useRef(null);
  const counter2Ref = useRef(null);
  const counter1Ref = useRef(null);
  const digitRef = useRef(null);
  const loader1Ref = useRef(null);
  const loader2Ref = useRef(null);

  const loaderRef = useRef(null);
  const loadingScreenRef = useRef(null);

  useGSAP(() => {
    const counter3 = counter3Ref.current;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }

    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector(".num").clientHeight;
      const totalDistance =
        (counter.querySelectorAll(".num").length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }

    animate(counter3, 5);
    animate(counter2Ref.current, 6);
    animate(counter1Ref.current, 2, 3.6);

    gsap.to(digitRef.current, {
      top: "-150px",
      stagger: {
        amount: 0.25,
      },
      delay: 5,
      duration: 1,
      ease: "power4.inOut",
    });

    gsap.from(loader1Ref.current, {
      width: 0,
      duration: 6,
      ease: "power2.inOut",
    });

    gsap.from(loader2Ref.current, {
      width: 0,
      delay: 1.9,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to(loaderRef.current, {
      background: "none",
      delay: 6,
      duration: 0.1,
    });

    gsap.to(loader1Ref.current, {
      rotate: 90,
      y: -50,
      duration: 0.5,
      delay: 6,
    });

    gsap.to(
      loader2Ref.current,
      {
        x: -75,
        y: 75,
        duration: 0.5,
      },
      "<"
    );

    gsap.to(loaderRef.current, {
      scale: 40,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(loaderRef.current, {
      rotate: 45,
      y: 500,
      x: 2000,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(loadingScreenRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 7.5,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <>
      <div className="loading-screen" ref={loadingScreenRef}>
        <div className="loader" ref={loaderRef}>
          <div className="loader-1 bar" ref={loader1Ref}></div>
          <div className="loader-2 bar" ref={loader2Ref}></div>
        </div>
        <div className="counter">
          <div className="counter-1 digit" ref={counter1Ref}>
            <div className="num">0</div>
            <div className="num num1offset1">1</div>
          </div>
          <div className="counter-2 digit" ref={counter2Ref}>
            <div className="num">0</div>
            <div className="num num1offset2">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
          <div className="counter-3 digit" ref={counter3Ref}>
            <div className="num">0</div>
            <div className="num">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;
