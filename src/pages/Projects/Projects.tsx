import React from "react";
import { useState, useMemo } from "react";
import { getEnv } from "../../utils/sharedFuncs";
import './Projects.css';

interface Project {
    name: string;
    description: string;
    updated_at: string;
    html_url: string;
}

enum SortDir {
    ASC,
    DESC
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const sortAndSetProjects = (projs: Project[], order: SortDir) => {
        if (projs?.length <= 0) return;

        const sorted = projs.sort((a: Project, b: Project): number => {
            const aTime = Date.parse(a.updated_at);
            const bTime = Date.parse(b.updated_at);

            let aGtb = -1, bGta = 1;

            switch (order) {
                case SortDir.ASC:
                    aGtb = 1;
                    bGta = -1;
                    break;
                case SortDir.DESC:
                    aGtb = -1;
                    bGta = 1;
                    break;
            }

            if (aTime > bTime) {
                return aGtb;
            }

            if (aTime < bTime) {
                return bGta;
            }

            return 0;
        });

        setProjects([...sorted]);
    };

    useMemo(() => {
        const headers = new Headers({
            "Authorization": `'Basic ${btoa(`nicklvsa:${getEnv<string>('GITHUB_ACCESS_TOKEN')}`)}`,
        });
        
        fetch('https://api.github.com/users/nicklvsa/repos', {headers: headers})
            .then(data => data.json())
            .then((res: Project[]) => {
    
            sortAndSetProjects(res, SortDir.DESC);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    return (
        <div>
            <div className="control has-icons-left has-text-centered">
                {
                    projects?.length > 0 ? (
                        <div className="select is-medium">
                            <select onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
                                sortAndSetProjects(projects, SortDir[evt?.target?.value as keyof typeof SortDir])
                            }}>
                                {
                                    Object.keys(SortDir).map((dir: string, key: number) => {
                                        if (!Number.isInteger(parseInt(dir))) {
                                            return (
                                                <option value={dir} key={key}>{dir}</option>
                                            )
                                        }

                                        return <></>
                                    })
                                }
                            </select>
                            <span className="icon is-medium is-left">
                                <i className="fas fa-sort"></i>
                            </span>
                        </div>
                    ) : (<></>)
                }
            </div>
            <div className="project-card-container project-grid">
                {
                    projects.length > 0 ? (
                        projects.map((project: Project, key: number) => {
                            return (
                                <div className="card project-grid-item" key={key}>
                                    <div className="card-content">
                                        <p className="title">{project?.name}</p>
                                        <p className="subtitle">{project?.description}</p>
                                    </div>
                                    <footer className="card-footer">
                                        <p className="card-footer-item">
                                            Star it on <a href={project?.html_url}>Github</a>
                                        </p>
                                        <p className="card-footer-item">
                                            Shared it on <a href={project?.html_url}>Twitter</a>
                                        </p>
                                    </footer>
                                </div>
                            )
                        })
                    ) : (
                        <p className="has-text-centered">
                            Projects could not be dynamically loaded (This is normally caused by the Github API rate limiter)! Please checkout my Github profile using
                            <a className="ml-1" href="https://github.com/nicklvsa">this link</a>.
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default Projects;
