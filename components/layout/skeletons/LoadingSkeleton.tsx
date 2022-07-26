import { Spinner } from "react-bootstrap"
import styles from './LoadingSkeleton.module.css'

export const LoadingSkeleton = () => {
  return (
    <div className={styles.container}>
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">Sayfa Yükleniyor...</span>
      </Spinner>
      <span>Sayfa Yükleniyor...</span>
    </div>
  )
}