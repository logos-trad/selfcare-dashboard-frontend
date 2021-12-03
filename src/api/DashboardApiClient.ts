import { storageRead } from '../utils/storage-utils';
import { STORAGE_KEY_TOKEN } from '../utils/constants';
import { createClient, WithDefaultsT } from './generated/b4f-dashboard/client';
import { buildFetchApi, extractResponse } from './api-utils';
import { InstitutionResource } from './generated/b4f-dashboard/InstitutionResource';
import { ProductsResource } from './generated/b4f-dashboard/ProductsResource';
import { mockedInstitutionResources } from './__mocks__/DashboardApiClient';

const dashboardBaseUrl = process.env.REACT_APP_URL_API_DASHBOARD;
const dashboardTimeoutMs = process.env.REACT_APP_API_DASHBOARD_TIMEOUT_MS;

const withBearerAndInstitutionId: WithDefaultsT<'bearerAuth'> =
  (wrappedOperation) => (params: any) => {
    const token = storageRead(STORAGE_KEY_TOKEN, 'string');
    return wrappedOperation({
      ...params,
      bearerAuth: `Bearer ${token}`,
    });
  };

const apiClient = createClient({
  baseUrl: dashboardBaseUrl,
  basePath: '',
  fetchApi: buildFetchApi(dashboardTimeoutMs),
  withDefaults: withBearerAndInstitutionId,
});

export const DashboardApi = {
  getInstitutions: async (): Promise<Array<InstitutionResource>> =>
    //    const result = await apiClient.getInstitutionsUsingGET(); TODO
    //    return extractResponse(result, 200);
    new Promise((resolve) => resolve(mockedInstitutionResources)),
  getInstitution: async (institutionId: string): Promise<InstitutionResource> => {
    const result = await apiClient.getInstitutionUsingGET({
      institutionId,
      'x-selc-institutionId': institutionId,
    });
    return extractResponse(result, 200);
  },
  getProducts: async (institutionId: string): Promise<Array<ProductsResource>> => {
    const result = await apiClient.getProductsUsingGET({ 'x-selc-institutionId': institutionId });
    return extractResponse(result, 200);
  },
  uploadLogo: async (institutionId: string, logo: File): Promise<boolean> => {
    const result = await apiClient.saveInstitutionLogoUsingPUT({
      'x-selc-institutionId': institutionId,
      institutionId,
      logo,
    });
    return extractResponse(result, 200);
  },
  getTokenExchange: async (
    hostname: string,
    institutionId: string,
    productId: string
  ): Promise<string> => {
    const result = await apiClient.exchangeUsingGET({
      'x-selc-institutionId': institutionId,
      productCode: productId,
      realm: hostname,
    });
    return extractResponse(result, 200);
  },
};
