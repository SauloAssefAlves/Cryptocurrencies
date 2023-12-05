import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
export function Home() {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input placeholder='Enter the currency digit: BTC...' />
        <button type='submit'>
          <BiSearch size={30} color='#FFF' />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col'>Coin</th>
            <th scope='col'>Market Value</th>
            <th scope='col'>Price</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>

        <tbody id='tbody'>
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label='Coin'>
              <Link className={styles.link} to='/detail/btc'>
                <span>Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-label='Market'>
              R$ 1999
            </td>
            <td className={styles.tdLabel} data-label='Price'>
              R$ 40.222
            </td>
            <td className={styles.tdProfit} data-label='Volume'>
              <span>-5.3</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
