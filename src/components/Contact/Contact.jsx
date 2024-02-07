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

  const handleForm = (e) => {
    e.preventDefault();
    console.log(e.target);
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
            <h1 className=" font-dahlia">Contact</h1>
          </div>
          <div className="cta">
            <button ref={toggleButtonRef} onClick={handleApplyNow}>
              Click
            </button>
          </div>
        </div>
        <div className="tagline"></div>
        <div className="links">
          <button>Instagram</button>
          <button>Twitter</button>
        </div>
      </section>

      <div className="overlays" ref={overlayRef}>
        <div className="col">
          <div className="logo">
            <a href="#">Contact</a>
          </div>
          <div className="form">
            <form onSubmit={handleForm}>
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
              <label htmlFor="fname">Project*</label>
              <input type="text" id="website" name="website" placeholder="" />
              <br />
              <br />

              <button type="sumbit">Send Application</button>
            </form>
          </div>
        </div>
        <div className="col">
          <div className="copy">
            <p>[About me]</p>
            {/* Close button */}
            <p id="back" onClick={handleClose}>
              [back]
            </p>
          </div>
          <div className="about">
            <p>
              "Hello everyone, I'm Souvik Sarkar, a software developer and
              designer. I'm passionate about creating intuitive solutions
              through a blend of development and design principles. With a
              collaborative mindset, I thrive on tackling diverse projects and
              making a positive impact through technology. Thank you for your
              time."
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
