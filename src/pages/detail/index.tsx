import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { useParams } from "react-router-dom";

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
  //optional "?"
  error?: string;
}
export function Detail() {
  const { criptoName } = useParams();
  const [detailCoin, setDetailCoin] = useState();

  useEffect(() => {
    function getData() {
      fetch(
        `https://sujeitoprogramador.com/api-cripto/coin/?key=f52c3b8ad1ce26b9&pref=BRL&symbol=${criptoName}`
      )
        .then((response) => response.json())
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
          console.log("aqui", resultData);
        });
    }

    getData();
  }, [criptoName]);
  return (
    <div>
      <h1>{criptoName} detail page</h1>
    </div>
  );
}
