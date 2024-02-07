"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import "./navbar.css";
import Link from "next/link";

const Navbar = () => {
  const toggleBtnRef = useRef(null);
  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);
  const pathRef = useRef(null);
  const spanBeforeRef = useRef(null);

  useGSAP(() => {
    const t1 = gsap.timeline({ paused: true });

    gsap.set(spanBeforeRef.current, { background: "#000" });
    gsap.set(menuRef.current, { visibility: "hidden" });

    const revealMenuItems = () => {
      const start =
        "M -1818 1538 Q -949 2584 677 2562 q 1626 -154 2035 -1051 V -133 H -1801 Z";
      const end =
        "M -1818 1538 Q -949 2584 677 2562 q 1626 -154 2035 -1051 V -133 H -1801 Z";

      const power2 = "power2.inOut";
      const power4 = "power4.inOut";

      t1.to(hamburgerRef.current, 1.25, {
        marginTop: "-5px",
        x: -40,
        y: 40,
        ease: power4,
      });

      t1.to(
        hamburgerRef.current.querySelector("span"),
        1,
        {
          background: "#e2e2dc",
          ease: power2,
        },
        "<"
      );

      t1.to(
        spanBeforeRef.current,
        1,
        {
          background: "#e2e2dc",
          ease: power2,
        },
        "<"
      );

      t1.to(
        ".btn .btn-outline",
        1.25,
        {
          x: -40,
          y: 40,
          width: "140px",
          height: "140px",
          border: "1px solid #e2e2dc",
          ease: power4,
        },
        "<"
      );

      t1.to(
        pathRef.current,
        0.8,
        {
          attr: {
            d: start,
          },
          ease: "Power2.easeIn",
        },
        "<"
      ).to(
        pathRef.current,
        0.8,
        {
          attr: {
            d: end,
          },
          ease: "Power2.easeIn",
        },
        "-=0.5"
      );

      t1.to(
        menuRef.current,
        1,
        {
          visibility: "visible",
        },
        "-=0.5"
      );

      t1.to(
        ".menu-item > a",
        1,
        {
          top: 0,
          ease: "power3.out",
          stagger: {
            amount: 0.5,
          },
        },
        "-=1"
      ).reverse();
    };

    const revealMenu = () => {
      revealMenuItems();

      const closeMenu = () => {
        hamburgerRef.current.classList.remove("active");
        t1.reverse();
      };

      toggleBtnRef.current.addEventListener("click", () => {
        hamburgerRef.current.classList.toggle("active");
        t1.reversed(!t1.reversed());
      });

      // Close menu when anchor tags are clicked
      const menuLinks = menuRef.current.querySelectorAll(".menu-item a");
      menuLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });
    };

    revealMenu();
  }, []);

  return (
    <div className="absolute left-0 top-0 font-[Oswald] z-50">
      <div className="btn" id="toggle-btn" ref={toggleBtnRef}>
        <div className="btn-outline btn-outline-1"></div>
        <div className="btn-outline btn-outline-2"></div>
        <div id="hamburger" ref={hamburgerRef}>
          <span></span>
        </div>
      </div>

      <div className="overlay ">
        <svg viewBox="0 0 1000 1000">
          <path d="M0 2S175 1 500 1s500 1 500 1V0H0Z" ref={pathRef}></path>
        </svg>
      </div>
      <div className="menu" ref={menuRef}>
        <div className="primary-menu">
          <div className="menu-container">
            <div className="wrapper">
              <div className="menu-item main-item mr-[240px]">
                <Link
                  href="/"
                  className=" hover:text-stone-600 transition-colors duration-300 ease-in-out"
                >
                  <span>I</span> Home
                </Link>
                <div className="menu-item-revealer"></div>
              </div>
              <div className="menu-item main-item mr-[240px]">
                <Link
                  href="/skill"
                  className=" hover:text-slate-600 transition-colors duration-300 ease-in-out"
                >
                  <span>II</span>Skill
                </Link>
                <div className="menu-item-revealer"></div>
              </div>
              <div className="menu-item main-item mr-[170px]">
                <Link
                  href="/work"
                  className=" hover:text-[#9D7B5D] transition-colors duration-300 ease-in-out"
                >
                  <span>III</span>Work
                </Link>
                <div className="menu-item-revealer"></div>
              </div>
              <div className="menu-item main-item">
                <Link
                  href="/contact"
                  className=" hover:text-[#393632] transition-colors duration-300 ease-in-out"
                >
                  <span>IV</span>Contact
                </Link>
                <div className="menu-item-revealer"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="secondary-menu">
          <div className="menu-container">
            <div className="wrapper">
              <div className="menu-item">
                <a href="#">Github</a>
                <div className="menu-item-revealer"></div>
              </div>
              <div className="menu-item">
                <a href="#">Leetcode</a>
                <div className="menu-item-revealer"></div>
              </div>
              <div className="menu-item">
                <a href="#">LinkedIn</a>
                <div className="menu-item-revealer"></div>
              </div>
            </div>
            <div className="wrapper">
              <div className="menu-item">
                <a href="#">Resume</a>
                <div className="menu-item-revealer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
