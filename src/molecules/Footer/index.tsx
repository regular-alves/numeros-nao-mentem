import { Container, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; 

export default function Footer() {
    return (
        <footer>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid xs={8}>
                        <Typography>
                            Todos os direitos reservados - Números não mentem &copy;{' '}
                            {new Date().getFullYear()}
                        </Typography>
                    </Grid>
                    <Grid xs={4}>
                        Menu goes here
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}