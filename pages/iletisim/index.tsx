import Head from 'next/head'
import React from 'react'
import { Card } from 'react-bootstrap'
import styles from './index.module.css'

const Iletisim = () => {
  return (
    <>
      <Head>
        <title>Bize Ulaşın</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles['card-title']}>Bize Ulaşın</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">İletişim Bilgilerimiz</Card.Subtitle>
          <Card.Text>Adres: Filan Cd.</Card.Text>
          <Card.Text>
            <i className="bi bi-telephone"></i>
            Telefon: +34 543 00 12
          </Card.Text>
          <Card.Text>
            <i className="bi bi-envelope"></i>
            E-Posta: filan@falan.com
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Iletisim
