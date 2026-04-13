// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface Project {
    id: string;
    name: string;
    color: string;
}

interface SidebarProps {
    projects: Project[];
    isOpen: boolean;
    onRename: (project: Project) => void;
    onDelete: (id: string) => void;
}

export default function Sidebar({ projects, isOpen, onRename, onDelete }: SidebarProps) {
    console.log('Sidebar re-render');
    if (!isOpen) return null;

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <h3 className={styles.title}>Mes Projets</h3>
                <ul className={styles.list}>
                    {projects.map(project => (
                        <li key={project.id} className={styles.listItem}>
                            <NavLink
                                to={`/projects/${project.id}`}
                                className={({ isActive }) => 
                                    `${styles.item} ${isActive ? styles.active : ''}`
                                }
                            >
                                <span 
                                    className={styles.dot} 
                                    style={{ backgroundColor: project.color }} 
                                />
                                {project.name}
                            </NavLink>
                            <div className={styles.actions}>
                                <button 
                                    onClick={() => onRename(project)}
                                    className={styles.renameBtn}
                                    title="Renommer"
                                >
                                    ✏️
                                </button>
                                <button 
                                    onClick={() => onDelete(project.id)}
                                    className={styles.deleteBtn}
                                    title="Supprimer"
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}