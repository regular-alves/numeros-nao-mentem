import { Container, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; 
import useDatesFromPath from "@naoMentem/hooks/useDatesFromPath";

export default function MinimumSalary() {
    const { from, to } = useDatesFromPath();

    return (
        <Container maxWidth="lg">
            <Typography component="h1" variant="h3">SELIC</Typography>
            <Grid container spacing={2}>
                <Grid lg={8} md={6} sm={6}>
                    <Typography component="p">
                        SELIC é a sigla para Sistema Especial de Liquidação e de Custódia. Este sistema é uma infraestrutura do mercado financeiro administrada pelo Banco Central e nele são transacionados títulos públicos federais.
                    </Typography>

                    <Typography component="p">
                        A Selic é a taxa básica de juros da economia. É o principal instrumento de política monetária utilizado pelo Banco Central para controlar a inflação. Ela influencia todas as taxas de juros do país, como as taxas de juros dos empréstimos, dos financiamentos e das aplicações financeiras.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}