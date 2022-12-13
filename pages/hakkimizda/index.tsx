import Head from "next/head";
import { Card } from "react-bootstrap";
import styles from "./index.module.css";

const Hakkimizda = () => {
  return (
    <>
      <Head>
        <title>Hakkımızda</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <Card body className={styles.card}>
        <Card.Title>Hakkımızda</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, illum animi repudiandae id qui perspiciatis,
          quae mollitia accusantium ad ratione, possimus saepe aspernatur quam ipsum fuga earum quasi? Aut, possimus.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, illum animi repudiandae id qui perspiciatis,
          quae mollitia accusantium ad ratione, possimus saepe aspernatur quam ipsum fuga earum quasi? Aut, possimus.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, illum animi repudiandae id qui perspiciatis,
          quae mollitia accusantium ad ratione, possimus saepe aspernatur quam ipsum fuga earum quasi? Aut, possimus.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, illum animi repudiandae id qui perspiciatis,
          quae mollitia accusantium ad ratione, possimus saepe aspernatur quam ipsum fuga earum quasi? Aut, possimus.
        </Card.Text>
      </Card>
    </>
  );
};

export default Hakkimizda;
