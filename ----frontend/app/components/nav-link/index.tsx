import { Link } from "react-router"
import clsx from "clsx"
import classes from './styles.module.css'

type NavLinkProps = {
    title: string;
    to: string;
    disabled: boolean | undefined;
}

export default function NavLink({ title, to, disabled }: NavLinkProps) {
    return <Link to={to} className={clsx(classes.nav_link, { [classes["nav_link--disabled"]]: Boolean(disabled) })}>{title}</Link>
}
