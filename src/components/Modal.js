import React, { useState } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

export default function UIModal({ isOpen }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        centered={true}
      >
        <Modal.Header>Upload image</Modal.Header>
        <Modal.Content image>
          <Image
            size="medium"
            src="https://react.semantic-ui.com/images/wireframe/image-square.png"
            wrapped
          />
          <Modal.Description>
            <p>Would you like to upload this image?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} positive>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
