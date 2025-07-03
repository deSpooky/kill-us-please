import styles from './styles.module.css'
import type { CaseRecord } from 'app/types'


export default function CaseCard(props: CaseRecord) {
    const { title, id } = props
    return (
        <section className={styles["card-wrapper"]}>
            <div className="card">
            <div className="preview"></div>
            <div className="card-footer">
                <div className="author">
                <div className="avatar"></div>
                <div className="info">
                    <div className="name">Анна Полторыхина</div>
                    <div className="role">2D иллюстрации</div>
                </div>
                </div>
                <div className="project-name">name of project</div>
                <div className="stats">
                <span className="icon like"></span><span>268</span>
                <span className="icon views"></span><span>3,3 тыс.</span>
                </div>
            </div>
            </div>
        </section>
    )
}