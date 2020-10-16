import { GetServerSideProps } from "next";
import Prismic from 'prismic-javascript'
import {Document} from 'prismic-javascript/types/documents'
import Link from 'next/link'
import PrismicDOM from 'prismic-dom'

import SEO from "../components/SEO";
import { client } from "../lib/prismic";
import { Title } from "../styles/pages/Home";

interface Props {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: Props) {
  async function handleSum() {
    const { sum } = (await import("../lib/math")).default;

    alert(sum(2, 2));
  }

  return (
    <div>
      <SEO title="Seu Ecommerce" />

      <Title>Hello world</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
 const recommendedProducts = await client().query([
  //  retorna todos os registros que o tipo do documente é produto
   Prismic.Predicates.at('document.type', 'product')
 ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
