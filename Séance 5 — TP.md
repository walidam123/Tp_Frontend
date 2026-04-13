# Réponses - Séance 5-TP : Sécurité JWT, Redux Toolkit & Performance

##  Partie 1 : Sécurité XSS dans TaskFlow

**Q1 : Le script s'exécute-t-il ? Pourquoi ? Que fait React avec les strings dans le JSX ?**
* **Réponse :** Non, le script ne s'exécute pas. React échappe automatiquement toutes les chaînes de caractères (strings) dans le JSX.
**Q2 : Que se passe-t-il cette fois ?**
* **Réponse :** Le script s'exécute et une fenêtre d'alerte s'affiche. L'utilisation de l'attribut `dangerouslySetInnerHTML` force React à interpréter le code HTML brut, désactivant ainsi sa protection native contre les failles XSS.

---

##  Partie 2 : Authentification JWT

**Q3 : Ouvrez Network (F12). Faites un GET /projects. Voyez-vous le header Authorization: Bearer ... ?**
* **Réponse :** Oui, si l'intercepteur Axios est correctement configuré, le jeton (token) simulé doit apparaître dans les headers de la requête sous la clé `Authorization` avec le préfixe `Bearer`.

**Q4 : Pourquoi stocker le token en mémoire (state React) et PAS dans localStorage ?**
* **Réponse :** Le `localStorage` est vulnérable aux attaques XSS car n'importe quel script JavaScript sur la page peut y accéder.

---

##  Partie 3 : Redux Toolkit

**Q5 : Comparez authSlice.ts avec votre ancien authReducer.ts. Qu'est-ce qui a changé ?**
* **Réponse :** La structure est simplifiée : plus besoin de `switch/case` ni de définir manuellement les constantes d'action. Grâce à la bibliothèque **Immer** intégrée à Redux Toolkit, on peut écrire du code de mise à jour "mutable" (ex: `state.user = action.payload`) qui est transformé automatiquement en mise à jour immuable.

---

##  Partie 4 : Performance (React.memo & useCallback)

**Q6 : Combien de composants se re-rendent quand on toggle la sidebar ? Lesquels ne DEVRAIENT PAS ?**
* **Réponse :** Par défaut, tous les composants enfants du Dashboard (Sidebar, MainContent, etc.) se re-rendent. Cependant, `MainContent` ne devrait pas se re-rendre car l'ouverture de la barre latérale ne modifie pas les données des projets affichés.

**Q7 : Pourquoi MainContent ne se re-rend plus ? Que compare React.memo ?**
* **Réponse :** Grâce à `React.memo`, le composant est mémorisé. `React.memo` effectue une comparaison superficielle (*shallow comparison*) des props : si les props n'ont pas changé entre deux cycles, React saute le rendu du composant.

**Q8 : Quelle différence entre useMemo et useCallback ? Quand utiliser chacun ?**
* **Réponse :**  `useMemo` mémorise la **valeur de retour** d'une fonction (utile pour les calculs lourds).
    * `useCallback` mémorise la **référence de la fonction** elle-même (utile pour éviter de recréer une fonction passée en props à un enfant mémorisé avec `React.memo`).

---

##  Partie 6 : React Profiler

**Q10 : Pour chaque action, notez : quels composants se re-rendent ? Combien de temps prend le render ? Y a-t-il des re-renders inutiles après vos optimisations ?**
* **Réponse :** Après optimisation, seuls les composants directement impactés par un changement d'état se re-rendent (ex: le bouton Toggle). Les temps de rendu tombent généralement sous la barre des 1ms. Si `React.memo` est bien utilisé, les composants comme `MainContent` n'apparaissent plus dans les cycles de re-rendu inutiles.