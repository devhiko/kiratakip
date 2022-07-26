import { Button, Container, Image, Nav, Navbar, OverlayTrigger, Popover, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import styles from './Navbar.module.css'

export const NavbarComponent = () => {

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className={styles['pov-body']}>
        <Link href='/account/username'><a>Profil</a></Link>
        <Link href='/'><a>Seçenekler</a></Link>
        <Link href='/'><a>Seçenekler</a></Link>
        <Link href='/'><a>Seçenekler</a></Link>
        <Link href='/'><a>Seçenekler</a></Link>
      </Popover.Body>
    </Popover>
  )

  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand href="/"><Image src='/assets/logo.png' width={30} height={30} />
          KiraTakip
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link href='/'>Anasayfa</Nav.Link>
            <Nav.Link href='/iletisim'>İletişim</Nav.Link>
            <Nav.Link href='/hakkimizda'>Hakkımızda</Nav.Link>
          </Nav>

          <Row className={styles['nav-row']}>

            <Col xs={2}><Button href='/giris'>Giriş</Button></Col>

            <Col xs={2}>
              <Nav.Link className={styles['link-img']}>
                <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
                  <Image src='/assets/avatar.png' width={40} height={40}></Image>
                </OverlayTrigger>
              </Nav.Link>
            </Col>

          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}