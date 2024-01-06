import { Link } from "react-router-dom";
import styles from "./notfound.module.css";

export function NotFound() {
  return (
    <div className={styles.container}>
      <h1>This page doesn't exist</h1>
      <h1>Error 404</h1>
      <Link to='/'>Acess Crypto Currencys</Link>
    </div>
  );
}
