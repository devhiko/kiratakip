import Head from 'next/head'
import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import styles from './index.module.css'

const Giriş = () => {
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
        <title>Giriş Yapın</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <Card className={styles.card}>
        <Card.Title className={styles['card-title']}>Giriş Yapın</Card.Title>
        <Card.Body>
          <Form className={styles.form} validated={validated} onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <i className="bi bi-envelope" style={{ marginRight: '.5rem' }}></i>
                E-posta
              </Form.Label>
              <Form.Control type="email" placeholder="abc@maildomain.com" pattern='(\w\.?)+@[\w\.-]+\.\w{2,4}' required />
              <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">E-posta adresinizi kontrol edin</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <i className="bi bi-key" style={{ marginRight: '.5rem' }}></i>
                Şifre
              </Form.Label>
              <Form.Control type="password" placeholder="abc1234" minLength={8} required />
              <Form.Control.Feedback>İyi görünüyor</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Şifrenizi kontrol edin, en az 8 karakter olmalı</Form.Control.Feedback>
            </Form.Group>
            <Card.Link href="/sifresifirlama">Şifrenizi mi unuttunuz?</Card.Link>
            <Button variant="primary" type="submit">Giriş</Button>
            <p>veya</p>
            <Button href="/kaydol" variant="primary" type="submit">Kaydol</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Giriş