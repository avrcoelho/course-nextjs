import { GetServerSideProps } from "next";
import { useRouter } from "next/router"
import Link from 'next/link'
import { FormEvent, useState } from "react"
import { Document } from 'prismic-javascript/types/documents'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { client } from "../lib/prismic";

interface Props {
  searchResults: Document[];
}

export default function Search({ searchResults }: Props) {
 const [search, setSearch] = useState('')

 const router = useRouter()
 
  function handleSearch(event: FormEvent) {
    event.preventDefault();

    router.push(`/search?q=${encodeURIComponent(search)}`)

    setSearch('')
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search} onChange={event => setSearch(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <ul>
          {searchResults.map((product) => (
            <li key={product.id}>
              <Link href={`/catalog/products/${product.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(product.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const {q} = context.query;

  if (!q) {
    return {
      props: {
        searchResults: []
      }
    }
  }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    // forma de fazer busca no prismic
    // coloca "my" quando é campo que criei, não padrão do prismic
    Prismic.Predicates.fulltext('my.product.title', String(q))
  ]);

  return {
    props: {
      searchResults: searchResults.results
    }
  }
}
