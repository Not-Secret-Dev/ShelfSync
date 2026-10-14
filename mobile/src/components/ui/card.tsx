
import {
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { ReactNode } from "react";
import { colors, radius, spacing } from "../../constants/theme";

type CardProps = {
  children: ReactNode;
  padding?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
};

export function Card({
  children,
  padding = spacing.lg,
  gap = spacing.md,
  style,
}: CardProps) {
  return (
    <View style={[styles.card, { padding, gap }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
});
