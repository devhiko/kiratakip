import { createClient, Entry, EntryCollection } from "contentful"
import Head from "next/head"
import { Button, Card, Col, Stack } from 'react-bootstrap'
import { EntryFields } from "../../components/kiraci/KiraciListe"
import styles from './[slug].module.css'


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

type ParamType = {
  params: { slug: string }
}

type KiraciDetayProps = {
  kiraci: Entry<EntryFields>
}

export const getStaticPaths = async () => {
  const res: EntryCollection<EntryFields> = await client.getEntries({ content_type: "kiracibilgi" })

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }: ParamType) => {
  const { items }: EntryCollection<EntryFields> = await client.getEntries({
    content_type: 'kiracibilgi',
    'fields.slug': params.slug
  })

  if (!items.length)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }

  return {
    props: {
      kiraci: items[0]
    },
    revalidate: 1
  }
}

export default function KiraciDetay({ kiraci }: KiraciDetayProps) {
  let { adSoyad, tutar } = kiraci?.fields || {}

  const AyKart = () => {
    const aylar = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık'
    ]

    const ayKarti = () => aylar.map((ay: string) => (
      <Stack className={styles.container} key={ay}>
        <Stack className={styles['aykart-header']} direction="horizontal">

          <Col xs={7}>
            <span>Ay</span>
            <span>Tutar</span>
          </Col>

          <Col xs={5}>
            <span>Ödeme Durumu</span>
          </Col>

        </Stack>

        <Card className={styles.aykart}>

          <Col xs={9}>
            <span>{ay}</span>
            <span>{tutar}</span>
          </Col>

          <Col xs={3}>
            <div style={{ fontSize: '1.25rem', cursor: 'pointer' }} className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label className="form-check-label"></label>
            </div>
          </Col>

        </Card>
      </Stack>
    ))

    return <>{ayKarti()}</>
  }

  return (
    <>
      <Head>
        <title>{adSoyad}</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <div className={styles.header}>
        <h5>{adSoyad}</h5>
        <Button variant='primary' href='/'>
          <i style={{ marginRight: '.5rem' }} className="bi bi-arrow-left"></i>
          Geri
        </Button>
      </div>
      <AyKart />
    </>
  )
}