import React from 'react';

import { render } from '@testing-library/react-native';

import '@testing-library/jest-native/extend-expect';

import SucessScreen from '../../../src/components/SucessScreen';
import styles from '../../../src/components/SucessScreen/styles';

describe('The sucess screen', () => {
  it('must have the same style and properties defined in the component.', () => {
    const { getByTestId } = render(<SucessScreen title="Teste" show/>);

    const sucessScreen = render(<SucessScreen title="Teste" show/>);

    expect(sucessScreen.container.props.show).toBeTruthy();
    expect(getByTestId('sucessScreenContainer')).toHaveStyle(styles.container);
    expect(getByTestId('sucessScreenTitle')).toHaveStyle(styles.text);
    expect(getByTestId('sucessScreenTitle')).toHaveTextContent('Teste');
  });
});