import { Entry } from 'contentful'
import Head from 'next/head'
import { KiraciBaslik } from '../kiraci/KiraciBaslik'
import { EntryFields, KiraciListe } from '../kiraci/KiraciListe'

type HomeProps = {
  kiracilar: Entry<EntryFields>[]
}

export const Home = ({ kiracilar }: HomeProps) => {

  return (
    <>
      <Head>
        <title>Anasayfa</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div>
        <KiraciBaslik kiracilar={kiracilar} />
        <KiraciListe kiracilar={kiracilar} />
      </div>
    </>
  )
}
