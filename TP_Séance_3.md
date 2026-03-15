# TP Séance 3 - React Router, Axios & CRUD (TaskFlow)

Ce README contient les réponses aux questions posées dans le cadre du TP sur React Router, Axios et les opérations CRUD.

---

### Q1 : Pourquoi `<Navigate />` (composant) et pas `navigate()` (hook) ici ?

**Réponse :**

On utilise le composant `<Navigate />` car on est **dans le rendu JSX** et non dans un gestionnaire d'événement ou un `useEffect`.



---

### Q2 : Quelle différence entre `navigate(from)` et `navigate(from, { replace: true })` ?

**Réponse :**

- **`navigate(from)`** : Ajoute la nouvelle page (`from`) dans l'historique de navigation.
- **`navigate(from, { replace: true })`** : Remplace l'entrée courante dans l'historique par la nouvelle page. 

---

### Q3 : Après un POST, pourquoi fait-on `setProjects(prev => [...prev, data])` plutôt qu'un re-fetch GET ?

**Réponse :**

On utilise une mise à jour optimiste du state pour deux raisons principales :

1.  **Performance et Réactivité :** Cela met à jour l'interface utilisateur **instantanément**, sans attendre un second aller-retour vers le serveur. L'utilisateur voit son nouveau projet apparaître tout de suite.
2.  **Cohérence :** La réponse `data` d'un POST contient généralement l'objet complet tel qu'il a été créé par le serveur (avec son `id` généré).

---

### Q4 : Quel est le bug dans `ProjectDetail.tsx` et comment le corriger ?

**Réponse :**

Il y a deux bugs :

1.  **BUG 1 (useEffect) :** Le tableau de dépendances est vide (`[]`). Si l'utilisateur navigue d'un projet à un autre, l'`id` dans l'URL change, mais l'`useEffect` ne se relance pas, affichant toujours les données du premier projet.
    - **Correction :** Ajouter `id` dans le tableau de dépendances : `[id]`.

2.  **BUG 2 (Affichage) :** `authState.user.name` est utilisé sans vérifier que `authState.user` existe. Au moment du rendu initial, l'utilisateur peut être `null`, ce qui provoque une erreur "Cannot read properties of null".
    - **Correction :** Utiliser l'opérateur de chaînage optionnel : `authState.user?.name` ou `'Inconnu'`.

---

### Q5 : Quelle différence entre `<Link>` et `<NavLink>` ? Pourquoi `NavLink` ici ?

**Réponse :**

- **`<Link>`** : Le composant de base pour la navigation. Il rend un élément `<a>` qui change l'URL sans recharger la page.
- **`<NavLink>`** : Une version spéciale de `<Link>` qui est conçue pour la navigation. Elle accepte une fonction `className` ou `style` qui reçoit un paramètre `isActive`. Cela permet d'appliquer facilement des styles différents au lien actif (celui dont l'URL correspond à la page courante).



---

### Q6 : Ce composant sert pour le POST ET le PUT. Qu'est-ce qui change entre les deux usages ?

**Réponse :**

Ce qui change entre les deux usages, ce sont les **props** passées au composant :

- **Pour un POST (création) :**
    - `initialName` et `initialColor` auront leurs valeurs par défaut (chaîne vide et couleur par défaut). Le formulaire est vide.
    - `submitLabel` sera "Créer".
    - La fonction `onSubmit` appelée à la soumission sera `addProject`.

- **Pour un PUT (édition) :**
    - `initialName` et `initialColor` seront pré-remplies avec les valeurs actuelles du projet à modifier.
    - `submitLabel` sera "Renommer" ou "Modifier".
    - La fonction `onSubmit` appelée à la soumission sera `renameProject` (qui contient la logique pour faire un PUT).

Le composant lui-même reste **générique et réutilisable**.

---

### Q7 : Arrêtez `json-server` et tentez un POST. Le message s'affiche ?

**Réponse :**

 la requête POST échouera car le navigateur ne pourra pas se connecter au `localhost:4000`.

L'erreur sera interceptée par le bloc `catch`. La fonction `axios.isAxiosError(err)` retournera `true`, et le message d'erreur "Erreur réseau" ou similaire (selon le navigateur) sera affiché dans l'interface utilisateur, grâce à la gestion d'erreur implémentée.

---

### Q8 : Avec `fetch`, un 404 ne lance PAS d'erreur. Avec Axios, que se passe-t-il ?

**Réponse :**

Avec Axios, contrairement à `fetch` natif, **une réponse HTTP avec un code d'échec (4xx ou 5xx) est traitée comme une erreur et rejetée** par la promesse.

Cela signifie que le flux d'exécution entre automatiquement dans le bloc `catch`, ce qui permet de centraliser et de gérer plus facilement les erreurs HTTP (comme un 404 "Non trouvé", un 401 "Non autorisé", ou un 500 "Erreur serveur") de la même manière qu'une erreur réseau.