import { Link } from "react-router"
import clsx from 'clsx'
import type { CaseRecord } from "app/types"
import classes from './styles.module.css'

export default function CaseCard(recordData: CaseRecord) {
    const { id, title } = recordData
    return (
        <Link to={`/cases/${id}`}>
            <div className={classes.card}>
                <div className={classes.preview}></div>
                <div className={classes["card-content"]}>
                    <div className={classes.author}>
                        <div className={classes.avatar}></div>
                        <div className={classes.info}>
                            <div className={classes.info__name}>Анна Полторыхина</div>
                            <div className={classes.info__role}>2D иллюстрации</div>
                        </div>
                    </div>
                    <div className={classes.card__footer}>
                        <div className={classes["project-name"]}>{title}</div>
                        <div className={classes.stats}>
                            <span className={clsx(classes.icon, classes.like)}></span><span>268</span>
                            <span className={clsx(classes.icon, classes.views)}></span><span>3,3 тыс.</span>
                        </div >
                    </div>
                </div >
            </div >
        </Link >
    )
}
