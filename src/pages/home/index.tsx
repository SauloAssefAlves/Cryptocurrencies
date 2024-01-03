import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [inputValue, setInputValue] = useState("");
  const go = useNavigate();

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

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (inputValue === "") return
    go(`/detail/${inputValue}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          placeholder='Enter the currency digit: BTC...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
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
          {coins.map((coin) => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label='Coin'>
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label='Market'>
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label='Price'>
                {coin.formatedPrice}
              </td>

              <td
                className={
                  parseInt(coin?.delta_24h) >= 0
                    ? styles.tdProfit
                    : styles.tdLoss
                }
                data-label='Volume'>
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
