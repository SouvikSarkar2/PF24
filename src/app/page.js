"use client";

import Hero from "@/components/Hero/Hero";
import Preloader from "@/components/Preloader/Preloader";
import { useRef } from "react";
import Header from "../components/header";
import StickyCursor from "../components/stickyCursor";

const Page = () => {
  const stickyElement = useRef(null);
  return (
    <>
      <Preloader />
      {/*  <Header ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} /> */}
      <Hero />
    </>
  );
};

export default Page;
