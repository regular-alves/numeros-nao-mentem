import { Container, Link } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; 
import Image from "next/image";
import Menu from "@naoMentem/molecules/Menu";

import style from './style.module.css';

export default function Header() {
    return (
        <header>
            <Container maxWidth="lg">
                <Grid container spacing={2} py={3} alignItems="center" justifyContent="space-between">
                    <Grid xs={4}>
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="Números Não Mentem"
                                width={470}
                                height={80}
                                className={style['Header-logo']}
                            />
                        </Link>
                    </Grid>
                    <Grid>
                        <Menu />
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
}