import React, { ReactNode, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { themeOptions } from "../App";

const StyledMenu = (props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    {...props}
  />
);

interface IDropdownProps {
  name: string;
  children: React.ReactNode;
  sx?: any;
}

const Dropdown: React.FC<IDropdownProps> = (props) => {
  const theme = themeOptions;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          color: theme.palette.text.primary,
          ...props.sx
        }}
        onClick={handleClick}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center"
        }}
      >
        {props.name}
        <KeyboardArrowDownIcon />
      </Typography>

      <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {props.children}
      </Menu>
    </div>
  );
};

export default Dropdown;
