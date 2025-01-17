import { TouchableOpacity, Text } from 'react-native';
import { Card } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '../../theme';
import UseTheme from '../../hooks/useTheme';

const QuickActionButton = ({ onPress, iconName, text }) => (
  <TouchableOpacity onPress={onPress} style={styles().container}>
    <Card style={styles().card}>
      <MaterialIcons
        name={iconName}
        size={24}
        color={theme.colors.iconColor}
        style={styles().icon}
      />
      <Text style={styles().text}>{text}</Text>
    </Card>
  </TouchableOpacity>
);

const styles = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  return StyleSheet.create({
    container: {
      // flex: 1,
      marginRight: 10,
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      // backgroundColor: theme.colors.secondaryBlue,
      backgroundColor: currentTheme.colors.primary,
    },
    icon: {
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      color: currentTheme.colors.iconColor,
    },
  });
};

export default QuickActionButton;
