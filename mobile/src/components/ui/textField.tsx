import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { ReactNode } from "react";
import { colors, radius, spacing, typography } from "../../constants/theme";

type TextFieldProps = Omit<TextInputProps, "style"> & {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function TextField({
  label,
  error,
  helperText,
  containerStyle,
  leftIcon,
  rightIcon,
  ...inputProps
}: TextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : undefined,
          inputProps.editable === false ? styles.disabled : undefined,
        ]}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

        <TextInput
          {...inputProps}
          accessibilityLabel={inputProps.accessibilityLabel ?? label}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.focus}
          style={styles.input}
        />

        {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
      </View>

      {error ? (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      ) : helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    ...typography.label,
    color: colors.text,
  },
  inputContainer: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 46,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    ...typography.bodyMD,
  },
  leftIcon: {
    paddingLeft: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  rightIcon: {
    paddingRight: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  inputError: {
    borderColor: colors.danger,
  },
  disabled: {
    backgroundColor: colors.surfaceLow,
  },
  error: {
    ...typography.bodySM,
    color: colors.danger,
  },
  helper: {
    ...typography.bodySM,
    color: colors.textSecondary,
  },
});
