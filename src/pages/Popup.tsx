import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { themeOptions } from "../App";
import { Card, CardContent, TextField } from "@mui/material";

// interface IPopupProps {
//   children: React.ReactNode;
// }
// const Popup: React.FC<IPopupProps> = ({ children }) => {

const Popup = () => {
  const theme = themeOptions;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [query, setQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputText);
  };

  React.useEffect(() => {
    const apiUrl = `smart-vents-api.azurewebsites.net/addVent?id=${query}`;

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          setIsRequestSuccessful(true);
        } else {
          setIsRequestSuccessful(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsRequestSuccessful(false);
      });
  }, [query]);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            display: "flex",
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            backgroundColor: themeOptions.palette.background.paper
          }}
        >
          <CardContent sx={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              color="text.secondary"
              component="div"
              sx={{
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center", // Vertically align content
                justifyContent: "space-between" // Add space between text and icon
              }}
            >
              Add Vent
              <IconButton
                onClick={handleClose}
                aria-label="close"
                sx={{
                  color: theme.palette.text.primary,
                  marginLeft: 1 // Add some spacing between text and icon
                }}
              >
                <CloseIcon sx={{ color: theme.palette.text.primary }} />
              </IconButton>
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default Popup;
