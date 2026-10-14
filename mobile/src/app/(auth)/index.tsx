
import { Text, View } from "react-native";
import { Screen, Card } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";

export default function AuthScreen() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center", gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <Text style={{ ...typography.headlineXL, color: colors.text }}>
            Welcome to ShelfSync
          </Text>
          <Text style={{ ...typography.bodyLG, color: colors.textSecondary }}>
            Sign in or create an account to manage your inventory.
          </Text>
        </View>

        <Card>
          <Text style={{ ...typography.headlineMD, color: colors.text }}>
            Authentication
          </Text>
          <Text style={{ ...typography.bodyMD, color: colors.textSecondary }}>
            Your sign-in and registration forms will go here.
          </Text>
        </Card>
      </View>
    </Screen>
  );
}
