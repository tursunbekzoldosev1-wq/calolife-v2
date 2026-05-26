import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useTranslation } from "@/hooks/use-translation";
import { useColors } from "@/hooks/use-colors";

export default function StatisticsScreen() {
  const tr = useTranslation();
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">{tr('statistics')}</Text>
            <Text className="text-sm text-muted">{tr('weeklyStats')}</Text>
          </View>

          {/* Calories Trend Chart */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <Text className="text-lg font-semibold text-foreground">{tr('caloriesTrend')}</Text>
            <View className="h-48 bg-background rounded-lg items-center justify-center">
              <Text className="text-muted text-sm">{tr('loading')}</Text>
            </View>
          </View>

          {/* Macro Distribution */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <Text className="text-lg font-semibold text-foreground">{tr('macroDistribution')}</Text>
            <View className="h-48 bg-background rounded-lg items-center justify-center">
              <Text className="text-muted text-sm">{tr('loading')}</Text>
            </View>
          </View>

          {/* Weekly Summary */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <Text className="text-lg font-semibold text-foreground">{tr('week')}</Text>
            <View className="gap-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <View key={day} className="flex-row items-center justify-between">
                  <Text className="text-sm text-muted w-10">{day}</Text>
                  <View className="flex-1 h-2 bg-background rounded-full mx-3">
                    <View className="h-full w-1/2 bg-primary rounded-full" />
                  </View>
                  <Text className="text-sm font-semibold text-foreground w-12 text-right">0</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
