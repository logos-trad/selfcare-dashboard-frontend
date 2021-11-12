import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Product } from '../../model/Product';
import ActiveProductsSection from './components/activeProductsSection/ActiveProductsSection';
import NotActiveProductsSection from './components/notActiveProductsSection/NotActiveProductsSection';
import WelcomeDashboard from './components/welcomeDashboard/WelcomeDashboard';

export default function Dashboard() {
  const [products, setProducts] = useState<Array<Product>>([]);
  useEffect(() => {
    const activeProducts: Array<Product> = [
      {
        logo: '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',
        title: 'Check-IBAN',
        description: "Verifica l'abbinamento di un IBAN ad un CF di un cittadino o di un'impresa.",
        id: '1',
        authorized: true,
        active: true,
        urlPublic: 'http://www.google.it',
      },
      {
        logo: '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',
        id: '2',
        title: 'Carta Giovani',
        description: 'Richiedi la convenzione e gestisci i dati e le agevolazioni da offrire.',
        authorized: true,
        active: true,
        urlPublic: undefined,
      },
      {
        logo: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAYAAABhNaJ7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARcSURBVHgB7ZtbUtswFIZ/2WHoW/Pau7uClhUAK4CuoHQFhMs78B4grKCwAmAFSVcAXQHucHtNnzpAbPVIJrEdsCxHcepO9M0kM4p1Eh9Z0jm/DjAIGpcLcJiHLFjYRRCco/XRx/9A46IOZ2ZZ2Uf4tPv+hGH9Zh8MDeTjI7ibo0Hooups3FzQu6fR88TRdB7RF9Y+o+ps0mzWc16w7GDKYTRdeNzi5wj5Qdx2lug9uZY64MxHlWGsDoTJez4BD0/j684WEjOkljLmrIu9N4eD9vq1R1+Y/LIFGiRUm6H74/wn9t4eDtobt1/pQ6/fnPolMPUDUCvWnX9BcH+OKuPM0DJ1vut2LzYAASUPVU+GNi99FNim7B6AKafgHpCBzL1frFJWsfIYYihddjoIHg7QeteRWsOtUfzlIpOsU79zcOcQwZ9T2VdlWzLmA9C49eDydjK2QjgpkhHXXaa426FrC6n4zEEDEbbgzj6m4Rm267fb2Hu1gxIxXwLSeVXuLZzPxIPKlvFtEmu6WmUkis0Ah32m6Zxo1+aHnp6Aprec5t4z39CV10VG+TxPbRm26Df1Qy+f+UQzSLt7sQFgzj7c1K8NXccamq9bck9wZ4+RdJSTnA4f5fTGNaXX7FjTltpuG9roOy8YZxTwpQMC4SQPj9KXw53BWcLumxPy2Ne3LY9xDoBHT88btJg7n7rKWNwWG2d66ahtS6RoKnxIU/nXoBk5tTBou7NtUpBH5MCnIUkqOq/Q1Bc29IT50+MqlS3n+pGAOR/IYEW3e9FU+CgVm6MQeAYZuiRCPm9lr0MahOw0NcM2PCA5uw1dxIkQd1d0u5stgdYryrvDNZQGHdAED9soEfM9QBw2sGARUXhL0qU4voOAfZRPMQqBSTrSTml7v1j2Iex4UuGmXBZzcknUeh56tM7x4CduviFf0YEl0Ov5Q6pSZVsq4xmAPmJJiJCWRVOR2+fZloSVw5hyxrsEsjCRwyrbMZxOlT8DNm+3olxeqsIoX4jlcJteZ1L1xZlhXw63SUq3lbbJ7HFEyh2A9StKfIRzmXgwkdLRINRhgJkcziOqwiQpLofVthQ6Z4Vcjis/k5XDBRhdDqttOeUXrps4NPl3cjgHEzmstDVicgNgIofVtkaYyeE8pLobNEaXw2rbDn32I+46STmcx8YV7dDOavzBKHJYadtFcPctlQ9MVA7nEUnZ8mqJQoobJkPlDoDYuIK7xdHlcI6UTtb9R6T8VDjavU3kcJ6tEZPRAn1M5HCznDKZlcOYcmx1GKbY6rCtDntDvWx12FaHbXUYtjpsq8PP352tDhfDVodtdbhsbHUYU46Vw4V6u+4xqbuJrM2R4YM3LYruARTvuVExsmrYJTDUrqdycoe9HJpNPqpPHXFmGvmg+DuC9D9O5hFQ0jKBYyojolRYWz7bMIhCpSvK4KpOryf80YtUdEjDIkUXNMBprahwSAk2Kz79+4gTJ44lZR/Gf5PQav0Fqlrm22X6B50AAAAASUVORK5CYII=',
        id: '3',
        title: 'PDND',
        description: 'Condividi dati con altri Enti in maniera semplice, sicura ed economica.',
        authorized: true,
        active: false,
        urlPublic: undefined,
      },
    ];
    setProducts(activeProducts);
  }, []);
  return (
    
    <Box mb={6} px={10}>
      <WelcomeDashboard />
      <ActiveProductsSection />
      {products && products.findIndex((product) => product.active === false) > -1 && (
        <NotActiveProductsSection />
      )}
    </Box>

  );
}
