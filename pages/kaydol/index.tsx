import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import Head from 'next/head'
import styles from './index.module.css'

const Kaydol = () => {
  // form doğrulama state i
  const [validated, setValidated] = useState(false)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    const form = evt.currentTarget
    if (form.checkValidity() === false) {
      evt.preventDefault()
      evt.stopPropagation()
    }

    setValidated(true)
  }
  return (
    <>
      <Head>
        <title>Kaydolun</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <Card className={styles.card}>
        <Card.Title className={styles['card-title']}>Kaydolun</Card.Title>
        <Card.Body>
          <Form className={styles.form} validated={validated} onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ad Soyad</Form.Label>
              <Form.Control type="text" placeholder="John Doe" required />
              <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Lütfen sadece isim ve soyad girin</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <i className="bi bi-envelope" style={{ marginRight: '.5rem' }}></i>
                E-posta
              </Form.Label>
              <Form.Control type="email" placeholder="abc@def.com" pattern='(\w\.?)+@[\w\.-]+\.\w{2,4}' required />
              <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">E-posta adresinizi kontrol edin</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <i className="bi bi-key" style={{ marginRight: '.5rem' }}></i>
                Şifre
              </Form.Label>
              <Form.Control type="password" placeholder="abc123" minLength={8} required />
              <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Şifrenizi kontrol edin, en az 8 karakter</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <i className="bi bi-key" style={{ marginRight: '.5rem' }}></i>
                Şifre Tekrar
              </Form.Label>
              <Form.Control type="password" placeholder="abc123" minLength={8} required />
              <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Şifrenizi kontrol edin, şifreler aynı olmalı</Form.Control.Feedback>
            </Form.Group>
            <Card.Link href="/sifresifirlama">Şifrenizi mi unuttunuz?</Card.Link>
            <Button variant="primary" type="submit">Kaydol</Button>
            <p>veya</p>
            <span>Zaten hesabınız var mı?</span>
            <Button className={styles['btn-giris']} href="/giris" variant="primary" type="submit">Giriş</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Kaydol