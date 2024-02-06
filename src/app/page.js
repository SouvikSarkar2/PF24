"use client";

import Hero from "@/components/Hero/Hero";
import Preloader from "@/components/Preloader/Preloader";
import { useRef } from "react";

const Page = () => {
  const stickyElement = useRef(null);
  return (
    <>
      <Preloader />

      <Hero />
    </>
  );
};

export default Page;
