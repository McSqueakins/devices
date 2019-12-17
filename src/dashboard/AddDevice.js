import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { types } from "./constants";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { isEmpty } from "ramda";
import axios from "axios";

const InputRow = styled.div({
  display: "flex",
  justifyContent: "flex-start",
  margin: "24px 16px"
});

const TextFieldWithMarginAndWidth = styled(TextField)({
  "&&": {
    marginLeft: "16px",
    width: "184px"
  }
});

export const AddDevice = ({ setGetDataIndicator }) => {
  const [open, setOpen] = useState(false);
  const [typeInput, setTypeInput] = useState("");
  const [systemNameInput, setSystemNameInput] = useState("");
  const [hddCapacityInput, setHddCapacityInput] = useState("");

  const formValidator =
    isEmpty(typeInput) || isEmpty(systemNameInput) || isEmpty(hddCapacityInput);

  return (
    <>
      <Fab
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onExiting={() => {
          setHddCapacityInput("");
          setSystemNameInput("");
          setTypeInput("");
        }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>{"Add Device"}</DialogTitle>
        <DialogContent>
          <InputRow>
            <TextFieldWithMarginAndWidth
              required
              label="System Name"
              value={systemNameInput}
              onChange={e => {
                setSystemNameInput(e.target.value);
              }}
            />
            <TextFieldWithMarginAndWidth
              required
              label="Type"
              select
              value={typeInput}
              onChange={e => {
                setTypeInput(e.target.value);
              }}
            >
              {Object.values(types).map(type => (
                <MenuItem key={type.typeName} value={type.typeName}>
                  {type.displayValue}
                </MenuItem>
              ))}
            </TextFieldWithMarginAndWidth>
          </InputRow>
          <InputRow>
            <TextFieldWithMarginAndWidth
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
            onClick={async () => {
              const { status } = await axios.post(
                "http://localhost:3000/devices",
                {
                  system_name: systemNameInput,
                  type: typeInput,
                  hdd_capacity: hddCapacityInput
                }
              );
              if (status === 200) {
                setGetDataIndicator(true);
              }
              setOpen(false);
            }}
            color="primary"
            autoFocus
            disabled={formValidator}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
