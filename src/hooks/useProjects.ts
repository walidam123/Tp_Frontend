import { useState, useEffect } from 'react';
import api from '../api/axios';

interface Project {
  id: string;
  name: string;
  color: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false); // Bien défini ici

  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => setError('Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  const addProject = async (name: string, color: string): Promise<boolean> => {
    setSaving(true);
    try {
      const { data } = await api.post('/projects', { name, color });
      setProjects(prev => [...prev, data]);
      return true; // Important pour le "truthiness"
    } catch {
      setError("Erreur lors de l'ajout");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const renameProject = async (project: Project) => {
    const newName = prompt('Nouveau nom :', project.name);
    if (!newName || newName === project.name) return;
    setSaving(true);
    try {
      const { data } = await api.put(`/projects/${project.id}`, { ...project, name: newName });
      setProjects(prev => prev.map(p => p.id === project.id ? data : p));
    } catch {
      setError('Erreur lors du renommage');
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Supprimer ?')) return;
    setSaving(true);
    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch {
      setError('Erreur lors de la suppression');
    } finally {
      setSaving(false);
    }
  };

  // On retourne TOUT ce dont le Dashboard a besoin
  return { 
    projects, 
    loading, 
    error, 
    saving, 
    addProject, 
    renameProject, 
    deleteProject, 
    setError 
  };
}