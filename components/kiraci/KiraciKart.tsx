import { Entry } from 'contentful'
import { useState } from 'react'
import { Card, Popover, OverlayTrigger, Stack, Col } from 'react-bootstrap'
import { KiraciGuncelModal } from "./KiraciGuncelModal"
import styles from './KiraciKart.module.css'
import { KiraciSilModal } from './KiraciSilModal'
import { EntryFields } from './KiraciListe'
import Link from 'next/link'

type KiraciKartProps = {
  kiraci: Entry<EntryFields>
}

export const KiraciKart = ({ kiraci }: KiraciKartProps) => {
  const { daireNo, adSoyad, telefon, sozlesmeTarihi, tutar, slug } = kiraci.fields

  // modal state leri
  const [showUpdModal, setShowUpdModal] = useState(false)
  const handleShowUpd = () => setShowUpdModal(true)
  const handleCloseUpd = () => setShowUpdModal(false)

  const [showDelModal, setShowDelModal] = useState(false)
  const handleShowDel = () => setShowDelModal(true)
  const handleCloseDel = () => setShowDelModal(false)

  // popover component i
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className={styles['pov-body']}>
        <Link href={`/kiracilar/${slug}`}><a>Git</a></Link>
        <Link href='/'>
          <a onClick={handleShowUpd}>
            <i className="bi bi-pencil"></i>
            Düzenle
          </a>
        </Link>
        <Link href='/'><a onClick={handleShowDel}>
          <i className="bi bi-trash"></i>
          Sil
        </a></Link>
      </Popover.Body>
    </Popover>
  )

  return (
    <Card className={styles.card}>
      <Card.Body className={styles['card-body']}>
        <Stack className={styles['card-stack']} direction='horizontal'>
          <Col xs={11}>
            <span>{daireNo}</span>
            <span>{adSoyad}</span>
            <span>{telefon}</span>
            <span>{tutar}</span>
            <span>{sozlesmeTarihi}</span>
          </Col>
          {/*  // ? ikon kullan */}
          {/* menu icon */}
          <Col xs={1}>
            <OverlayTrigger trigger="click" delay={{ show: 5000, hide: 400 }} placement="left" overlay={popover}>
              <i className="bi bi-three-dots-vertical"
                style={{ fontSize: '1.25rem', marginLeft: '.5rem', cursor: 'pointer' }}
              ></i>
            </OverlayTrigger>
          </Col>
          {/* güncelleme modalı */}
          {/* silme modalı */}
          <KiraciGuncelModal kiraci={kiraci} showUpdModal={showUpdModal} handleCloseUpd={handleCloseUpd} />
          <KiraciSilModal kiraci={kiraci} showDelModal={showDelModal} handleCloseDel={handleCloseDel} />
        </Stack>
      </Card.Body>
    </Card>
  )
}