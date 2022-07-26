import Head from 'next/head'
import { Entry } from 'contentful'
import { EntryFields } from '../kiraci/KiraciListe'
import { KiraciBaslik } from '../kiraci/KiraciBaslik'
import { KiraciListe } from '../kiraci/KiraciListe'
import styles from './Home.module.css'

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
