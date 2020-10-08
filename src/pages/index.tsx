import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface Props {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: Props) {
  async function handleSum() {
    const { sum } = (await import("../lib/math")).default;

    alert(sum(2, 2));
  }

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

      <button onClick={handleSum}>Sum!</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch("http://localhost:3333/recommended");
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
