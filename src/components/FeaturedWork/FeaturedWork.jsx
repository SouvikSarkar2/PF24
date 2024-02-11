"use client";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./work.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FeaturedWork = () => {
  const containerRef = useRef(null);
  const router = useRouter();

  useGSAP(() => {
    const items = containerRef.current.querySelectorAll(".item");

    items.forEach((item) => {
      gsap.to(item, {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: "power2.inOut",
        paused: true,
      });

      item.addEventListener("mouseenter", () => shuffleAnimation(item));
    });
  }, []);

  function getRandomCharacter() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function shuffleAnimation(target) {
    if (target.dataset.animating) {
      return;
    }
    target.dataset.animating = true;

    const words = target.querySelectorAll(".word");

    const originalWords = Array.from(words).map((word) => word.textContent);

    let shuffles = 0;
    const maxShuffles = 10;
    const intervalDuration = 500 / maxShuffles;

    let animationInterval = setInterval(() => {
      if (shuffles >= maxShuffles) {
        clearInterval(animationInterval);

        words.forEach((word, index) => {
          word.textContent = originalWords[index];
        });

        delete target.dataset.animating;
      } else {
        words.forEach((word) => {
          const length = word.textContent.length;
          let shuffleText = "";
          for (let i = 0; i < length; i++) {
            shuffleText += getRandomCharacter();
          }
          word.textContent = shuffleText;
        });
        shuffles++;
      }
    }, intervalDuration);
  }

  useEffect(() => {
    gsap.to(containerRef.current, {
      duration: 1,
      opacity: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="main">
      <h1>Featured Work</h1>
      <div ref={containerRef} className="container ">
        {/* Item 1 */}
        <div
          className="item item-1 font-ageya"
          onClick={() => router.push("/work/1")}
        >
          <div className="word w1 ">Hikari</div>
          <div className="img">
            <Image width={125} height={80} src="/sc1.webp" alt="hikari" />
          </div>
          <div className="word w2"> A Todo App</div>
        </div>

        {/* Item 2 */}
        <div
          className="item item-2 font-canopee"
          onClick={() => {
            router.push("/work/2");
          }}
        >
          <div className="word w1">Shiken</div>
          <div className="img">
            <Image width={125} height={80} src="/ss1.webp" alt="shiken" />
          </div>
          <div className="word w2"> A Quiz App</div>
        </div>

        {/* Item 3 */}
        <div
          className="item item-3 font-confillia"
          onClick={() => router.push("/work/3")}
        >
          <div className="word w1">Ibento</div>
          <div className="img">
            <Image
              width={125}
              height={90}
              src="https://media.istockphoto.com/id/1447969085/photo/business-people-using-smartphone-and-pressing-review-popup-on-visual-screen-customer-review.webp?b=1&s=170667a&w=0&k=20&c=WVn1PuI3qtkeZlLwqitV8GeKo8rntmXhg-HmSeYCQWw="
              alt="ibento"
            />
          </div>
          <div className="word w2"> An Event App</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedWork;
