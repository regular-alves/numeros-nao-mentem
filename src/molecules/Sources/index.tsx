import { Card, Link, Stack, Box, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import LaunchIcon from '@mui/icons-material/Launch';
import { Source } from "@naoMentem/dtos/Source";
import DateToString from "@naoMentem/utils/DateToString";

export type SourcesProps = {
  list: Source[];
}

export default function Sources({ list = [] }: SourcesProps) {
  return (
    <Stack spacing={2} direction="row" justifyContent="end" alignItems="flex-start">
      {list.map((item, k) => (
        <Card key={k} variant="outlined">
          <Box sx={{ p: 1 }}>
            <Stack spacing={0} direction="row" alignItems="start" justifyContent="space-between">
              {item.name}
              <Link href={item.url} target="_blank" pl={1}>
                <LaunchIcon />
              </Link>
            </Stack>
            {item.seenAt && (
              <>
                <Divider />
                <Typography variant="overline" align="center">
                  Acessado em:
                  {DateToString(item.seenAt)}
                </Typography>
              </>
            )}
          </Box>
        </Card>
      ))}
    </Stack>
  );
}