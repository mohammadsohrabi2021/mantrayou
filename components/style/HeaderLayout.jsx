import { InputBase, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "4px",
  backgroundColor: "#ffffff",
  marginLeft: theme.spacing(0),
  marginRight: theme.spacing(10),
  width: "100%",
  border: "1px solid #d5d8dc",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 5, 1, 6),
    width: "100%",
  },
}));

export const MenuItem = styled("li")(({ theme, active }) => ({
  cursor: "pointer",
  color: active ? "#ff0000" : "#000",
  borderBottom: active ? "3px solid #ff0000" : "3px solid transparent",
  transition: "border-bottom 300ms ease-in-out",
  "&:hover": {
    borderBottom: "3px solid #ff0000",
  },
}));

export const ListItemStyled = styled(ListItem)(({ theme, active }) => ({
  backgroundColor: active ? "#f0f0f0" : "transparent",
  transition: "background-color 300ms ease-in-out",
  textAlign: "right",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
}));
