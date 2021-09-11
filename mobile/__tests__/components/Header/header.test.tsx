import React from 'react';

import { render } from '@testing-library/react-native';

import '@testing-library/jest-native/extend-expect';

import Header from '../../../src/components/Header';
import styles from '../../../src/components/Header/styles';

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

describe('The header', () => {
  it('must have the mandatory properties and those that are not', () => {
    const { getByTestId } = render(
      <Header title="Teste" fontSize={15} position={2} showIcon showStep/>
    );

    expect(getByTestId('headerTitle')).toHaveTextContent('Teste');
    expect(getByTestId('headerTitle')).toHaveStyle({fontSize: 15});
    expect(getByTestId('headerContainer')).toBeTruthy();
  });

  it('must have the same styles as the parent component', () => {
    const { getByTestId } = render(
      <Header title="Teste" fontSize={15} showIcon/>
    );

    expect(getByTestId('headerContainer')).toHaveStyle(styles.container);
    expect(getByTestId('headerButton')).toHaveStyle(styles.button);
    expect(getByTestId('headerTitle')).toHaveStyle(styles.title);
  });
});