import { Box, Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; 
import Image from "next/image";
import Link from "next/link";

import style from './style.module.css';

export default function Header() {
    return (
        <header>
            <Container maxWidth="lg">
                <Grid container spacing={2} alignItems="center">
                    <Grid xs={4}>
                        <Link href="/">
                            <Image
                                src="./logo.svg"
                                alt="Números Não Mentem"
                                width={470}
                                height={80}
                                className={style['Header-logo']}
                            />
                        </Link>
                    </Grid>
                    <Grid xs={8}>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Link href="/food">Alimentação</Link>
                            <Link href="/deforestation">Desmatamento</Link>
                            <Link href="/economy">Economia</Link>
                            <Link href="/compare-presidents">Comparar Presidentes</Link>
                            <Link href="/compare-presidents">Contato</Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
}