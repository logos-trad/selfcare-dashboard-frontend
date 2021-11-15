import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Product } from '../../../../model/Product';
import ActiveProductCard from './components/ActiveProductCard';
import TitleBox from './../TitleBox';

export default function ActiveProductsSection() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const buttonLabel = 'Gestisci il prodotto';
  const infoLabel = 'Ultimo servizio attivato: 24 Ottobre 2021'; // TODO: remove
  useEffect(() => {
    const activeProducts: Array<Product> = [
      {
        logo: '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',
        title: 'App IO',
        description: 'App IO description ',
        id: '1',
        authorized: true,
        active: true,
        urlBO: undefined,
        activationDateTime:new Date('3-3-2020'),
      },
      {
        logo: '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',
        id: '2',
        title: 'Piattaforma Notifiche',
        description: 'Piattaforma Notifiche description ',
        authorized: false,
        active: true,
        urlBO: undefined,
        activationDateTime:new Date(),
      },
      {
        logo: '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',
        id: '3',
        title: 'Pagamenti pagoPA',
        description: 'Pagamenti pagoPA description',
        authorized: true,
        tag: 'Vecchio Portale',
        active: true,
        urlBO: undefined,
        activationDateTime:new Date(),
      },
    ];
    setProducts(activeProducts);
  }, []);

  return (
    <React.Fragment>
      <TitleBox
        title="Prodotti attivi"
        subTitle="I prodotti PagoPA a cui il tuo Ente ha aderito."
        mbTitle={1}
        mtGrid={10}
        mbSubTitle={5}
        variantTitle="h2"
        variantSubTitle="body2"
      />
      <Grid container spacing={4}>
        {products &&
          products.map((product) => (
            <ActiveProductCard
              key={product.id}
              product={product}
              buttonLabel={buttonLabel}
              infoLabel={infoLabel}
            />
          ))}
      </Grid>
    </React.Fragment>
  );
}
