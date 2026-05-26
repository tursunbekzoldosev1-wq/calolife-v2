import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useTranslation } from "@/hooks/use-translation";
import { useColors } from "@/hooks/use-colors";

export default function DiaryScreen() {
  const tr = useTranslation();
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">{tr('diary')}</Text>
            <Text className="text-sm text-muted">{new Date().toLocaleDateString()}</Text>
          </View>

          {/* Daily Summary */}
          <View className="bg-surface rounded-2xl p-6 gap-4 border border-border">
            <View className="gap-2">
              <Text className="text-sm text-muted">{tr('totalCalories')}</Text>
              <Text className="text-4xl font-bold text-primary">0</Text>
            </View>
            <View className="flex-row gap-4">
              <View className="flex-1 gap-1">
                <Text className="text-xs text-muted">{tr('protein')}</Text>
                <Text className="text-lg font-semibold text-foreground">0g</Text>
              </View>
              <View className="flex-1 gap-1">
                <Text className="text-xs text-muted">{tr('fat')}</Text>
                <Text className="text-lg font-semibold text-foreground">0g</Text>
              </View>
              <View className="flex-1 gap-1">
                <Text className="text-xs text-muted">{tr('carbs')}</Text>
                <Text className="text-lg font-semibold text-foreground">0g</Text>
              </View>
            </View>
          </View>

          {/* Meals by Category */}
          {['breakfast', 'lunch', 'dinner', 'snacks'].map((mealType) => (
            <View key={mealType} className="gap-2">
              <Text className="text-lg font-semibold text-foreground capitalize">
                {tr(mealType as any)}
              </Text>
              <View className="bg-surface rounded-xl p-4 border border-border items-center justify-center py-8">
                <Text className="text-muted">{tr('noMeals')}</Text>
              </View>
            </View>
          ))}

          {/* Add Food Button */}
          <TouchableOpacity
            className="bg-accent rounded-full py-4 items-center justify-center mt-4"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">{tr('addFood')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
