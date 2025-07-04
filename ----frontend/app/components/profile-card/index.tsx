import { Link } from 'react-router'
import type { CreatorRecord } from '../../types'
import classes from './styles.module.css'
import dummyAvatar from '../../assets/dummy-profile.png'

export default function ProfileCard({ id, first_name, last_name, creator_description, email }: CreatorRecord) {
    return (
        <aside className={classes.wrapper}>
            <img src={dummyAvatar} alt="avatar" className={classes.avatar} />
            <h2 className={classes.creator_name}>{`${last_name} ${first_name}`}</h2>

            <div className={classes.section}>
                <h4 className={classes.section__heading}>Описание</h4>
                <p>{creator_description}</p>
            </div>

            <div className={classes.section}>
                <h4 className={classes.section__heading}>Контакты</h4>
                <p>+79117742184<br />{email}</p>
            </div>

            <Link to={`/creators/${id}`} className={classes.resume_button}>Резюме</Link>
        </aside>
    )
}
