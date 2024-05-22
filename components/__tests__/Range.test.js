import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import Range from '../Range';

jest.mock('axios');

const mockStore = configureStore([]);
const mockRangeData = { min: 1, max: 100 };
const mockRangeValues = { values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] };

describe('Range Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      range: {
        min: 1,
        max: 100,
        rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
        selectedRange: { min: 1, max: 100 }
      }
    });
  });

  test('fetches and displays normal range data', async () => {
    axios.get.mockResolvedValueOnce({ data: mockRangeData });

    render(
      <Provider store={store}>
        <Range mode="normal" />
      </Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/range');
      expect(screen.getByDisplayValue('1.00')).toBeInTheDocument();
      expect(screen.getByDisplayValue('100.00')).toBeInTheDocument();
    });
  });

  test('fetches and displays fixed range values', async () => {
    axios.get.mockResolvedValueOnce({ data: mockRangeValues });

    render(
      <Provider store={store}>
        <Range mode="fixed" />
      </Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/rangeValues');
      mockRangeValues.values.forEach(value => {
        expect(screen.getByText(`${value.toFixed(2)} €`)).toBeInTheDocument();
      });
    });
  });
});
