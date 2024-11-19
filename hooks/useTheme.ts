import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export const useTheme = () => {
  const theme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(theme === 'dark');

  const onChangeTheme = async (newTheme: ColorSchemeName) => {
    if (newTheme === theme) return;

    setIsDark(newTheme === 'dark');
    Appearance.setColorScheme(newTheme);
    useAsyncStorage('theme').setItem(JSON.stringify(newTheme));
  };

  useEffect(() => {
    (async () => {
      const themeFromStorage = await useAsyncStorage('theme').getItem();
      themeFromStorage && setIsDark(themeFromStorage === 'dark');
    })();
  }, []);

  return { isDark, onChangeTheme };
};
