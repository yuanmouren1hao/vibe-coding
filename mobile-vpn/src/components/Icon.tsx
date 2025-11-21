import React from 'react';
import { Platform } from 'react-native';

// Web环境使用@expo/vector-icons
let MaterialCommunityIcons: any;

if (Platform.OS === 'web') {
  try {
    MaterialCommunityIcons = require('@expo/vector-icons').MaterialCommunityIcons;
  } catch (e) {
    // Fallback to a simple div
    MaterialCommunityIcons = ({ name, size, color, style }: any) => (
      <div style={{ width: size, height: size, ...style }}>
        {name}
      </div>
    );
  }
} else {
  MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons').default;
}

export default MaterialCommunityIcons;
