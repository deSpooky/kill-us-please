import { Link, Outlet } from 'react-router'
import { useFetcher } from "react-router";
import clsx from 'clsx'
import classes from './styles.module.css'
import type { PropsWithChildren } from 'react';

export function AuthWrapper({ children }: PropsWithChildren) {
    return (
        <article className={classes.auth_wrapper}>
            <div className={classes.auth}>
                <section className={classes.tabs}>
                    <Link to="/login" className={clsx(classes.link, classes.link_login)}>Войти</Link>
                    <Link to="/signup" className={clsx(classes.link, classes.link_signup)}>Зарегистрироваться</Link>
                    {/* <h3 id="login"><a href="/login">Войти</a></h3>
                    <h3 id="register"><a href="./registration.html"></a>Зарегистрироваться</h3> */}
                </section>
                {children}
            </div>
        </article>
    )
}

export function LoginForm() {
    const fetcher = useFetcher({ key: "login" });
    const errors = fetcher.data?.errors;

    return (
        <fetcher.Form method="post" className={classes.form}>
            <section className={classes.input_group}>
                <input type="email" id="email" name="email" placeholder="Ваш E-mail" required className={classes.input} />
                {errors?.email ? <em>{errors.email}</em> : null}
            </section>

            <section className={classes.input_group}>
                <input type="password" id="password" name="password" placeholder="Пароль" required className={classes.input} />
                <span className={classes.toggle_password}></span>
                {errors?.password ? (
                    <em>{errors.password}</em>
                ) : null}
            </section>

            <section className={classes.checkbox_block}>
                <input type="checkbox" id="checkbox" name="checkbox" required />
                <label className={classes.checkbox_label} htmlFor="checkbox">Согласен с Правилами и Политикой конфиденциальности</label>
            </section>

            <button type="submit" id="button" value="Продолжить" className={classes.button}>Продолжить</button>

            <Link to="/remind-password">Забыли пароль?</Link>
        </fetcher.Form>
    );
}

export function SignupForm() {
    const fetcher = useFetcher({ key: "signup" });
    const errors = fetcher.data?.errors;

    return (
        <fetcher.Form method="post" className={classes.form}>
            <section className={classes.input_group}>
                <input type="email" id="email" name="email" placeholder="Ваш E-mail" required className={classes.input} />
                {errors?.email ? <em>{errors.email}</em> : null}
            </section>

            <section className={classes.input_group}>
                <input type="password" id="password" name="password" placeholder="Пароль" required className={classes.input} />
                <span className={classes.toggle_password}></span>
                {errors?.password ? (
                    <em>{errors.password}</em>
                ) : null}
            </section>

            <section className={classes.input_group}>
                <input type="password" id="password-check" name="confirm_password" placeholder="Подтверждение пароля" required className={classes.input} />
                <span className={classes.toggle_password}></span>
                {errors?.confirm_password ? (
                    <em>{errors.confirm_password}</em>
                ) : null}
            </section>

            <section className={classes.checkbox_block}>
                <input type="checkbox" id="checkbox" name="checkbox" required />
                <label className={classes.checkbox_label} htmlFor="checkbox">Согласен с Правилами и Политикой конфиденциальности</label>
            </section>

            <button type="submit" id="button" value="Продолжить" className={classes.button}>Продолжить</button>
        </fetcher.Form>
    );
}
