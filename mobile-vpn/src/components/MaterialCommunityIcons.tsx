import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Web平台使用Unicode图标映射
const iconMap: Record<string, string> = {
  // 导航图标
  'home': '🏠',
  'home-outline': '🏠',
  'server-network': '🌐',
  'link-variant': '🔗',
  'account': '👤',
  'account-outline': '👤',
  
  // 操作图标
  'play': '▶️',
  'stop': '⏹️',
  'power': '⚡',
  'shield-check': '✅',
  'shield-lock': '🔒',
  
  // 状态图标
  'check-circle': '✅',
  'alert-circle': '⚠️',
  'close-circle': '❌',
  
  // 其他图标
  'plus': '➕',
  'delete': '🗑️',
  'refresh': '🔄',
  'qrcode-scan': '📷',
  'chevron-right': '›',
  'eye': '👁️',
  'eye-off': '🙈',
  'lock': '🔒',
  'email': '✉️',
  'account-box': '👤',
  
  // 设置图标
  'cog': '⚙️',
  'translate': '🌐',
  'theme-light-dark': '🌓',
  'bell': '🔔',
  'wifi': '📶',
  'dns': '🌐',
  'apps': '📱',
  'information': 'ℹ️',
  'logout': '🚪',
  
  // 流量图标
  'upload': '⬆️',
  'download': '⬇️',
  'speedometer': '📊',
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle | TextStyle;
}

const MaterialCommunityIcons: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#000', 
  style 
}) => {
  const icon = iconMap[name] || '●';
  
  return (
    <Text 
      style={[
        styles.icon, 
        { 
          fontSize: size * 0.8, // Unicode图标通常偏大
          color,
          lineHeight: size,
        }, 
        style
      ]}
    >
      {icon}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
});

export default MaterialCommunityIcons;
