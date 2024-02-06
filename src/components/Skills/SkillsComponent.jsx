"use client";

import "./skills.css";
import React, { useState } from "react";

const SkillsComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const imgNames = [
    { id: 1, name: "html", imgSrc: "/skills/1.webp" },
    { id: 2, name: "css", imgSrc: "/skills/2.webp" },
    { id: 3, name: "javascript", imgSrc: "/skills/3.webp" },
    { id: 4, name: "typescript", imgSrc: "/skills/4.webp" },
    { id: 5, name: "react", imgSrc: "/skills/5.webp" },
    { id: 6, name: "react-router", imgSrc: "/skills/6.svg" },
    { id: 7, name: "redux", imgSrc: "/skills/7.svg" },
    { id: 8, name: "react-query", imgSrc: "/skills/8.svg" },
    { id: 9, name: "next", imgSrc: "/skills/9.svg" },
    { id: 10, name: "node", imgSrc: "/skills/10.webp" },
    { id: 11, name: "express", imgSrc: "/skills/11.webp" },
    { id: 12, name: "mongodb", imgSrc: "/skills/12.webp" },
    { id: 13, name: "mysql", imgSrc: "/skills/13.svg" },
    { id: 14, name: "graphql", imgSrc: "/skills/14.webp" },
    { id: 15, name: "supabase", imgSrc: "/skills/15.webp" },
  ];

  return (
    <div className="bg-[#E4E4DF] font-bold font-confillia">
      <div className="absolute top-10 left-[50%] text-7xl">Skills</div>
      <div className="flex w-[100vw] h-[100vh] container">
        <div className="img-names col">
          {imgNames.map((imgName) => (
            <div
              key={imgName.id}
              className="img-name"
              onMouseOver={() => setSelectedImage(imgName.imgSrc)}
            >
              <div className="name z-10">{imgName.name}</div>
              <div className="name-revealer"></div>
            </div>
          ))}
        </div>
        <div className="img-preview col">
          <div className="img-preview-container">
            {selectedImage && <img src={selectedImage} alt="preview" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsComponent;
