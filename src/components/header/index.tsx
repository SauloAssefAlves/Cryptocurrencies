import styles from "./header.module.css";
import logoimg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
export function Header() {
  return (
    <header className={styles.container}>
      <div>
        <Link to='/' className={styles.logo_link}>
          <h1 className={styles.logo_text}>
            Crypto<span className={styles.logo_text_emphasis}>Currencys</span>
          </h1>
        </Link>
      </div>
    </header>
  );
}
