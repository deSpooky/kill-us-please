import classes from './style.module.css'
import heroImage from '../../assets/hero.png'

export default function Hero() {
    return (
        <article>
            <img src={heroImage} alt="hero" className={classes.hero_image} />
        </article>
    )
}
