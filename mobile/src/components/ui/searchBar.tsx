
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Barcode, Search, X } from "lucide-react-native";
import { colors, radius, spacing } from "../../constants/theme";
import { IconButton } from "./iconButton";

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  onScan?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search inventory...",
  onScan,
  style,
}: SearchBarProps) {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      <Search size={20} color={colors.textMuted} />

      <TextInput
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          onChangeText(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        accessibilityLabel="Search inventory"
        style={styles.input}
      />

      {query.length > 0 ? (
        <IconButton
          accessibilityLabel="Clear search"
          size={44}
          icon={<X size={18} color={colors.textSecondary} />}
          onPress={() => {
            setQuery("");
            onChangeText("");
          }}
        />
      ) : null}

      {onScan ? (
        <IconButton
          accessibilityLabel="Scan barcode"
          size={44}
          variant="filled"
          icon={<Barcode size={21} color={colors.primary} />}
          onPress={onScan}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.sm,
    color: colors.text,
    fontSize: 14,
  },
});
