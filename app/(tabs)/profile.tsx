import { ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useTranslation } from "@/hooks/use-translation";
import { useColors } from "@/hooks/use-colors";
import { useLanguage } from "@/lib/language-provider";
import { useThemeContext } from "@/lib/theme-provider";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useCallback, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const tr = useTranslation();
  const colors = useColors();
  const { language, setLanguage } = useLanguage();
  const { colorScheme, setColorScheme } = useThemeContext();
  const [userName, setUserName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  // Load user name from storage
  useEffect(() => {
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const saved = await AsyncStorage.getItem('userName');
      if (saved) {
        setUserName(saved);
      }
    } catch (error) {
      console.error('Failed to load user name:', error);
    }
  };

  const handleSaveName = async () => {
    try {
      if (tempName.trim()) {
        await AsyncStorage.setItem('userName', tempName);
        setUserName(tempName);
        setIsEditingName(false);
      }
    } catch (error) {
      console.error('Failed to save user name:', error);
    }
  };

  const handleEditName = () => {
    setTempName(userName);
    setIsEditingName(true);
  };

  const handleLanguageChange = useCallback(async () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    await setLanguage(newLanguage);
  }, [language, setLanguage]);

  const handleThemeChange = useCallback((theme: 'light' | 'dark') => {
    setColorScheme(theme);
  }, [setColorScheme]);

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">{tr('myProfile')}</Text>
          </View>

          {/* User Info Card - Editable */}
          {isEditingName ? (
            <View className="bg-surface rounded-3xl p-8 border border-border gap-6 shadow-sm">
              <View className="items-center">
                <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center border-2 border-primary/20 shadow-lg">
                  <Text className="text-5xl">👤</Text>
                </View>
              </View>
              <View className="gap-4">
                <View className="gap-2">
                  <Text className="text-sm text-muted font-bold ml-1 uppercase tracking-wider">{tr('enterName')}</Text>
                  <TextInput
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder={tr('enterName')}
                    placeholderTextColor={colors.muted}
                    className="bg-background border border-border rounded-2xl px-5 py-4 text-foreground text-lg"
                    autoFocus
                  />
                </View>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={handleSaveName}
                    className="flex-1 bg-primary rounded-2xl py-4 items-center shadow-md active:scale-95 transition-transform"
                  >
                    <Text className="text-white font-bold text-base">{tr('save')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsEditingName(false)}
                    className="flex-1 bg-surface border border-border rounded-2xl py-4 items-center active:scale-95 transition-transform"
                  >
                    <Text className="text-foreground font-bold text-base">{tr('close')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleEditName}
              className="bg-surface rounded-3xl p-6 border border-border flex-row items-center gap-5 active:opacity-90 shadow-sm"
            >
              <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center border-2 border-primary/20 shadow-inner">
                <Text className="text-4xl">👤</Text>
              </View>
              <View className="flex-1 gap-1">
                <Text className="text-xs text-primary font-bold uppercase tracking-widest">{tr('name')}</Text>
                <Text className="text-2xl font-bold text-foreground">{userName || tr('userName')}</Text>
                <View className="flex-row items-center gap-1">
                  <IconSymbol name="pencil" size={12} color={colors.muted} />
                  <Text className="text-xs text-muted">Нажмите, чтобы изменить</Text>
                </View>
              </View>
              <View className="bg-background p-2 rounded-full border border-border">
                <IconSymbol name="chevron.right" size={20} color={colors.muted} />
              </View>
            </TouchableOpacity>
          )}

          {/* Daily Goal */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-foreground">{tr('dailyGoal')}</Text>
              <Text className="text-2xl font-bold text-primary">2000</Text>
            </View>
            <Text className="text-xs text-muted">{tr('calories')}</Text>
          </View>

          {/* Settings */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">{tr('settings')}</Text>

            {/* Language Setting */}
            <TouchableOpacity
              onPress={handleLanguageChange}
              className="bg-surface rounded-xl p-4 border border-border flex-row items-center justify-between active:opacity-70"
            >
              <View className="flex-row items-center gap-3">
                <IconSymbol name="globe" size={24} color={colors.primary} />
                <Text className="text-base text-foreground">{tr('language')}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-semibold text-primary">
                  {language === 'ru' ? 'Русский' : 'English'}
                </Text>
                <IconSymbol name="chevron.right" size={20} color={colors.muted} />
              </View>
            </TouchableOpacity>

            {/* Theme Setting */}
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <Text className="text-base font-semibold text-foreground">{tr('theme')}</Text>
              
              <View className="flex-row gap-3">
                {/* Light Button */}
                <TouchableOpacity
                  onPress={() => handleThemeChange('light')}
                  className={`flex-1 rounded-lg py-3 items-center border-2 ${
                    colorScheme === 'light'
                      ? 'bg-primary border-primary'
                      : 'bg-surface border-border'
                  }`}
                >
                  <IconSymbol 
                    name="sun.max" 
                    size={24} 
                    color={colorScheme === 'light' ? 'white' : colors.primary}
                  />
                  <Text className={`text-sm font-semibold mt-2 ${
                    colorScheme === 'light' ? 'text-white' : 'text-foreground'
                  }`}>
                    {tr('lightTheme')}
                  </Text>
                </TouchableOpacity>

                {/* Dark Button */}
                <TouchableOpacity
                  onPress={() => handleThemeChange('dark')}
                  className={`flex-1 rounded-lg py-3 items-center border-2 ${
                    colorScheme === 'dark'
                      ? 'bg-primary border-primary'
                      : 'bg-surface border-border'
                  }`}
                >
                  <IconSymbol 
                    name="moon.stars" 
                    size={24} 
                    color={colorScheme === 'dark' ? 'white' : colors.primary}
                  />
                  <Text className={`text-sm font-semibold mt-2 ${
                    colorScheme === 'dark' ? 'text-white' : 'text-foreground'
                  }`}>
                    {tr('darkTheme')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* About */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-2 mt-auto">
            <Text className="text-base font-semibold text-foreground">{tr('aboutApp')}</Text>
            <Text className="text-sm text-muted">EasyCal - {tr('addFood')}</Text>
            <Text className="text-xs text-muted">{tr('version')}: 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
