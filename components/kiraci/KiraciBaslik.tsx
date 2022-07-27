import { Entry } from 'contentful'
import React, { useState } from 'react'
import { Button, Col, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { EntryFields } from '../kiraci/KiraciListe'
import styles from './KiraciBaslik.module.css'
import { KiraciEkleModal } from './KiraciEkleModal'


type KiraciBaslikProps = {
  kiracilar: Entry<EntryFields>[]
}

export const KiraciBaslik = ({ kiracilar }: KiraciBaslikProps) => {
  // modal state i
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  // search state i
  const [query, SetQuery] = useState('')

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = evt.target.value
    SetQuery(filtered)
    // console.log(filtered)
  }

  const SearchResultsCard = () => {
    const res = kiracilar
      .map(kiraci => kiraci.fields.adSoyad)
      .filter(k => k.toLowerCase().includes(query))
      .map(result => <li className={styles['search-result']} key={result}>{result}</li>)
    // console.log(res)

    return (
      <div className={styles['search-results']}>
        <b>Sonuçlar</b>
        {res.length !== 0 ? res : <p>Böyle biri yok</p>}
      </div>
    )
  }

  return (
    <Container fluid>
      <Row className={styles.row}>

        <Col xs={12} xl={5}>
          <h5>Daire Durumu</h5>
        </Col>

        <Col xs={12} xl={7} className={styles['search-col']}>

          <Form className={styles.form}>
            <Form.Control onChange={handleChange} value={query} className={styles.search} type="search" placeholder="Kiraci arayın" aria-label="Search" />
            {<i className="bi bi-search searchIcon"
              style={{ margin: '1rem .25rem', fontSize: '1.25rem' }}>
            </i>}
          </Form>
          <SearchResultsCard />
        </Col>

      </Row>

      <OverlayTrigger placement="auto" delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="tooltip-auto">Kiracı Ekleyin</Tooltip>}
      >
        <Button className={styles.btn} variant="primary" onClick={handleShow}>
          <i className="bi bi-plus"></i>
        </Button>
      </OverlayTrigger>

      {/* // ? burada floating action button var  */}
      {/* Kiracı ekleme modal */}
      <KiraciEkleModal show={show} handleClose={handleClose} />
    </Container>
  )
}