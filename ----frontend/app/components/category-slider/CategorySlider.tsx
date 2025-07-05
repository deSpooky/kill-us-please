import React from "react";
import "./CategorySlider.css";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

const CategorySlider: React.FC<Props> = ({ categories, selected, onSelect }) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="slider-container">
      <div className="category-list" ref={scrollRef}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-button ${selected === cat ? "active" : ""}`}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <button className="scroll-button" onClick={scrollRight}>❯</button>
    </div>
  );
};

export default CategorySlider;
