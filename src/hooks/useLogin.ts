import isEmpty from 'lodash/isEmpty';
import { storageDelete, storageRead, storageWrite } from '../utils/storage-utils';
import { MOCK_USER, STORAGE_KEY_TOKEN, STORAGE_KEY_USER, URL_FE_LOGIN } from '../utils/constants';
import { useAppDispatch } from '../redux/hooks';
import { User } from '../model/User';
import { userActions } from '../redux/slices/userSlice';

const testToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.cjofRJljHPptEu582E3kGOfpEE7pAOHstapX2qXvTz4fNCi7tKyfXt8c7wOvSD4ZH6MxktWy9qmvup2H1M4QnA-BGr3_7PTf73aR0j6q7eFhQ1TX_0o_JBDSdN4atrcNzqQT4y1UW5hGinu7BxwPEwx6aK_tysCRDdzdTa3aab5AFOvB0-UBor1VRF5QZTXWZCAVTSvtum4cRtMuMNqBi-QQ0HZoW4sE6A7EJbtHsTA5HmxmPD-cEVeXSHNwCBikWpc8aDIN_GSc5ZvRXIvd8mu83npHDhRw5EmP-xkHnDjldYZY9H2uIQVY-dq18iTAjZhoF_wnIQSU0H3KSDEdHg';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const setUser = (user: User) => dispatch(userActions.setLoggedUser(user));

  const attemptSilentLogin = async () => {
    if (MOCK_USER) {
      setUser({
        uid: '0',
        taxCode: 'AAAAAA00A00A000A',
        name: 'loggedName',
        surname: 'loggedSurname',
        email: 'loggedEmail@aa.aa',
      });
      storageWrite(STORAGE_KEY_TOKEN, testToken, 'string');
      return;
    }

    const sessionStorageUser = storageRead(STORAGE_KEY_USER, 'object');

    // If there are no credentials, it is impossible to get the user, so
    if (isEmpty(sessionStorageUser)) {
      // Remove any partial data that might have remained, just for safety
      storageDelete(STORAGE_KEY_USER);
      // Go to the login view
      window.location.assign(URL_FE_LOGIN);
      // This return is necessary
      return;
    }

    // Otherwise, set the user to the one stored in the storage
    setUser(sessionStorageUser);
  };

  return { attemptSilentLogin };
};