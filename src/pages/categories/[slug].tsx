import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

interface IProduct {
  id: string;
  title: string;
}

interface Props {
  products: IProduct[];
}

export default function Categoriy({ products }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return "Carregando...";
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  const paths = categories.map((category) => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(
    `http://localhost:3333/products?category_id=${slug}`
  );
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};