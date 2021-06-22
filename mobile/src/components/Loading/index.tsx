import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
    <ActivityIndicator 
      size="large"
      color="#333"
      animating
      style={{ justifyContent: 'center', alignItems: 'center' }}
    />
  );
};