import styles from "./home.module.css";

export function Home() {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input placeholder='Enter the currency digit: BTC...' />
        <button type='submit'></button>
      </form>
    </main>
  );
}
