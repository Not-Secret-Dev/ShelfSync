import { StyleSheet, Text, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { IconButton } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";

type TopBarProps = {
  title: string;
  onBack: () => void;
  rightAction?: React.ReactNode;
};

export function TopBar({ title, onBack, rightAction }: TopBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <IconButton
          icon={<ArrowLeft size={20} color={colors.text} />}
          accessibilityLabel="Go back"
          size={40}
          onPress={onBack}
        />

        <Text style={styles.title}>{title}</Text>

        <View style={styles.actionSlot}>{rightAction}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,

    // Subtle shadow below the bar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    paddingBottom: 10,

    zIndex: 1,
  },
  content: {
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography.headlineMD,
    color: colors.text,
    position: "absolute",
    left: 64,
    right: 64,
    textAlign: "center",
  },
  actionSlot: {
    width: 40,
    alignItems: "center",
  },
});
