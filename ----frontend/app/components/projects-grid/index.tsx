import { Link } from 'react-router';
import clsx from 'clsx'
import classes from './styles.module.css'
import type { CaseRecord } from "../../types";
import dummyProject from '../../assets/dummy-project.png'

export default function ProjectsGrid({ projects }: { projects: CaseRecord[] }) {
    return (
        <main className={classes.projects}>
            {projects.map(({ id, title, likes, views }) => (
                <Link key={`project_${id}`} to={`/cases/${id}`} className={classes.project_card}>
                    <img src={dummyProject} alt="project preview" className={classes.project_image} />
                    <h3 className={classes.project_title}>{title}</h3>
                    <div className={classes.project_stats}>
                        <span className={clsx(classes.icon, "like")}></span><span>{likes}</span>
                        <span className={clsx(classes.icon, "view")}></span><span>{views}</span>
                    </div>
                </Link>
            ))}
        </main>
    )
}
