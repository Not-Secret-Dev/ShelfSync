import { View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "../../constants/theme";

type DividerProps = {
  style?: StyleProp<ViewStyle>;
  vertical?: boolean;
};

export function Divider({ style, vertical = false }: DividerProps) {
  return (
    <View
      style={[
        styles.divider,
        vertical ? styles.vertical : styles.horizontal,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: { backgroundColor: colors.border },
  horizontal: { width: "100%", height: 1 },
  vertical: { width: 1, alignSelf: "stretch" },
});
