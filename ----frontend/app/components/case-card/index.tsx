import { Link } from "react-router"
import clsx from 'clsx'
import type { CaseRecord } from "app/types"
import classes from './styles.module.css'

export default function CaseCard(recordData: CaseRecord) {
    const { id, title, likes, views, creator } = recordData
    const { id: creator_id, first_name, last_name, creator_description } = creator || { first_name: 'Анна', last_name: 'Ивановна', creator_description: 'Описание создателя', id: null }
    return (
        <div className={classes.card}>
            <Link to={`/cases/${id}`}>
                <div className={classes.preview}></div>
            </Link>
            <div className={classes["card-content"]}>
                <Link to={`/creators/${creator_id}`}>
                    <div className={classes.author}>
                        <div className={classes.avatar}></div>
                        <div className={classes.info}>
                            <div className={classes.info__name}>{first_name} {last_name}</div>
                            <div className={classes.info__role}>{creator_description}</div>
                        </div>
                    </div>
                </Link>
                <div className={classes.card__footer}>
                    <Link to={`/cases/${id}`}>
                        <div className={classes["project-name"]}>{title}</div>
                    </Link>
                    <div className={classes.stats}>
                        <span className={clsx(classes.icon, classes.like)}></span><span>{likes}</span>
                        <span className={clsx(classes.icon, classes.views)}></span><span>{views}</span>
                    </div >
                </div>
            </div >
        </div >
    )
}
