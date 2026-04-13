import styles from './MainContent.module.css';
import { memo } from 'react';

interface Column {
  id: string;
  title: string;
  tasks: string[];
}

interface MainContentProps {
  columns: Column[];
}

// On enveloppe le composant avec memo(...)
const MainContent = memo(function MainContent({ columns }: MainContentProps) { 
  console.log('MainContent re-render');
  
  return (
    <main className={styles.main}> 
      <div className={styles.board}>
        {columns.map(col => (
          <div key={col.id} className={styles.column}>
            <h3 className={styles.colTitle}>
              {col.title} ({col.tasks.length})
            </h3>

            {col.tasks.map((task, i) => (
              <div key={i} className={styles.card}>
                {task}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  ); 
});

// Important : on exporte le composant mémoïsé
export default MainContent;