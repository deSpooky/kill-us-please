import styles from './styles.module.css'
import type { CaseRecord } from 'app/types'


export default function CaseCard(props: CaseRecord) {
    const { title, id } = props
    return (
        <section className={styles["card-wrapper"]}>
            <h2>{title}</h2>
        </section>
    )
}