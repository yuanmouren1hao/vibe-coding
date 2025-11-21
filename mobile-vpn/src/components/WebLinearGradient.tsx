import React from 'react';
import {View, ViewStyle, StyleProp} from 'react-native';

interface LinearGradientProps {
  colors: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const WebLinearGradient: React.FC<LinearGradientProps> = ({
  colors,
  start = {x: 0, y: 0},
  end = {x: 0, y: 1},
  style,
  children,
}) => {
  // 计算渐变角度
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI) + 90;
  
  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
  };

  return (
    <View style={[style, gradientStyle as any]}>
      {children}
    </View>
  );
};

export default WebLinearGradient;
