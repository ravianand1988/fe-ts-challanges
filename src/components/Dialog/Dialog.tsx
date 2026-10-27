import { useEffect, useRef } from "react";
import styles from './Dialog.module.css';

interface TDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const Dialog = (props: TDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleConfirm = () => {
    props.onConfirm();
  }

  const handleCancel = () => {
    props.onCancel();
  }

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (props.open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [props.open]);

  return (
    <dialog ref={dialogRef} onClose={props.onCancel}>
      <section className="dialog-content">
        {props.children}
      </section>
      <footer className={styles.dialogFooter}>
        <button autoFocus type="button" onClick={handleConfirm}>Confirm</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </footer>
    </dialog>
  )
}

export { Dialog }
