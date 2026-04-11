import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header>AI Mavericks</header>
      <main>
        <section id="members">Members section</section>
        <section id="dinners">Dinners section</section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
