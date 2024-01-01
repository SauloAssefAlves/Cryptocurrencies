import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
}

interface DataProps {
  coins: CoinProps[];
}
// https://coinlib.io/api/v1/coinlist?key=f52c3b8ad1ce26b9&pref=BRL
export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);

  useEffect(() => {
    function getData() {
      fetch("https://sujeitoprogramador.com/api-cripto/?key=f52c3b8ad1ce26b9")
        .then((response) => response.json())
        .then((data: DataProps) => {
          let coinsData = data.coins.slice(0, 15);

          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
            };

            return formated;
          });

          setCoins(formatResult);
        });
      // .catch((err) => {
      //   console.log("err", err);
      // });
    }
    getData();
  }, []);

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
            <td className={styles.tdLoss} data-label='Volume'>
              <span>-5.3</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
