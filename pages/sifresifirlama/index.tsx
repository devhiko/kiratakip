import Head from 'next/head'
import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import styles from './index.module.css'

const SifreSifirla = () => {
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
        <title>Şifre Sıfırlama</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <Card className={styles.card}>
        <Card.Title className={styles['card-title']}>Şifrenizi Sıfırlayın</Card.Title>
        <Card.Body>
          <Card.Text className={styles['card-text']}>E-posta adresinize bir şifre sıfırlama maili göndereceğiz</Card.Text>
          <Form className={styles.form} validated={validated} onSubmit={handleSubmit} noValidate>
            <Form.Group className={styles['form-group']} controlId="formBasicEmail">
              <Form.Label >E-posta</Form.Label>
              <Form.Control className={styles['form-control']} type="email" pattern='(\w\.?)+@[\w\.-]+\.\w{2,4}' placeholder="abc@def.com" required />
              <Form.Control.Feedback>İyi Görünüyor</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>E postanızı kontrol edin</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Sıfırla</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default SifreSifirla