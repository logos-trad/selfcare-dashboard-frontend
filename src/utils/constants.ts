const IS_DEVELOP = process.env.NODE_ENV === 'development';

export const MOCK_USER = IS_DEVELOP;
export const LOG_REDUX_ACTIONS = IS_DEVELOP;

export const URL_FE_LOGIN: string = `${process.env.REACT_APP_URL_FE_LOGIN}?onSuccess=dashboard`;
export const URL_FE_LOGOUT: string = process.env.REACT_APP_URL_FE_LOGOUT;
export const URL_FE_ONBOARDING: string = process.env.REACT_APP_URL_FE_ONBOARDING;
export const URL_FE_LANDING: string = process.env.REACT_APP_URL_FE_LANDING;

export const STORAGE_KEY_USER = 'user';
export const STORAGE_KEY_TOKEN = 'token';

export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';
export const LOADING_TASK_SEARCH_PARTIES = 'SEARCH_PARTIES';
export const LOADING_TASK_SEARCH_PARTY = 'SEARCH_PARTY';
export const LOADING_TASK_SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

export const roleLabels: { [key: string]: string } = {
  ADMIN: 'Amministratore',
  ADMIN_REF: 'Referente Amministrativo',
  TECH_REF: 'Referente Tecnico',
};