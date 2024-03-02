import { Container, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; 
import MinimumSalary from "@naoMentem/factories/MinimumSalary";
import useDatesFromPath from "@naoMentem/hooks/useDatesFromPath";
import Chart from "@naoMentem/molecules/Chart";

export default function FoodBasket() {
    const { from, to } = useDatesFromPath();
    const minimumSalary: MinimumSalary = new MinimumSalary();
    const periodRecords = minimumSalary.get(from, to);

    console.log({ from, to, periodRecords })

    return (
        <Container maxWidth="lg">
            <Typography component="h1" variant="h3">SELIC</Typography>
            <Grid container spacing={2}>
                <Grid lg={8} md={6} sm={6}>
                    <Typography component="p">
                        A cesta básica de alimentos deve conter itens básicos para o sustento de uma família.
                        Normalmente ela contem itens como Arroz, Feijão, Açúcar, Sal, Óleo de soja, Café, e etc.
                    </Typography>

                    <Typography component="p">
                        Utilizaremos como índice de comparação o Salário mínimo e o cálculo para esta análise é [Valor da cesta básica] ÷ [Valor do salário mínimo] = [Percentual].
                    </Typography>

                    <Typography component="p">
                        Por exemplo: Se o salário mínimo é de R$980,00 e a cesta básica custa R$470,00, o percentual do valor é 47,95%
                    </Typography>

                    <Typography component="pre">
                        470,00 ÷ 980,00 = 47,95%
                    </Typography>
                </Grid>
            </Grid>

            <Chart 
                options={{
                    series: [
                        {
                            name: 'Salário mínimo',
                            data: periodRecords.toSeries(),
                            color: '#CC3F0C',
                        },
                    ],
                    xAxis: {
                        categories: periodRecords.toCategories(),
                    },
                    yAxis: {
                        title: {
                            text: 'Valor (R$)',
                        },
                    },
                }}
            />
        </Container>
    );
}