import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import { useCommon } from "../../hooks/useCommon";
import { MenuItem, Menu, Divider, Tabs, Tab } from "@mui/material";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: "black",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const test = [
  {
    label: "test1",
    onclick: () => {
      console.log("hi");
    },
  },
  {
    label: "test2",
    onclick: () => {
      console.log("hi");
    },
  },
  {
    label: "test3",
    onclick: () => {
      console.log("hi");
    },
  },
];

const notificationTest = [
  {
    message: "test1",
    type: "assigned to a project",
    read: false,
    created_at: "07th March, 11:36",
    messageType: "projects",
  },
  {
    message: "test2",
    type: "updated project information",
    read: false,
    created_at: "07th March, 12:36",
    messageType: "projects",
  },
  {
    message: "test3",
    type: "assigned to a task",
    read: false,
    created_at: "07th March, 13:36",
    messageType: "tasks",
  },
  {
    message: "test4",
    type: "updated task information",
    read: false,
    created_at: "07th March, 14:36",
    messageType: "tasks",
  },
];

let unreadCount = 0;
notificationTest.forEach((notification) => {
  if (notification?.read == false) unreadCount++;
});
let notificationCount = unreadCount;
interface NavBarProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBar = ({ show, setShow }: NavBarProps) => {
  const [open, setOpen] = useState<boolean>(show);
  const [eTarget, setETarget] = useState<any>(null);
  const [typeSelected, setTypeSelected] = useState<string>("all");
  const { navigate } = useCommon();

  const notifications = notificationTest.map((notification) => {
    if (notification.read == false) {
      if (
        typeSelected.toLocaleLowerCase() == notification.messageType ||
        typeSelected.toLocaleLowerCase() == "all"
      ) {
        return (
          <>
            <MenuItem>
              {notification.message} {notification.type}
            </MenuItem>
            <Divider />
          </>
        );
      }
    }
  });

  const handleChange = (e: any) => {
    setTypeSelected(e.target.textContent);
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", bgcolor: "white" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              onClick={() => setShow(!show)}
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              color="black"
              component="div"
              mr="10px"
              sx={{ display: { sm: "block" } }}
            >
              Jira Clone
            </Typography>
            {test.map((link) => (
              <Button
                variant="text"
                onClick={link.onclick}
                sx={{ color: "black" }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <IconButton
              size="medium"
              onClick={(e: any) => {
                let target = eTarget;
                setETarget((prev: any) =>
                  prev === e.target ? null : e.target
                );
                setOpen((prev) => (e.target !== target ? true : false));
              }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              open={open}
              anchorEl={eTarget}
              onClose={() => {
                setOpen(false);
                setETarget(null);
              }}
            >
              <>
                <Box>
                  <Tabs
                    value={typeSelected}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={(e) => handleChange(e)}
                  >
                    <Tab value="All" label="All" />
                    <Tab value="Tasks" label="Tasks" />
                    <Tab value="Projects" label="Projects" />
                  </Tabs>
                </Box>
                {notifications}
              </>
            </Menu>
            <IconButton onClick={() => navigate("/user/update-profile")}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { NavBar };
