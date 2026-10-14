
import { StyleSheet, Text, View } from "react-native";
import type { ReactNode } from "react";

import { colors, spacing, typography } from "@/constants/theme";
import { Button } from "./button";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  actionTitle?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  icon,
  actionTitle,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionTitle && onAction ? (
        <Button
          title={actionTitle}
          onPress={onAction}
          variant="primary"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.md,
  },
  icon: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.headlineMD,
    color: colors.text,
    textAlign: "center",
  },
  description: {
    ...typography.bodyMD,
    color: colors.textSecondary,
    textAlign: "center",
    maxWidth: 300,
  },
});
