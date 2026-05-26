import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useTranslation } from '@/hooks/use-translation';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Mock food database for demo
const MOCK_FOODS = [
  { name: 'Курица с рисом', calories: 450, protein: 35, fat: 12, carbs: 45 },
  { name: 'Паста Болоньезе', calories: 520, protein: 28, fat: 18, carbs: 62 },
  { name: 'Салат Цезарь', calories: 380, protein: 22, fat: 20, carbs: 28 },
  { name: 'Пицца Маргарита', calories: 680, protein: 25, fat: 28, carbs: 78 },
  { name: 'Стейк с овощами', calories: 620, protein: 48, fat: 32, carbs: 18 },
  { name: 'Омлет с беконом', calories: 420, protein: 32, fat: 28, carbs: 8 },
  { name: 'Суши ролл', calories: 280, protein: 12, fat: 8, carbs: 42 },
  { name: 'Бургер', calories: 580, protein: 28, fat: 32, carbs: 52 },
];

export default function CameraScreen() {
  const colors = useColors();
  const tr = useTranslation();
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognizedFood, setRecognizedFood] = useState<typeof MOCK_FOODS[0] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleTakePhoto = async () => {
    try {
      setIsAnalyzing(true);
      
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Randomly select a food from mock database
      const randomFood = MOCK_FOODS[Math.floor(Math.random() * MOCK_FOODS.length)];
      setRecognizedFood(randomFood);
      setShowResults(true);
      
    } catch (error) {
      console.error('Failed to analyze food:', error);
      Alert.alert('Ошибка', 'Не удалось проанализировать фото');
      setIsAnalyzing(false);
    }
  };

  const handleAddToDiary = () => {
    if (recognizedFood) {
      // Navigate back to home with meal data
      router.push({
        pathname: '/',
        params: {
          mealName: recognizedFood.name,
          calories: recognizedFood.calories,
          protein: recognizedFood.protein,
          fat: recognizedFood.fat,
          carbs: recognizedFood.carbs,
        },
      });
    }
  };

  if (showResults && recognizedFood) {
    return (
      <ScreenContainer className="p-4">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="gap-4">
            {/* Header */}
            <View className="flex-row items-center gap-3 mb-2">
              <TouchableOpacity onPress={() => setShowResults(false)}>
                <IconSymbol name="chevron.left" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-foreground flex-1">Результат анализа</Text>
            </View>

            {/* Food Image Placeholder */}
            <View className="w-full h-64 bg-surface rounded-2xl items-center justify-center border-2 border-border">
              <IconSymbol name="camera.fill" size={64} color={colors.muted} />
            </View>

            {/* Food Name */}
            <View className="bg-surface rounded-2xl p-4 gap-2">
              <Text className="text-sm text-muted">Блюдо</Text>
              <Text className="text-2xl font-bold text-foreground">{recognizedFood.name}</Text>
            </View>

            {/* Calories */}
            <View className="bg-primary/10 rounded-2xl p-4 border-l-4 border-primary">
              <Text className="text-sm text-muted mb-1">Калорийность</Text>
              <View className="flex-row items-baseline gap-2">
                <Text className="text-4xl font-bold text-primary">{recognizedFood.calories}</Text>
                <Text className="text-lg text-muted">ккал</Text>
              </View>
            </View>

            {/* Macronutrients */}
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">Макронутриенты</Text>
              
              <View className="flex-row gap-3">
                <View className="flex-1 bg-surface rounded-xl p-3 items-center">
                  <Text className="text-xs text-muted mb-1">Белки</Text>
                  <Text className="text-xl font-bold text-foreground">{recognizedFood.protein}г</Text>
                </View>
                <View className="flex-1 bg-surface rounded-xl p-3 items-center">
                  <Text className="text-xs text-muted mb-1">Жиры</Text>
                  <Text className="text-xl font-bold text-foreground">{recognizedFood.fat}г</Text>
                </View>
                <View className="flex-1 bg-surface rounded-xl p-3 items-center">
                  <Text className="text-xs text-muted mb-1">Углеводы</Text>
                  <Text className="text-xl font-bold text-foreground">{recognizedFood.carbs}г</Text>
                </View>
              </View>
            </View>

            {/* Confidence Note */}
            <View className="bg-warning/10 rounded-xl p-3 border border-warning">
              <Text className="text-xs text-warning">
                ℹ️ Это демонстрационная версия. На реальном телефоне будет использоваться ИИ для точного распознавания.
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="gap-3 mt-auto pt-4">
              <TouchableOpacity
                onPress={handleAddToDiary}
                className="bg-primary rounded-xl py-4 items-center"
              >
                <Text className="text-white font-semibold text-lg">Добавить в дневник</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowResults(false)}
                className="bg-surface rounded-xl py-4 items-center border border-border"
              >
                <Text className="text-foreground font-semibold">Сделать ещё фото</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <View className="flex-1 justify-center gap-6">
        {/* Camera Icon */}
        <View className="items-center gap-4">
          <View className="w-32 h-32 rounded-full bg-primary/15 items-center justify-center border-2 border-primary/30">
            <IconSymbol name="camera.fill" size={64} color={colors.primary} />
          </View>

          <View className="gap-2 items-center">
            <Text className="text-2xl font-bold text-foreground text-center">Сканировать еду</Text>
            <Text className="text-sm text-muted text-center max-w-xs">
              Наведите камеру на блюдо и сделайте фото для автоматического анализа калорий
            </Text>
          </View>
        </View>

        {/* Take Photo Button */}
        <View className="items-center gap-4">
          <TouchableOpacity
            onPress={handleTakePhoto}
            disabled={isAnalyzing}
            className="w-28 h-28 rounded-full bg-primary items-center justify-center shadow-lg active:opacity-80"
          >
            {isAnalyzing ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <View className="w-20 h-20 bg-white rounded-full" />
            )}
          </TouchableOpacity>

          {isAnalyzing && (
            <Text className="text-sm text-muted font-semibold">Анализирую фото...</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View className="gap-2 mt-auto">
          <Text className="text-xs text-muted font-semibold uppercase">Быстрые действия</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-surface rounded-lg py-3 items-center border border-border">
              <IconSymbol name="pencil.circle" size={24} color={colors.primary} />
              <Text className="text-xs text-foreground mt-1">Ввести вручную</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-surface rounded-lg py-3 items-center border border-border">
              <IconSymbol name="barcode" size={24} color={colors.primary} />
              <Text className="text-xs text-foreground mt-1">Штрих-код</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="py-3 items-center"
        >
          <Text className="text-primary font-semibold">Назад</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
