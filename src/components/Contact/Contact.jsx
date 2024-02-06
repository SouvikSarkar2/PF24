"use client";

import "./contact.css";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useInView } from "react-intersection-observer";

function Contact() {
  const overlayRef = useRef(null);
  const sendHeaderRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const closeButtonRef = useRef(null); // Ref for the close button
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.5,
  });

  // Function to toggle the overlay
  const toggleOverlay = () => {
    if (!isOpen) {
      // If overlay is not open, play the animation
      gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: "all",
        })
        .to(sendHeaderRef.current.children, {
          top: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.075,
        })
        .play();
    } else {
      // If overlay is open, reverse the animation
      gsap
        .timeline({ paused: true, reversed: true })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          pointerEvents: "none",
        })
        .to(sendHeaderRef.current.children, {
          top: "-100%",
          duration: 1,
          ease: "power4.out",
          stagger: -0.075, // Reverse stagger
        })
        .play();
    }
    setIsOpen(!isOpen); // Toggle the state of isOpen
  };

  // Function to handle close button click
  const handleClose = () => {
    toggleOverlay(); // Close the overlay
  };

  // Function to handle "Apply now" button click
  const handleApplyNow = () => {
    toggleOverlay(); // Toggle the overlay
  };

  useGSAP(() => {
    if (inView) {
      // Execute animation only when the component is in view
      const splitTextIntoSpans = (selector) => {
        const element = document.querySelector(selector);
        if (element) {
          const text = element.innerText;
          const splitText = text
            .split("")
            .map((char) => `<span>${char}</span>`)
            .join("");
          element.innerHTML = splitText;
        }
      };

      splitTextIntoSpans(".send h1");
      splitTextIntoSpans(".header-text h1");

      gsap.to(".header-text h1 span", {
        top: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.075,
        delay: 1.5,
      });

      gsap.from(".cta, .nav, .tagline, .links ", {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 1.5,
      });
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <section className="hero">
        <div className="nav"></div>
        <div className="header">
          <div className="header-text" ref={sendHeaderRef}>
            <h1>Contact</h1>
          </div>
          <div className="cta">
            {/* Apply now button */}
            <button ref={toggleButtonRef} onClick={handleApplyNow}>
              Apply now
            </button>
          </div>
        </div>
        <div className="tagline"></div>
        <div className="links">
          <button>Instagram</button>
          <button>Twitter</button>
        </div>
      </section>
      {/* Overlay */}
      <div className="overlays" ref={overlayRef}>
        <div className="col">
          <div className="logo">
            <a href="#">La nova</a>
          </div>
          <div className="form">
            <form action="">
              <label htmlFor="fname">Name*</label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="first + surname"
              />
              <br />
              <br />
              <label htmlFor="location">Location*</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. africa"
              />
              <br />
              <br />
              <label htmlFor="fname">Website*</label>
              <input type="text" id="website" name="website" placeholder="" />
              <br />
              <br />
              <label htmlFor="jobs">Disciplines</label>
              <div className="jobs">
                <div className="job-items">
                  <div className="item">
                    <input type="checkbox" />
                    <label htmlFor="">Digital Design</label>
                  </div>
                </div>
              </div>
              <button>Send Application</button>
            </form>
          </div>
        </div>
        <div className="col">
          <div className="copy">
            <p>[get featured]</p>
            {/* Close button */}
            <p id="back" onClick={handleClose}>
              [back]
            </p>
          </div>
          <div className="about">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              doloribus possimus ducimus distinctio quo iusto incidunt
              blanditiis consequuntur! Ipsa magnam eveniet deleniti ipsum a
              alias aspernatur expedita sapiente laboriosam rerum!
            </p>
          </div>
          <div className="send">
            <h1>Apply</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;