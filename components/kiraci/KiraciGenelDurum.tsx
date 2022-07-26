import { Card } from 'react-bootstrap'
import styles from './KiraciGenelDurum.module.css'
import { Entry } from 'contentful'
import { EntryFields } from '../kiraci/KiraciListe'

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
