import { createClient as createClientM } from 'contentful-management'
import { useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
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
  // state kontrolü
  const [validated, setValidated] = useState(false)

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
    // bilgiler  yanlışsa
    const form = evt.currentTarget
    if (form.checkValidity() === false) {
      evt.preventDefault()
      evt.stopPropagation()
      // alert('Bazı bilgiler yanlış')
    }
    setValidated(true)
    // ! buradaki çelişkiyi çöz
    const kiraciEkle = async () => {
      // todo: if !inputs {...}
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
        console.log(`Entry ${entry.sys.id} published !`)
      } catch (error) {
        console.error('Error while publishing entry', error)
      }
    }
    kiraciEkle()
    alert('Kiracı Eklendi !')
    // doğrulama için
    console.log('Entry: ', inputs)
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

        <Form validated={validated} onSubmit={handleSubmit} noValidate>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Daire No</Form.Label>
            <Form.Control name="daireno" value={inputs.daireno} onChange={handleChange} type="number"
              placeholder="1,2,3.."
              min={1}
              max={25}
              required />
            <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Lütfen geçerli bir daire numarası girin</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control name="adsoyad" value={inputs.adsoyad} onChange={handleChange} type="text"
              placeholder="Ahmet Yeşil"
              required />
            <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Girdiğiniz bilgileri kontrol edin</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* // ? todo: add regex ? */}
            <Form.Label>Telefon</Form.Label>
            <Form.Control name="tel" value={inputs.tel} onChange={handleChange} type="tel"
              placeholder="50xxxxxxxx"
              pattern='\(?(\d{3})\)?[-\.\s]?(\d{3})[-\.\s]?(\d{4})'
              required />
            <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Telefon numarasını kontrol edin</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tutar (₺)</Form.Label>
            <Form.Control name="tutar" value={inputs.tutar} onChange={handleChange} type="number"
              placeholder="1500"
              min={1000}
              max={10000}
              required />
            <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Lütfen uygun bir tutar girin, 1000 ile 10000 arası</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Sözleşme Tarihi</Form.Label>
            <Form.Control name="soztarih" value={inputs.soztarih} onChange={handleChange} type="date"
              placeholder="Ahmet Yeşil"
              required />
            <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Lütfen tarihi kontrol edin</Form.Control.Feedback>
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