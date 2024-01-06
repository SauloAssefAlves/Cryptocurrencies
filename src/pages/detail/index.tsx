import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { useParams, useNavigate } from "react-router-dom";

interface CoinProp {
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  low_24h: string;
  high_24h: string;
  total_volume_24h: string;
  delta_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowprice: string;
  formatedHighproce: string;
}
export function Detail() {
  const { criptoName } = useParams();
  const [coinDetail, setCoinDetail] = useState<CoinProp>();
  const [loading, setLoading] = useState(true);

  const go = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(
        `https://sujeitoprogramador.com/api-cripto/coin/?key=f52c3b8ad1ce26b9&pref=BRL&symbol=${criptoName}`
      )
        .then((response) => response.json()).catch((err)=> go('/'))
        .then((data: CoinProp) => {
          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const resultData = {
            ...data,
            formatedPrice: price.format(Number(data.price)),
            formatedMarket: price.format(Number(data.market_cap)),
            formatedLowprice: price.format(Number(data.low_24h)),
            formatedHighproce: price.format(Number(data.high_24h)),
          };
          setCoinDetail(resultData);
          setLoading(false);
        });
    }

    getData();
  }, [criptoName]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Loading Details...</h4>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coinDetail?.name}</h1>
      <p className={styles.center}>{coinDetail?.symbol}</p>
      <section className={styles.content}>
        <p>
          <strong>Price:</strong> {coinDetail?.formatedPrice}
        </p>
        <p>
          <strong>High price 24h:</strong> {coinDetail?.formatedHighproce}
        </p>
        <p>
          <strong>Low price 24h:</strong> {coinDetail?.formatedLowprice}
        </p>
        <p>
          <strong>Delta 24h:</strong>
          <span
            className={
              parseInt(coinDetail?.delta_24h!) >= 0
                ? styles.profit
                : styles.loss
            }>
            {coinDetail?.delta_24h}
          </span>
        </p>
        <p>
          <strong>Market cap:</strong> {coinDetail?.formatedMarket}
        </p>
      </section>
    </div>
  );
}
