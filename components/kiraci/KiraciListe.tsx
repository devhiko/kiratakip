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
  // todo: hiç kiraci yok sayfası ekle
  // if (true) return (
  //   <div
  //     style={{
  //       borderRadius: '1rem',
  //       height: '500px',
  //       border: '1px solid #ccc',
  //       margin: '1rem',
  //       position: 'relative'
  //     }}
  //   >
  //     <div className={styles.center}>
  //       <div style={{ margin: '1rem auto', height: '200px', textAlign: 'center', width: '50%', background: 'gray' }}>
  //         <img src="/assets/ev.png" width={200} height={200}></img>
  //       </div>
  //       <p style={{ textAlign: 'center' }}>
  //         Hiç kiraci yok, Eklediğinizde burada görünür
  //       </p>
  //     </div>
  //   </div>
  // )

  // todo: kiracilar yükleniyor sayfası ekle
  // if (true === true) return (
  //   <div
  //     style={{
  //       borderRadius: '1rem',
  //       height: '500px',
  //       border: '1px solid #ccc',
  //       margin: '1rem',
  //       position: 'relative'
  //     }}
  //   >
  //     <div className={styles.center}>
  //       <div>
  //         <Spinner animation="border" variant="primary" style={{ margin: '0 2rem', width: '100px', height: '100px', borderWidth: '.25rem' }}>
  //           <span className="visually-hidden">Kiracılar Yükleniyor...</span>
  //         </Spinner>
  //         <p style={{ margin: '2rem 1rem' }}>Kiracılar Yükleniyor...</p>
  //       </div>
  //     </div>
  //   </div>
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
