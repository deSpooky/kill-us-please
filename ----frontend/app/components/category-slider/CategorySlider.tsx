import React, { useRef, useState } from "react";
import "./CategorySlider.css";

const categories: string[] = [
  "Для вас",
  "Подписки",
  "Иллюстрации",
  "Движение",
  "Архитектура",
  "UX/UI",
  "Брендинг",
  "Графический дизайн",
  "Фотография",
];

const CategorySlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string>("Для вас");

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="slider-container">
      <div className="category-list" ref={scrollRef}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-button ${active === cat ? "active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <button className="scroll-button" onClick={scrollRight}>
        ❯
      </button>
    </div>
  );
};

export default CategorySlider;
