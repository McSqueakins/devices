import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import { types } from "./constants";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";

const InputRow = styled.div({
  display: "flex",
  justifyContent: "flex-start",
  margin: "24px 16px"
});

const TextFieldWithMargin = styled(TextField)({
  "&&": {
    marginLeft: "16px",
    width: "184px"
  }
});

export const EditDevice = ({ id, systemName, deviceType, hddCapacity }) => {
  const [open, setOpen] = useState(false);
  const [typeInput, setType] = useState(deviceType);
  const [systemNameInput, setSystemNameInput] = useState(systemName);
  const [hddCapacityInput, setHddCapacityInput] = useState(hddCapacity);

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>{"Edit Device"}</DialogTitle>
        <DialogContent>
          <InputRow>
            <TextFieldWithMargin
              required
              label="System Name"
              value={systemNameInput}
              onChange={e => {
                setSystemNameInput(e.target.value);
              }}
            />
            <TextFieldWithMargin
              required
              label="Type"
              select
              value={typeInput}
              onChange={e => {
                setType(e.target.value);
              }}
            >
              {Object.values(types).map(type => (
                <MenuItem key={type.typeName} value={type.typeName}>
                  {type.displayValue}
                </MenuItem>
              ))}
            </TextFieldWithMargin>
          </InputRow>
          <InputRow>
            <TextFieldWithMargin
              required
              label="HDD Capacity (GB)"
              type="number"
              value={hddCapacityInput}
              onChange={e => {
                setHddCapacityInput(e.target.value);
              }}
            />
          </InputRow>
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
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
