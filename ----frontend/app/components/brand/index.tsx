import { Link } from 'react-router'
import logo from '../../assets/logo.svg'
import classes from './styles.module.css'


export default function Brand() {
    return (
        <Link to="/">
            <img src={logo} className={classes['brand__logo']} />
        </Link>
    )
}
