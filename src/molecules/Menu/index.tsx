import { Box, Link, SxProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const menuItemSx: SxProps = {
  minWidth: 100,
  padding: '0 10px',
  textDecoration: 'none',
}

const menuListSx: SxProps = {
  minWidth: 100,
  padding: '0 10px',
  textDecoration: 'none',
}

type MenuListProps = {
  item: string | JSX.Element | JSX.Element[];
  list: string | JSX.Element | JSX.Element[];
}

const MenuList = ({ item, list }: MenuListProps) => {
  const [onHover, setOnHover] = useState<boolean>(false);

  return (
    <Box
      sx={menuListSx}
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
    >
      {item}
      <Box
        sx={{
          display: onHover ? "flex" : "none",
          flexDirection: "column",
          position: "absolute",
          padding: "8px 0",
          background: "#fff",
          boxShadow: "0px 0px 15px 0px rgba(0,0,0,.12)",
        }}
      >
        {list}
      </Box>
    </Box>
  );
}

const Menu = () => {
  

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
      <MenuList
        item={<Link sx={menuItemSx} href="/reports/food">Alimentação</Link>}
        list={(
          <>
            <Link sx={menuItemSx} href="/reports/food-basket">Cesta Básica</Link>
            <Link sx={menuItemSx} href="/reports/alimentar-insecurity">Insegurança Alimentar</Link>
          </>
        )}
      />
      <Link sx={menuItemSx} href="/reports/deforestation">Desmatamento</Link>
      <MenuList
        item={<Link sx={menuItemSx} href="/reports/economy">Economia</Link>}
        list={(
          <>
            <Link sx={menuItemSx} href="/reports/selic">SELIC</Link>
            <Link sx={menuItemSx} href="/reports/unemployee">Desemprego</Link>
          </>
        )}
      />
      <Link sx={menuItemSx} href="/reports/compare-presidents">Comparar Presidentes</Link>
      <Link sx={menuItemSx} href="/reports/compare-presidents">Contato</Link>
    </Box>
  );
}

export default Menu