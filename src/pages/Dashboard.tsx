import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import type { RootState } from '../store';

import api from '../api/axios';
import { useProjects } from "../hooks/useProjects";  // Import du hook
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    
    // Utilisation du Custom Hook
    const { projects, loading, error, saving, addProject, renameProject, deleteProject, setError } = useProjects();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [columns, setColumns] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // On garde uniquement le fetch des colonnes ici (ou on pourrait faire un useColumns)
    useEffect(() => {
        api.get('/columns').then(res => setColumns(res.data)).catch(() => {});
    }, []);

    const handleAddProject = async (name: string, color: string) => {
        const success = await addProject(name, color);
        if (success) setShowForm(false);
    };

    if (loading) return <div className={styles.loading}>Chargement...</div>;

    return (
        <div className={styles.layout}>
            <Header
                title="TaskFlow"
                onMenuClick={() => setSidebarOpen(p => !p)}
                userName={user?.name}
                onLogout={() => dispatch(logout())}
            />

            <div className={styles.body}>
                <Sidebar
                    projects={projects}
                    isOpen={sidebarOpen}
                    onRename={renameProject}
                    onDelete={deleteProject}
                />

                <div className={styles.content}>
                    <div className={styles.toolbar}>
                        {error && <div className={styles.error}>{error}</div>}

                        {!showForm ? (
                            <button 
                                className={`${styles.addBtn} ${saving ? styles.disabled : ''}`}
                                onClick={() => setShowForm(true)}
                                disabled={saving}
                            >
                                + Nouveau projet
                            </button>
                        ) : (
                            <ProjectForm
                                submitLabel="Créer"
                                onSubmit={handleAddProject}
                                onCancel={() => { setShowForm(false); setError(null); }}
                            />
                        )}
                    </div>
                    <MainContent columns={columns} />
                </div>
            </div>
        </div>
    );
}