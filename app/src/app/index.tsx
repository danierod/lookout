import { Text, View } from 'react-native';

import { colors, type } from '@/theme/tokens';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
      }}>
      <Text
        style={{
          color: colors.text,
          fontSize: type.display.fontSize,
          fontWeight: type.display.fontWeight,
          lineHeight: type.display.lineHeight,
          letterSpacing: type.display.letterSpacing,
        }}>
        Lookout
      </Text>
    </View>
  );
}
