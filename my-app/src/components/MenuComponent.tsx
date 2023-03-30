import { Menu } from "@mui/material";

interface MenuProps {
  menuOptions: any[];
  handleMenuClose: () => void;
  anchorEl: any;
}
export const MenuComponent = ({
  menuOptions,
  handleMenuClose,
  anchorEl,
}: MenuProps) => (
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
    {menuOptions}
  </Menu>
);
