import { createClient as createClientM } from 'contentful-management'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import styles from './KiraciEkleModal.module.css'

// form inputları
type Inputs = {
  daireno: number
  adsoyad: string
  tel: number
  tutar: number
  soztarih: string
}

// component prop ları
type KiraciEkleModalProps = {
  show: boolean
  handleClose: () => void
}

export const KiraciEkleModal = ({ show, handleClose }: KiraciEkleModalProps) => {
  // veri state kontrolü
  const [inputs, setInputs] = useState<Inputs>({
    daireno: 0,
    adsoyad: '',
    tel: 0,
    tutar: 0,
    soztarih: new Date().toDateString(),
  })

  // * slug maker (life savior) Split using a space character
  const makeSlug = () => {
    const slug = inputs.adsoyad.toLowerCase().split(" ")
    const ad = slug[0]
    const soyad = slug[1]
    return `${ad}-${soyad}`
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const kiraciEkle = async () => {
      try {
        const clientM = createClientM({ accessToken: process.env.C_MNG_TOKEN! })
        const space = await clientM.getSpace(process.env.C_SPC_ID!)
        const env = await space.getEnvironment('master')
        const entry = await env.createEntry('kiracibilgi', {
          fields: {
            daireDurum: { 'en-US': true },
            slug: { 'en-US': makeSlug() },
            daireNo: { 'en-US': Number(inputs.daireno) },
            adSoyad: { 'en-US': inputs.adsoyad },
            telefon: { 'en-US': inputs.tel },
            tutar: { 'en-US': Number(inputs.tutar) },
            sozlesmeTarihi: { 'en-US': inputs.soztarih }
          }
        })
        entry.publish()
        // console.log(`Entry ${entry.sys.id} published !`)
      } catch (error) {
        console.error('Error while publishing entry', error)
      }
    }
    kiraciEkle()
    // doğrulama için
    // console.log('Entry: ', inputs)
    alert('Kiracı Eklendi !')
    handleClose()
    // form temizleme
    setInputs({
      daireno: 0,
      adsoyad: '',
      tel: 0,
      tutar: 0,
      soztarih: new Date().toDateString(),
    })
  }

  return (
    <Modal className={styles.modal} show={show} onHide={handleClose}>
      <Modal.Header closeButton><Modal.Title>Kiracı Ekleyin</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Daire No</Form.Label>
            <Form.Control name="daireno" value={inputs.daireno} onChange={handleChange} type="number"
              placeholder="1,2,3.."
              min={1}
              max={25}
              required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control name="adsoyad" value={inputs.adsoyad} onChange={handleChange} type="text"
              placeholder="Ahmet Yeşil"
              required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Telefon</Form.Label>
            <Form.Control name="tel" value={inputs.tel} onChange={handleChange} type="tel"
              placeholder="50xxxxxxxx"
              pattern='\(?(\d{3})\)?[-\.\s]?(\d{3})[-\.\s]?(\d{4})'
              required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tutar (₺)</Form.Label>
            <Form.Control name="tutar" value={inputs.tutar} onChange={handleChange} type="number"
              placeholder="1500"
              min={1000}
              max={10000}
              required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Sözleşme Tarihi</Form.Label>
            <Form.Control name="soztarih" value={inputs.soztarih} onChange={handleChange} type="date"
              placeholder="Ahmet Yeşil"
              required />
          </Form.Group>

          <Button className={styles.btnEkle} variant="primary" type="submit">
            {/* <Spinner animation="border" size='sm' style={{ margin: '0 .5rem' }}>
              <span className="visually-hidden">Kiracılar Yükleniyor...</span>
            </Spinner> */}
            Ekle
          </Button>
        </Form>
      </Modal.Body>
    </Modal >
  )
}