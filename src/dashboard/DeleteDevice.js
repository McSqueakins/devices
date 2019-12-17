import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

export const DeleteDevice = ({ id, systemName, setGetDataIndicator }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>{"Delete Device?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`This will delete ${systemName} permanently.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="default"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              const { status } = await axios.delete(
                `http://localhost:3000/devices/${id}`
              );
              if (status === 200) {
                setGetDataIndicator(true);
              }
              setOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
