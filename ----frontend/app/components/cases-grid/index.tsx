import CaseCard from "../case-card";
import type { CaseRecord } from "../../types";
import classes from './styles.module.css'

type CasesGridProps = {
    cases: CaseRecord[]
}

export default function CasesGrid({ cases }: CasesGridProps) {
    return (
        <main className={classes.grid}>
            {cases.map((caseRecord) => (
                <CaseCard key={caseRecord.id} {...caseRecord} />
            ))}
        </main>
    )
}
