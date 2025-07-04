import { Form } from "react-router"
import Brand from "../brand"
import NavLink from "../nav-link"
import HeaderProfile from "../header-profile"

import classes from './styles.module.css'

const links = [
    {
        title: 'Проекты',
        to: '/cases',
        enabled: true
    },
    {
        title: 'Авторы',
        to: '/creators',
        enabled: true
    },
    {
        title: 'О площадке',
        to: '/',
        enabled: false
    },
    {
        title: 'FAQ',
        to: '/',
        enabled: false
    }
]

export default function Header() {
    return (
        <header className={classes.header}>
            <Brand />
            <nav className={classes.header__nav}>
                <Form id="search-form" role="search">
                    <input
                        aria-label="Search cases"
                        id="q"
                        name="q"
                        placeholder="Поиск"
                        type="search"
                    />
                    <div
                        aria-hidden
                        hidden={true}
                        id="search-spinner"
                    />
                </Form>
                {links.map(link => <NavLink title={link.title} to={link.to} key={link.title} disabled={!link.enabled} />)}
            </nav>
            <HeaderProfile nickname="Dummy" />
        </header>
    )
}
