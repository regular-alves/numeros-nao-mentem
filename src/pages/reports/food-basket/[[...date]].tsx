import { Box, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; 
import EssencialFoodBasket from "@naoMentem/factories/EssencialFoodBasket";
import EssencialFoodBasketAvg from "@naoMentem/factories/EssencialFoodBasketAvg";
import MinimumSalary from "@naoMentem/factories/MinimumSalary";
import Presidents from "@naoMentem/factories/Presidents";
import useDatesFromPath from "@naoMentem/hooks/useDatesFromPath";
import Chart from "@naoMentem/molecules/Chart";
import ChartSliderWithMap from "@naoMentem/molecules/ChartSliderWithMap";
import Sources from "@naoMentem/molecules/Sources";
import DateToString from "@naoMentem/utils/DateToString";

export default function FoodBasket() {
    const { from, to } = useDatesFromPath();

    const minimumSalary = new MinimumSalary();
    const essencialFoodBasketAvg = new EssencialFoodBasketAvg();
    const presidents = new Presidents();

    const minimumSalaryRecords = minimumSalary.getRecords().get(from, to);
    const foodBasketRecords = essencialFoodBasketAvg.getRecords().get(from, to);
    const presidentsRecords = presidents.getRecords().get(from, to);

    const minimumSalaryColor = '#CC3F0C';
    const foodBasketColor = '#33673B';
    const percentColor = '#2176AE';

    return (
        <Container maxWidth="lg">
            <Typography component="h2" variant="h2">Cesta Básica de alimentos</Typography>
            <Grid container spacing={2}>
                <Grid lg={12}>
                    <Typography component="p" mb={2}>
                        A cesta básica de alimentos deve conter itens básicos para o sustento de uma família.
                        Normalmente ela contem itens como Arroz, Feijão, Açúcar, Sal, Óleo de soja, Café, e etc.
                    </Typography>
                </Grid>
            </Grid>

            <Typography component="h3" variant="h3">Salário Mínimo vs. Cesta básica</Typography>

            <Box mb={2}>
                <Chart
                    key={`${DateToString(from)}-${DateToString(to)}`}
                    options={{
                        title: 'valor vs valor',
                        series: [
                            {
                                name: 'Salário mínimo',
                                data: minimumSalaryRecords.toSeries(),
                                color: minimumSalaryColor,
                            },
                            {
                                name: 'Cesta Básica',
                                data: foodBasketRecords.toSeries(),
                                color: foodBasketColor,
                            },
                        ],
                        xAxis: {
                            categories: minimumSalaryRecords.toCategories(),
                            plotBands: presidentsRecords.toPlotBands()
                        },
                        yAxis: {
                            title: {
                                text: 'Valor (R$)',
                            },
                        },
                    }}
                />

                <Sources
                    list={[
                        ...minimumSalary.getSources(),
                        ...essencialFoodBasketAvg.getSources(),
                    ]}
                />
            </Box>
            
            <Typography component="h3" variant="h3">Percentual Salário Mínimo/Cesta básica</Typography>
            
            <Grid container spacing={2}>
                <Grid lg={12}>
                    <Typography component="p" mb={2}>
                        Utilizaremos como índice de comparação o Salário mínimo e o cálculo para esta análise {`é `}
                        <b style={{ color: foodBasketColor }}>[Valor da cesta básica]</b>
                        {` ÷ `}
                        <b style={{ color: minimumSalaryColor }}>[Valor do salário mínimo]</b>
                        {` = `}
                        <b style={{ color: percentColor }}>[Percentual]</b>.
                    </Typography>

                    <Typography component="p" mb={2}>
                        Por exemplo: Se o
                        <b style={{ color: minimumSalaryColor }}> salário mínimo é de R$980,00</b> e a
                        <b style={{ color: foodBasketColor }}> cesta básica custa R$470,00</b>,
                        <b style={{ color: percentColor }}> o percentual do valor é 47,95%</b>
                    </Typography>
                </Grid>
            </Grid>

            <Chart
                key={`${DateToString(from)}-${DateToString(to)}-percent`}
                options={{
                    title: 'Porcentagem',
                    series: [
                        {
                            name: 'Porcentagem (%)',
                            data: minimumSalaryRecords.toSeries()
                                .map((salary, key) => {
                                    let foodBasketVal = 0;

                                    try {
                                        const record = foodBasketRecords.index(key);
                                        foodBasketVal = record.value;
                                    } catch(err) {}

                                    return foodBasketVal ? ((foodBasketVal / salary) * 100) : 0;
                                }),
                            color: percentColor
                        },
                    ],
                    xAxis: {
                        categories: minimumSalaryRecords.toCategories(),
                        plotBands: presidentsRecords.toPlotBands()
                    },
                    yAxis: {
                        title: {
                            text: 'Porcentagem (%)',
                        },
                    },
                    tooltip: {
                        valuePrefix: false
                    },
                }}
            />

            <Typography component="h3" variant="h3">Cesta Básica por Estado</Typography>

            <ChartSliderWithMap
                from={from}
                to={to}
                collection={new EssencialFoodBasket()}
                options={{
                    series: [{
                        name: 'Valor da cesta básica',
                        accessibility: {
                            point: {
                                valueDescriptionFormat: '{xDescription}, R${point.value}'
                            }
                        },
                        data: [],
                        joinBy: ['postal-code', 'code'],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            format: '{point.code}'
                        },
                        tooltip: {
                            pointFormat: '{point.code}: R${point.value}'
                        }
                    }]                    
                }}
            />
        </Container>
    );
}