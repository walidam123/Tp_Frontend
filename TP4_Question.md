# Réponses TP Séance 4 : MUI vs Bootstrap & Architecture BDD

## Partie 1 : Header avec Material UI
**Q1 : Combien de lignes de CSS avez-vous écrit pour le Header MUI ?**
* 0 ligne de CSS externe ; tout est fait avec la prop `sx`.

## Partie 3 & 4 : Comparaison MUI vs Bootstrap
**Q2 : Lequel est plus lisible ? Plus court ?**
* **Plus court :** Bootstrap (grâce aux classes utilitaires et variantes comme `bg="success"`).


**Q3 : Quel système préférez-vous (sx vs className) ?**
* Je préfère `className` (Bootstrap) pour la rapidité d'écriture des mises en page standards.

## Partie 5 : Tableau Comparatif
| Critère | Material UI | React-Bootstrap |
| :--- | :--- | :--- |
| **Installation** | `@mui/material`, `@emotion/react`, `@emotion/styled`  | `react-bootstrap`, `bootstrap` |
| **Composants** | `AppBar`, `Toolbar`, `Box`, `Button`  | `Navbar`, `Container`, `Nav`, `Button` [cite: 97] |
| **Lignes CSS** | 0 (tout en JS/sx)  | 0 (classes utilitaires)  |
| **Système style** | `sx={{ }}` (CSS-in-JS)  | `className` (Utility classes)  |
| **Perso. couleurs** | Codes hexa dans le code (ex: `#1B8C3E`)  | Variantes (ex: `bg="success"`)  |
| **Responsive** | Breakpoints dans les objets `sx` | Système de grille (col-md-...)  |
| **Lisibilité** | Verbeux (objets JS) | Clair (classes CSS)  |
| **Documentation** | Très riche et interactive  | Simple et efficace  |
| **Préférence** | Pour des interfaces "App" complexes | Pour des sites web rapides  |

## Partie 6 : Architecture Base de Données
**Schéma actuel :** React (5173) $\xrightarrow{\text{Axios (HTTP)}}$ json-server (4000) $\rightarrow$ db.json.



**Q5 : Pourquoi React ne peut-il PAS se connecter directement à MySQL ?**
* Pour la sécurité (fuite des identifiants côté client) et parce que MySQL nécessite un protocole TCP que le navigateur ne supporte pas nativement.

**Q6 : 3 raisons de ne pas utiliser json-server en production :**
1. Pas de gestion d'authentification/sécurité.
2. Lenteur sur les gros volumes de données.
3. Pas de gestion des écritures concurrentes (conflits).

**Q7 : Comment Firebase permet-il une connexion "directe" ?**
* Firebase utilise un SDK qui communique avec un backend géré par Google où les permissions sont vérifiées par des "Règles de Sécurité".

## Partie 7 : Questions de réflexion
**Q8 : Étapes pour la production :**
* Créer un vrai backend (Express), migrer vers une vraie BDD (MongoDB/SQL), et ajouter l'authentification JWT.

**Q9 : Risque des librairies externes :**
* Augmentation du poids du projet (bundle size) et dépendance aux mises à jour (breaking changes).

**Q10 : Choix pour une app de chat :**
* **Firebase**, car il gère nativement le temps réel (WebSockets) sans configurer de serveur complexe.