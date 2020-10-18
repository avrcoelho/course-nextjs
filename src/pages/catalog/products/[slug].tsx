import {useRouter} from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Document } from 'prismic-javascript/types/documents'
import PrismicDOM from 'prismic-dom'
// import dynamic from 'next/dynamic'

import { client } from "../../../lib/prismic";

// ssr: false - vai ser informado que o componente vaai ser carregado pelo bronser e não pelo node
// const AddToCartModal = dynamic(
//   () => import('../../../components/AddToCartModal'),
//   {loading: () => <p>carregando</p>, ssr: false}
// )

interface Props {
  product: Document
}

export default function Product({ product }: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return "Carregando...";
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description) }} />
    
      <p>Price: ${product.data.price}</p>

      <img src={product.data.thumbnail.url} width={600} alt={product.data.thumbnail.alt}/>
   
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};