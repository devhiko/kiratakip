import { createClient, Entry, EntryCollection } from 'contentful'
import { EntryFields } from '../components/kiraci/KiraciListe'
import { Home } from '../components/layout/Home'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
})

type AnasayfaProps = { kiracilar: Entry<EntryFields>[] }

export const getStaticProps = async () => {
  const res: EntryCollection<EntryFields> = await client.getEntries({ 'content_type': 'kiracibilgi' })

  return {
    props: {
      kiracilar: res.items
    }
  }
}

const Anasayfa = ({ kiracilar }: AnasayfaProps) => (
  <Home kiracilar={kiracilar} />
)

export default Anasayfa