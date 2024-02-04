"use client";

import React, { useState, useRef, useEffect } from "react";
import anime from "animejs";
import "./slidercomponent.css";
import Image from "next/image";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const SliderComponent = () => {
  const sliderRef = useRef(null);
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const itemsRef = useRef([]);
  const [current, setCurrent] = useState(0);
  const isPlayingRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const slider = sliderRef.current;
    const nextBtn = nextBtnRef.current;
    const prevBtn = prevBtnRef.current;
    const items = itemsRef.current;

    items.forEach((item) => {
      const textWrapper = item.querySelector(".wrap");
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
    });

    function anim(current, next, callback) {
      const currentImgs = current.querySelectorAll(".img");
      const currentText = current.querySelectorAll(".content .letter");
      const nextImgs = next.querySelectorAll(".img");
      const nextText = next.querySelectorAll(".content .letter");

      const t = 300;
      const offset = "-=" + t * 0.4;

      const t1 = anime.timeline({
        easing: "easeInOutQuint",
        duration: t,
        complete: callback,
      });

      t1.add({
        targets: currentText,
        translateY: [0, "-2em"],
        opacity: [1, 0],
        easing: "easeInQuint",
        duration: t,
        delay: (el, i) => 30 * (i + 1),
      })
        .add(
          {
            targets: currentImgs[0],
            translateY: -600,
            translateZ: 0,
            rotate: [0, "-45deg"],
            opacity: [1, 0],
            easing: "easeInCubic",
          },
          offset
        )
        .add(
          {
            targets: current,
            opacity: 0,
            visibility: "hidden",
            duration: 200,
            easing: "easeInCubic",
          },
          offset
        )
        .add(
          {
            targets: next,
            opacity: 1,
            visibility: "visible",
            duration: 200,
          },
          offset
        )
        .add(
          {
            targets: nextImgs[0],
            translateY: [600, 0],
            translateZ: 0,
            rotate: ["45deg", 0],
            opacity: [0, 1],
            easing: "easeOutCubic",
          },
          offset
        )
        .add(
          {
            targets: nextText,
            translateY: ["2em", 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: t * 1.5,
            delay: (el, i) => 30 * (i + 1),
          },
          offset
        );
    }

    function updateSlider(newIndex) {
      const currentItem = items[current];
      const newItem = items[newIndex];

      function callback() {
        currentItem.classList.remove("is-active");
        newItem.classList.add("is-active");
        setCurrent(newIndex);
        isPlayingRef.current = false;
      }

      anim(currentItem, newItem, callback);
    }

    function next() {
      if (isPlayingRef.current) return;
      isPlayingRef.current = true;
      const newIndex = current === items.length - 1 ? 0 : current + 1;
      updateSlider(newIndex);
      console.log("next clicked");
    }

    function prev() {
      if (isPlayingRef.current) return;
      isPlayingRef.current = true;
      const newIndex = current === 0 ? items.length - 1 : current - 1;
      updateSlider(newIndex);
      console.log("prev clicked");
    }

    nextBtn.onclick = next;
    prevBtn.onclick = prev;

    return () => {
      // Cleanup code if needed
    };
  }, [current]);

  return (
    <>
      <div className="absolute z-10 top-10 left-10 text-3xl">
        <ArrowBigLeft
          onClick={() => router.push("/work")}
          className="text-[#FEDBC5] w-10 h-10 cursor-pointer"
        />
      </div>
      <div className="slider" ref={sliderRef}>
        <div className="nav">
          <div className="next" ref={nextBtnRef}>
            <svg viewBox="0 0 50 9">
              <path d="m0 4.5 5-3m-5 3 5 3m45-3h-77"></path>
            </svg>
          </div>
          <div className="prev" ref={prevBtnRef}>
            <svg viewBox="0 0 50 9">
              <path d="m0 4.5 5-3m-5 3 5 3m45-3h-77"></path>
            </svg>
          </div>
        </div>
        <div
          className="item is-active"
          ref={(el) => (itemsRef.current[0] = el)}
        >
          <div className="content">
            <div className="wrap">Home</div>
          </div>
          <div className="img-wrapper">
            <div className="img">
              <Image src={"/sc1.png"} fill alt="sc1" />
            </div>
          </div>
        </div>
        <div className="item" ref={(el) => (itemsRef.current[1] = el)}>
          <div className="content">
            <div className="wrap">Dashboard</div>
          </div>
          <div className="img-wrapper">
            <div className="img">
              <Image src={"/sc2.png"} fill alt="sc2" />
            </div>
          </div>
        </div>
        <div className="item" ref={(el) => (itemsRef.current[2] = el)}>
          <div className="content">
            <div className="wrap">Signin</div>
          </div>
          <div className="img-wrapper">
            <div className="img">
              <Image src={"/sc3.png"} fill alt="sc3" />
            </div>
          </div>
        </div>
        <div className="item" ref={(el) => (itemsRef.current[3] = el)}>
          <div className="content">
            <div className="wrap">newTask</div>
          </div>
          <div className="img-wrapper">
            <div className="img">
              <Image src={"/sc4.png"} fill alt="sc4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderComponent;
