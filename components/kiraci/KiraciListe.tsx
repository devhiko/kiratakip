import { Entry } from "contentful"
import { Col, Container, Row, Stack } from "react-bootstrap"
import { KiraciKart } from "./KiraciKart"
import styles from './KiraciListe.module.css'
import Image from 'next/image'

export type EntryFields = {
  daireNo: number
  adSoyad: string
  telefon: string
  sozlesmeTarihi: string
  tutar: number
  slug: string
}

type KiraciListeProps = {
  kiracilar: Entry<EntryFields>[]
}

export const KiraciListe = ({ kiracilar }: KiraciListeProps) => {
  if (!kiracilar.length || kiracilar.length === 0) return (
    <Container className={styles.kiraciyok} >
      <div className={styles.center}>
        <div className={styles['kiraciyok-image']}>
          <Image alt="ev logosu" src="/assets/ev.png" width={100} height={100}></Image>
        </div>
        <p style={{ textAlign: 'center' }}>Hiç kiracı yok, Eklediğinizde burada görünür</p>
      </div>
    </Container>
  )

  // kira takip kart component i
  const kiraKart = () => kiracilar.map((kiraci) => <KiraciKart key={kiraci.sys.id} kiraci={kiraci} />)

  return (
    <div data-testid='kliste'>
      <Container className={styles.container}>
        <Row className={styles.row}>

          <Col className={styles.col}>
            <span>Daire No</span>
            <span>Ad Soyad</span>
            <span>Telefon</span>
            <span>Tutar</span>
            <span>Sözleşme Tarihi</span>
          </Col>

          <Stack>
            {kiraKart()}
          </Stack>

        </Row>
      </Container>
    </div>
  )
}
