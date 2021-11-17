import { Card, Grid,Box,Typography } from '@mui/material';
import { Product } from '../../../../../model/Product';
import BaseProductCard from '../../productCard/BaseProductCard';
import { formatDateAsLongString } from './../../../../../utils/utils';

type Props={
    product: Product;
    buttonLabel:string;
    infoLabel: Date;
};
export default function ActiveProductCard({product,buttonLabel,infoLabel}: Props) {
    const isDisabled = product.authorized === false;
    return (
      <Grid item xs={6}>
        <Card sx={{ height: '359px', boxShadow:'0px 0px 80px rgba(0, 43, 85, 0.1)'}}>
          <Box mx={8} my={5}>
            <BaseProductCard
              disableBtn={isDisabled}
              cardTitle={product.title}
              cardSubTitle={`Attivo da ${product.activationDateTime && formatDateAsLongString(product.activationDateTime)}`}
              buttonLabel={buttonLabel}
              logoCard={product.logo}
              tag={product.tag}
              btnAction={() => product.urlPublic && window.location.assign(product.urlPublic)}
            />
            <Typography variant='h5' sx={{fontSize:'16px'}} mx={1}>{`Ultimo servizio attivato: ${infoLabel && formatDateAsLongString(infoLabel)}`}</Typography>
          </Box>
        </Card>
      </Grid>
    );
  
}