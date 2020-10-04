import { useState, useEffect } from "react";

import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommendedsProducts] = useState<IProduct[]>(
    []
  );

  useEffect(() => {
    fetch("http://localhost:3333/recommended").then((response) => {
      response.json().then((data) => {
        setRecommendedsProducts(data);
      });
    });
  }, []);

  return (
    <div>
      <Title>Hello world</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}