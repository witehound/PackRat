import { Box } from 'native-base';
import { Text } from 'react-native';
import { theme } from '../../theme';
import UseTheme from '../../hooks/useTheme';

export default function Footer() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  const year = new Date().getFullYear();
  return (
    <Box
      style={{
        width: '100%',
        textAlign: 'center',
        backgroundColor: currentTheme.colors.card,
        padding: 15,
        alignSelf: 'center',
      }}
    >
      <Text
        style={{
          color: currentTheme.colors.textColor,
          fontSize: currentTheme.font.size,
          textAlign: 'center',
        }}
      >
        Copyright &copy; {year}
      </Text>
    </Box>
  );
}
