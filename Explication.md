
````markdown
# React Concepts Overview

Ce document présente les principaux concepts utilisés dans **React** pour le développement d'interfaces utilisateur modernes.

---

# 0. DOM dans React

Le **DOM (Document Object Model)** représente la structure HTML de la page.

Dans une application web classique, chaque modification de l'interface met directement à jour le DOM, ce qui peut être coûteux en performance.

React utilise un **Virtual DOM** qui permet de comparer les modifications avant de mettre à jour uniquement les éléments nécessaires dans le DOM réel.

---

# 1. useState

`useState` est un **Hook React** qui permet de créer et gérer **l’état (state)** d’un composant.

Il permet de **stocker des données dynamiques** dans un composant.

Lorsque la valeur du state change, React **met automatiquement à jour l’interface utilisateur**.

### Exemple

```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
````

### Utilisation

* compteur
* formulaire
* données dynamiques
* gestion d'état d'un composant

---

# 2. useEffect

`useEffect` permet **d’exécuter du code après le rendu du composant**.

Il est utilisé pour gérer les **effets secondaires** dans React.

### Cas d'utilisation

* appel API
* manipulation du DOM
* timers
* abonnements
* récupération de données

### Exemple

```javascript
import { useEffect } from "react";

useEffect(() => {
  console.log("Le composant est monté");
}, []);
```

Le tableau `[]` signifie que l'effet est exécuté **une seule fois lors du montage du composant**.

---

# 3. useRef

`useRef` permet de **stocker une référence vers un élément DOM ou une valeur persistante**.

Contrairement à `useState`, modifier une valeur avec `useRef` **ne provoque pas de re-render du composant**.

### Utilisations principales

* accéder directement à un élément du DOM
* stocker une valeur persistante
* gérer le focus d'un input

### Exemple

```javascript
import { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}
```

---

# 4. useReducer

`useReducer` est une **alternative à `useState`** lorsque la gestion de l'état devient **plus complexe**.

Il est souvent utilisé lorsque plusieurs actions peuvent modifier l'état.

### Il fonctionne avec :

* un **state**
* une fonction **reducer**
* des **actions**

### Syntaxe

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### Exemple

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    default:
      return state;
  }
}
```

---

# 5. useContext

Le hook `useContext` permet de **partager des données entre plusieurs composants sans passer les props manuellement à chaque niveau**.

Il est utilisé avec **Context API**.

### Cas d'utilisation

* utilisateur connecté
* thème (dark / light)
* langue
* panier e-commerce

### Exemple

```javascript
import { createContext, useContext } from "react";

const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}

function Page() {
  const theme = useContext(ThemeContext);
  return <h1>Theme : {theme}</h1>;
}
```

---

# 6. Props

Les **props (properties)** permettent de **passer des données d’un composant parent à un composant enfant**.

Les props sont **en lecture seule**.

### Exemple

```javascript
function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}

<Greeting name="Walid" />
```

---

# 7. Hooks

Les **Hooks** permettent d’utiliser les fonctionnalités de React dans les **composants fonctionnels**.

### Hooks les plus utilisés

| Hook       | Utilisation                    |
| ---------- | ------------------------------ |
| useState   | gérer l’état                   |
| useEffect  | gérer les effets (API, timers) |
| useRef     | accéder au DOM                 |
| useReducer | gérer un état complexe         |
| useContext | partager des données globales  |

---

# 8. Cycle de vie d’un composant

Un composant React passe par plusieurs étapes importantes.

### 1. Montage (Mounting)

Le composant est **créé et ajouté au DOM**.

### 2. Mise à jour (Updating)

Le composant est **mis à jour lorsque les props ou le state changent**.

### 3. Démontage (Unmounting)

Le composant est **supprimé du DOM**.

Le hook `useEffect` permet de gérer ces étapes.

---

# 9. Single Page Application (SPA)

React est souvent utilisé pour créer des **Single Page Applications (SPA)**.

Une SPA **charge une seule page HTML**, puis React **met à jour l’interface dynamiquement** sans recharger la page.

### Avantages

* navigation rapide
* meilleure expérience utilisateur
* application plus fluide

Pour gérer la navigation dans une SPA, on utilise généralement **React Router**.

---

# 10. Architecture d’une application React

Structure typique d’un projet React :

```
src
 ├── components
 │    ├── Header.jsx
 │    ├── Sidebar.jsx
 │    └── MainContent.jsx
 │
 ├── pages
 │
 ├── App.jsx
 └── main.jsx
```

Chaque partie de l’interface est **un composant React réutilisable**.

---

# Conclusion

React est une bibliothèque JavaScript moderne permettant de créer des **interfaces utilisateur dynamiques et performantes**.

Grâce aux **composants, aux hooks et au Virtual DOM**, React facilite la création d’applications web **maintenables, rapides et modulaires**.

```

✅ Ce README est :
- **propre et professionnel**
- **bien structuré**
- **adapté pour un TP GitHub**
- **facile à lire pour un professeur**

---

Si tu veux, je peux aussi te montrer **comment transformer ce README en README GitHub très professionnel (avec badges, preview du projet, installation, run, screenshots)** comme les projets open-source.
```
