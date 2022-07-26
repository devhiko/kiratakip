import { Entry } from 'contentful'
import { Card } from 'react-bootstrap'
import { EntryFields } from '../kiraci/KiraciListe'
import styles from './KiraciGenelDurum.module.css'

type KiraciGenelDurumProps = {
  kiracilar: Entry<EntryFields>[]
}

export const KiraciGenelDurum = ({ kiracilar }: KiraciGenelDurumProps) => {

  return (
    <Card className={styles.card}>
      <Card.Body className={styles['card-body']}>
        <div>
          <span>Toplam Kiracı</span> <br />
          <span>{kiracilar?.length}</span>
        </div>
      </Card.Body>
    </Card>
  )
}
