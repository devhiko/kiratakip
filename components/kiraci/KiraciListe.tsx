import { Entry } from "contentful"
import { KiraciKart } from "./KiraciKart"
import styles from './KiraciListe.module.css'
import { Col, Container, Row, Spinner, Stack } from "react-bootstrap"

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
  console.log(kiracilar.length)
  // if (!kiracilar.length || kiracilar.length === 0) return (
  //   <Container className={styles.kiraciyok} >
  //     <div className={styles.center}>
  //       <div className={styles['kiraciyok-image']}>
  //         <img src="/assets/ev.png" width={100} height={100}></img>
  //       </div>
  //       <p style={{ textAlign: 'center' }}>Hiç kiracı yok, Eklediğinizde burada görünür</p>
  //     </div>
  //   </Container>
  // )

  // todo: kiracilar yükleniyor sayfası ekle
  // ? if kiracilar.loding return Loading...
  // if (kiracilar.loading) return (
  //   <Container className={styles['kiraci-loading']}>
  //     <div className={styles.center}>
  //       <Spinner animation="border" variant="primary" className={styles.spinner}>
  //         <span className="visually-hidden">Kiracılar Yükleniyor...</span>
  //       </Spinner>
  //       <p style={{ margin: '1rem auto' }}>Kiracılar Yükleniyor...</p>
  //     </div>
  //   </Container>
  // )

  // kira takip kart component i
  const kiraKart = () => kiracilar.map((kiraci) => <KiraciKart key={kiraci.sys.id} kiraci={kiraci} />)

  return (
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
  )
}
