// __tests__/ReactNativePaper.test.ts
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReactNativePaper from '../../../app/DesignInterface/ReactNativePaper';

test('ReactNativePaper renderButton generates button correctly', () => {
  const design = new ReactNativePaper();
  const onPressMock = jest.fn();
  const { getByText } = render(design.renderButton(onPressMock, 'Click me') as React.ReactElement);

  fireEvent.press(getByText('Click me'));
  expect(onPressMock).toHaveBeenCalled();
});

test('ReactNativePaper renderCard generates card correctly', () => {
  const design = new ReactNativePaper();
  const { getByText } = render(design.renderCard('Title', 'Content') as React.ReactElement);

  expect(getByText('Title')).toBeDefined();
  expect(getByText('Content')).toBeDefined();
});
