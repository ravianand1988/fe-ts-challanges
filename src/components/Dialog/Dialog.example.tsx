import { useState } from "react"
import { Dialog } from "./Dialog"

export const DialogExample = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleConfirm = () => {
    console.log('on confirm...')
  }
  const handleCancel = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Open Dialog</button>
      <Dialog
        open={isOpen}
        onConfirm={() => handleConfirm()}
        onCancel={handleCancel}
      >
        <h3>Confirm Action</h3>
        <p>Are you sure you want to proceed?</p>
      </Dialog>
    </>
  )
}
