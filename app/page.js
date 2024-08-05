import PantryForm from '../src/components/PantryForm';
import PantryList from '../src/components/PantryList';
import styles from './page.module.css';  // Adjust or remove if not used

import '../src/styles/main.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Pantry Tracker</h1>
      </div>

      <section className={styles.formSection}>
        <PantryForm />
      </section>

      <section className={styles.listSection}>
        <PantryList />
      </section>
    </main>
  );
}
