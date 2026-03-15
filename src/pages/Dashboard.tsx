import { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import api from '../api/axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css';
import axios from 'axios';

interface Project {
    id: string;
    name: string;
    color: string;
}

interface Column {
    id: string;
    title: string;
    tasks: string[];
}

export default function Dashboard() {

    const { state: authState, dispatch } = useAuth();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [columns, setColumns] = useState<Column[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    
    // États pour la gestion d'erreurs et loading
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // GET — charger les données au montage
    useEffect(() => {
        async function fetchData() {
            try {
                const [projRes, colRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/columns'),
                ]);

                setProjects(projRes.data);
                setColumns(colRes.data);
            } catch (e) {
                console.error(e);
                if (axios.isAxiosError(e)) {
                    setError(`Erreur de chargement: ${e.response?.status || 'réseau'}`);
                } else {
                    setError('Erreur inconnue lors du chargement');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // POST — ajouter un projet avec gestion d'erreurs
    async function addProject(name: string, color: string) {
        setSaving(true);
        setError(null);
        
        try {
            const { data } = await api.post('/projects', { name, color });
            setProjects(prev => [...prev, data]);
            setShowForm(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || `Erreur ${err.response?.status || 'réseau'}`);
            } else {
                setError('Erreur inconnue');
            }
        } finally {
            setSaving(false);
        }
    }

    // PUT — renommer un projet avec gestion d'erreurs
    async function renameProject(project: Project) {
        const newName = prompt('Nouveau nom du projet :', project.name);
        
        if (!newName || newName === project.name) return;
        
        setSaving(true);
        setError(null);
        
        try {
            const { data } = await api.put(`/projects/${project.id}`, {
                ...project,
                name: newName
            });
            
            setProjects(prev => prev.map(p => 
                p.id === project.id ? data : p
            ));
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || `Erreur ${err.response?.status || 'réseau'}`);
            } else {
                setError('Erreur inconnue');
            }
        } finally {
            setSaving(false);
        }
    }

    // DELETE — supprimer un projet avec gestion d'erreurs
    async function deleteProject(id: string) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
        
        setSaving(true);
        setError(null);
        
        try {
            await api.delete(`/projects/${id}`);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || `Erreur ${err.response?.status || 'réseau'}`);
            } else {
                setError('Erreur inconnue');
            }
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <div className={styles.loading}>Chargement...</div>;
    }

    return (
        <div className={styles.layout}>
            <Header
                title="TaskFlow"
                onMenuClick={() => setSidebarOpen(p => !p)}
                userName={authState.user?.name}
                onLogout={() => dispatch({ type: 'LOGOUT' })}
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
                        {/* Affichage de l'erreur si elle existe */}
                        {error && (
                            <div className={styles.error}>
                                {error}
                            </div>
                        )}

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
                                onSubmit={addProject}
                                onCancel={() => {
                                    setShowForm(false);
                                    setError(null);
                                }}
                            />
                        )}
                    </div>

                    {/* CORRECTION: Retirer la prop projects qui n'existe pas */}
                    <MainContent columns={columns} />
                    
                </div>
            </div>
        </div>
    );
}