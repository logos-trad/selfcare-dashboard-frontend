import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../../redux/store';
import { retrieveTokenExchange } from '../../../../../../services/tokenExchangeService';
import { mockedParties } from '../../../../../../services/__mocks__/partyService';
import { mockedPartyProducts } from '../../../../../../services/__mocks__/productService';
import ActiveProductCard from '../ActiveProductCard';

const oldWindowLocation = global.window.location;
const mockedLocation = {
  assign: jest.fn(),
  pathname: '',
  origin: 'MOCKED_ORIGIN',
  search: '',
  hash: '',
};

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

jest.mock('../../../../../../services/tokenExchangeService');

beforeEach(() => {
  jest.spyOn(require('../../../../../../services/tokenExchangeService'), 'retrieveTokenExchange');
});

const mockedProduct = Object.assign({}, mockedPartyProducts[0]);

const renderCard = (authorized: boolean, tag?: string, activationDateTime?: Date) => {
  mockedProduct.authorized = authorized;
  mockedProduct.tag = tag;
  mockedProduct.activationDateTime = activationDateTime;
  render(
    <Provider store={createStore()}>
      <ActiveProductCard party={mockedParties[0]} product={mockedProduct} />
    </Provider>
  );
};

const checkBaseFields = () => {
  screen.getByText(mockedProduct.title);
  return screen.getByText('Gestisci');
};

test('test render with optional text', () => {
  renderCard(false, 'PROVA TAG', new Date('2022-01-01'));

  const button = checkBaseFields();
  expect(button).toBeDisabled();

  screen.getByText('PROVA TAG');
  screen.getByText('Attivo dal 01 gennaio 2022');
});

test('test render and behavior', async () => {
  renderCard(true);

  const button = checkBaseFields();
  expect(button).toBeEnabled();

  screen.getByText('Attivo');

  fireEvent.click(button);

  await waitFor(() =>
    expect(retrieveTokenExchange).toBeCalledWith(
      'io.selfcare.pagopa.it',
      mockedParties[0],
      mockedProduct
    )
  );

  expect(mockedLocation.assign).toBeCalledWith(
    'https://io.selfcare.pagopa.it/path/acs?token=DUMMYTOKEN'
  );
});
