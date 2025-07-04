import { Link } from "react-router"
import clsx from 'clsx'
import type { CaseRecord, CreatorRecord } from "app/types"
import classes from './styles.module.css'

export default function CaseCard(recordData: CaseRecord) {
    const { id, title, likes, views, creator } = recordData
    const { first_name, last_name, creator_description } = creator || { first_name: 'Анна', last_name: 'Ивановна', creator_description: 'Описание создателя' }
    return (
        <Link to={`/cases/${id}`}>
            {/* <div className={classes.card}></div> */}
            <div className={classes.card}>
                <div className={classes.preview}></div>
                <div className={classes["card-content"]}>
                    <div className={classes.author}>
                        <div className={classes.avatar}></div>
                        <div className={classes.info}>
                            <div className={classes.info__name}>{first_name} {last_name}</div>
                            <div className={classes.info__role}>{creator_description}</div>
                        </div>
                    </div>
                    <div className={classes.card__footer}>
                        <div className={classes["project-name"]}>{title}</div>
                        <div className={classes.stats}>
                            <span className={clsx(classes.icon, classes.like)}></span><span>{likes}</span>
                            <span className={clsx(classes.icon, classes.views)}></span><span>{views}</span>
                        </div >
                    </div>
                </div >
            </div >
        </Link >
    )
}
