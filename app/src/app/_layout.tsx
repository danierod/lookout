import { Stack } from 'expo-router/stack';

import { colors } from '@/theme/tokens';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
