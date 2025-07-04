import React from "react";
import CaseCard from "../case-card";
import type { CaseRecord } from "../../types";
import CategorySlider from "../category-slider/CategorySlider"; // путь проверь сам
import classes from "./styles.module.css";

type CasesGridProps = {
    cases: CaseRecord[];
};

export default function CasesGrid({ cases }: CasesGridProps) {
    return (
        <div>
            <CategorySlider />
            <main className={classes.grid}>
                {cases.map((caseRecord) => (
                    <CaseCard key={caseRecord.id} {...caseRecord} />
                ))}
            </main>
        </div>
    );
}