import { Button, Grid, Typography } from '@mui/material';
import { ReactComponent as ErrorIllustration } from '../../../assets/error-illustration.svg';

type Props = {
  description?: string;
};

export default ({ description }: Props) => (
  <Grid container direction="column" key="0" style={{ textAlign: 'center' }}>
    <Grid container item justifyContent="center" mt={5}>
      <Grid item xs={6}>
        <ErrorIllustration />
      </Grid>
    </Grid>
    <Grid container item justifyContent="center" mt={5}>
      <Grid item xs={6}>
        <Typography variant="h2">Spiacenti, qualcosa è andato storto.</Typography>
      </Grid>
    </Grid>
    <Grid container item justifyContent="center" mb={7} mt={1}>
      <Grid item xs={6}>
        <Typography>
          {description ??
            'A causa di un errore del sistema non è possibile completare la procedura.'}
        </Typography>
      </Grid>
    </Grid>
    <Grid container item justifyContent="center">
      <Grid item xs={4}>
        <Button
          variant="contained"
          sx={{ width: '200px', alignSelf: 'center' }}
          onClick={() => null /* TODO */}
        >
          Contatta l&quot;assistenza
        </Button>
      </Grid>
    </Grid>
  </Grid>
);