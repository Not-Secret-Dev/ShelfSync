
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { colors, radius, spacing, typography } from "../../constants/theme";

type TextFieldProps = Omit<TextInputProps, "style"> & {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function TextField({
  label,
  error,
  helperText,
  containerStyle,
  ...inputProps
}: TextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        {...inputProps}
        accessibilityLabel={inputProps.accessibilityLabel ?? label}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.focus}
        style={[
          styles.input,
          error ? styles.inputError : undefined,
          inputProps.editable === false ? styles.disabled : undefined,
        ]}
      />

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
  container: { gap: spacing.xs },
  label: {
    ...typography.label,
    color: colors.text,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    color: colors.text,
    ...typography.bodyMD,
  },
  inputError: { borderColor: colors.danger },
  disabled: {
    backgroundColor: colors.surfaceLow,
    color: colors.textMuted,
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
