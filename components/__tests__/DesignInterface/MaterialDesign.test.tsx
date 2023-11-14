// __tests__/MaterialDesign.test.ts
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MaterialDesign from '../../../app/DesignInterface/MaterialDesign';

test('MaterialDesign renderButton generates button correctly', () => {
  const design = new MaterialDesign();
  const onPressMock = jest.fn();
  const { getByText } = render(design.renderButton(onPressMock, 'Click me') as React.ReactElement) as { getByText: (text: string) => HTMLElement };

  fireEvent.press(getByText('Click me'));
  expect(onPressMock).toHaveBeenCalled();
});

test('MaterialDesign renderCard generates card correctly', () => {
  const design = new MaterialDesign();
  const { getByText } = render(design.renderCard('Title', 'Content') as React.ReactElement);

  expect(getByText('Title')).toBeDefined();
  expect(getByText('Content')).toBeDefined();
});
