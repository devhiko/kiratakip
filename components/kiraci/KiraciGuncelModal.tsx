import { Entry } from "contentful"
import { createClient as createClientM } from "contentful-management"
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import styles from './KiraciGuncelModal.module.css'


// contentful client i
const clientM = createClientM({ accessToken: process.env.C_MNG_TOKEN! })

// inputlar
type Inputs = {
  dairedurum: boolean
  daireno: number
  adsoyad: string
  tel: number
  tutar: number
  soztarih: string
}

type KiraciGuncelModalProps = {
  kiraci: Entry<unknown>
  showUpdModal: boolean
  handleCloseUpd: () => void
}

export const KiraciGuncelModal = ({ kiraci, showUpdModal, handleCloseUpd }: KiraciGuncelModalProps) => {
  // state kontrolü
  const [validated, setValidated] = useState(false)

  const [inputs, setInputs] = useState<Inputs>({
    dairedurum: true,
    daireno: 0,
    adsoyad: '',
    tel: 0,
    tutar: 0,
    soztarih: new Date().toDateString(),
  })
  // slug oluşturucu
  const makeSlug = () => {
    const slug = inputs.adsoyad.toLowerCase().split(" ")
    const ad = slug[0]
    const soyad = slug[1]
    return `${ad}-${soyad}`
  }
  // event ler
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    const form = evt.currentTarget
    if (form.checkValidity() === false) {
      evt.preventDefault()
      evt.stopPropagation()
    }

    setValidated(true)
    // ! çelişkiyi çöz
    evt.preventDefault()
    const kiraciGuncelle = async () => {
      const entryID: string = kiraci.sys.id
      clientM.getSpace(process.env.C_SPC_ID!)
        .then((space) => space.getEnvironment('master'))
        .then((environment) => environment.getEntry(entryID))
        .then((entry) => {
          entry.fields = {
            daireDurum: { 'en-US': true },
            slug: { 'en-US': makeSlug() },
            daireNo: { 'en-US': Number(inputs.daireno) },
            adSoyad: { 'en-US': inputs.adsoyad },
            telefon: { 'en-US': inputs.tel },
            tutar: { 'en-US': Number(inputs.tutar) },
            sozlesmeTarihi: { 'en-US': inputs.soztarih }
          }
          return entry.update()
        })
        .then((entry) => {
          entry.publish()
          console.log(`Entry ${entry.sys.id} updated.`)
        })
        .catch(console.error)
    }
    kiraciGuncelle()
    alert('Kiracı güncellendi')
    handleCloseUpd()
    // form temizleme
    setInputs({
      dairedurum: true,
      daireno: 0,
      adsoyad: '',
      tel: 0,
      tutar: 0,
      soztarih: new Date().toDateString(),
    })
  }

  return (
    <Modal className={styles.modal} show={showUpdModal} onHide={handleCloseUpd}>
      <Modal.Header closeButton><Modal.Title>Bilgileri Güncelleyin</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit} noValidate>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Daire No</Form.Label>
            <Form.Control name="daireno" value={inputs.daireno} onChange={handleChange} type="number"
              placeholder="1,2,3.."
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
            <Form.Control name="tel" value={inputs.tel} onChange={handleChange} type="tel" placeholder="050xxxxxxxx"
              pattern='\(?(\d{3})\)?[-\.\s]?(\d{3})[-\.\s]?(\d{4})'
              required />
            <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Telefon numarasını kontrol edin</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tutar (₺)</Form.Label>
            <Form.Control name="tutar" value={inputs.tutar} onChange={handleChange} type="number" placeholder="1500"
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

          <Button className={styles.btnGuncelle} variant="primary" type="submit">Güncelle</Button>
        </Form>
      </Modal.Body>
    </Modal >
  )
}