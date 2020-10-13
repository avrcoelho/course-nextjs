import Head from "next/head";

interface Props {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSuffix?: Boolean;
  shouldIndexPage?: boolean
}

export default function SEO({
  title,
  description,
  image,
  shouldIndexPage = false,
  shouldExcludeTitleSuffix = false
}: Props) {
  const pageTitle = `${title} ${shouldExcludeTitleSuffix && '| DevCommerce'}`
  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  )
}