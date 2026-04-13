import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import api from '../../api/axios';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Extraction du state global Redux
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Déterminer la page de redirection (par défaut /dashboard)
  const from = location.state?.from || '/dashboard';

  // Redirection automatique si déjà connecté
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Déclencher le chargement
    dispatch(loginStart());

    try {
      // Appel API vers json-server (Port 3001 selon tes erreurs précédentes)
      const { data: users } = await api.get(`/users?email=${email}`);

      // Vérification simple de l'utilisateur
      if (users.length === 0 || users[0].password !== password) {
        dispatch(loginFailure('Email ou mot de passe incorrect'));
        return;
      }

      const { password: _, ...userData } = users[0];

      // PARTIE 2 : Simulation du Token JWT (Base64)
      const fakeToken = btoa(
        JSON.stringify({
          userId: userData.id,
          email: userData.email,
          role: 'admin',
          exp: Date.now() + 3600000 // Expire dans 1h
        })
      );

      // PARTIE 3 : Mise à jour du store Redux avec l'utilisateur et son token
      dispatch(loginSuccess({ 
        user: userData, 
        token: fakeToken 
      }));

      // Redirection vers la page demandée ou le dashboard
      navigate(from, { replace: true });

    } catch (err) {
      dispatch(loginFailure('Erreur serveur : impossible de contacter l\'API'));
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>TaskFlow</h1>
        <p className={styles.subtitle}>Connectez-vous pour continuer</p>

        {error && (
          <div className={styles.error}>{error}</div>
        )}

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}