import { createClient, Entry, EntryCollection } from 'contentful'
import Head from 'next/head'
import { KiraciGenelDurum } from '../../components/kiraci/KiraciGenelDurum'
import { EntryFields } from '../../components/kiraci/KiraciListe'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
})

type HesapProps = { kiracilar: Entry<EntryFields>[] }

export const getStaticPaths = async () => {
  const res: EntryCollection<EntryFields> = await client.getEntries({ content_type: "kiracibilgi" })

  const paths = res.items.map((item) => { return { params: { slug: item.fields.slug } } })

  return { paths, fallback: true }
}

export const getStaticProps = async () => {
  const res: EntryCollection<EntryFields> = await client.getEntries({ 'content_type': 'kiracibilgi' })

  return {
    props: {
      kiracilar: res.items
    }
  }
}

const Hesap = ({ kiracilar }: HesapProps) => {
  return (
    <>
      {/* // * bunu dashboard olarak yap grid ile */}
      <Head>
        <title>Profil</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <div>
        Hesap Bilgileri
        <KiraciGenelDurum kiracilar={kiracilar} />
      </div>
    </>
  )
}

export default Hesap