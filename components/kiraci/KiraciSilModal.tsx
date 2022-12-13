import { Entry } from "contentful";
import { createClient as createClientM } from "contentful-management";
import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";
import { EntryFields } from "./KiraciListe";
import styles from "./KiraciSilModal.module.css";

// contentful clienti
const clientM = createClientM({ accessToken: process.env.C_MNG_TOKEN || "" });

type KiraciSilModalProps = {
  kiraci: Entry<EntryFields>;
  showDelModal: boolean;
  handleCloseDel: () => void;
};

export const KiraciSilModal = ({ kiraci, showDelModal, handleCloseDel }: KiraciSilModalProps) => {
  // sayfa yönlendirmesi için
  const router = useRouter();

  const handleDelete = () => {
    const kiraciSil = async () => {
      try {
        const space = await clientM.getSpace(process.env.C_SPC_ID || "");
        const env = await space.getEnvironment("master");
        const entryID: string = kiraci.sys.id;
        const entry = await env.getEntry(entryID);
        await entry.unpublish();
        await entry.delete();
        console.log(`Entry: ${entryID} deleted !`);
      } catch (error) {
        console.error(`Error while deleting entry ${kiraci.sys.id} !`, error);
      }
    };
    kiraciSil();
    alert("Kiracı Silindi !");
    router.push("/");
    handleCloseDel();
  };

  return (
    <div data-testid="ks">
      <Modal className={styles.modal} show={showDelModal} onHide={handleCloseDel}>
        <Modal.Header closeButton>
          <Modal.Title>Kiracıyı sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>Silmek istediğinize emin misiniz, bu işlem geri alınamaz !</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseDel} variant="info">
            Vazgeç
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
