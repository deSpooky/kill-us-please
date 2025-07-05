import { useState } from "react";
import CaseCard from "../case-card";
import type { CaseRecord } from "../../types";
import CategorySlider from "../category-slider/CategorySlider";
import classes from "./styles.module.css";

type CasesGridProps = {
  cases: CaseRecord[];
};

const categories = [
  "Все",
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

export default function CasesGrid({ cases }: CasesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  const filteredCases = selectedCategory === "Все"
    ? cases
    : cases.filter((c) => c.tag === selectedCategory);

  return (
    <div>
      <CategorySlider
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <main className={classes.grid}>
        {filteredCases.map((caseRecord, ix) => (
          <CaseCard key={caseRecord.id} {...caseRecord} ix={ix} />
        ))}
      </main>
    </div>
  );
}
