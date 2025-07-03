import classes from './styles.module.css'
import dummyAvatar from '../../assets/dummy-avatar.png'

type HeaderProfileProps = {
    nickname: string;
}

export default function HeaderProfile({ nickname }: HeaderProfileProps) {
    return (
        <div className={classes.header_profile}>
            <img src={dummyAvatar} alt="user" className={classes.header_profile__image} />
            <span className={classes.header_profile__nickname}>{nickname}</span>
        </div>
    )
}
