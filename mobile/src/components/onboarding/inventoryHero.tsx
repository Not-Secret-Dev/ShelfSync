import {
  CheckCheck,
  Coffee,
  Package,
  TriangleAlert,
} from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@/constants/theme";

export function InventoryHero() {
  const items = [
    { name: "Artisan Oat Milk 1L", sku: "OAT-01", quantity: "24", low: false },
    { name: "Single Origin Roast", sku: "COF-88", quantity: "3", low: true },
    { name: "Wildflower Honey", sku: "HNY-14", quantity: "18", low: false },
  ];

  return (
    <View style={styles.canvas}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <View style={styles.liveDot} />
            <Text style={styles.title}>Storeroom A</Text>
          </View>
          <Text style={styles.liveBadge}>LIVE</Text>
        </View>

        <View style={styles.items}>
          {items.map((item, index) => (
            <View key={item.sku} style={styles.itemRow}>
              <View style={styles.itemIcon}>
                {index === 0 ? (
                  <Coffee size={19} color={colors.primary} />
                ) : index === 1 ? (
                  <Package size={19} color={colors.secondary} />
                ) : (
                  <CheckCheck size={19} color={colors.primary} />
                )}
              </View>

              <View style={styles.details}>
                <Text numberOfLines={1} style={styles.itemName}>
                  {item.name}
                </Text>
                <Text style={styles.sku}>SKU: {item.sku}</Text>
              </View>

              <View style={[styles.stockBadge, item.low && styles.lowBadge]}>
                {item.low ? (
                  <TriangleAlert size={12} color={colors.warning} />
                ) : (
                  <View style={styles.stockDot} />
                )}
                <Text style={[styles.stockText, item.low && styles.lowText]}>
                  {item.low ? "Low" : "In stock"} · {item.quantity}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>45 items checked</Text>
          <Text style={styles.progress}>82%</Text>
        </View>
      </View>

      <View style={styles.floatingBadge}>
        <CheckCheck size={17} color={colors.primary} />
        <Text style={styles.floatingText}>Zero discrepancies</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: "100%",
    aspectRatio: 4 / 3.8,
    maxHeight: 350,
    minHeight: 290,
    justifyContent: "center",
    position: "relative",
  },
  card: {
    padding: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  liveDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },
  title: { ...typography.label, color: colors.text },
  liveBadge: {
    ...typography.bodySM,
    color: colors.secondary,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  items: { gap: spacing.sm, paddingVertical: spacing.md },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  itemIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  details: { flex: 1, minWidth: 0, gap: 2 },
  itemName: {
    ...typography.bodyMD,
    fontWeight: "600",
    color: colors.text,
  },
  sku: { ...typography.sku, color: colors.textMuted },
  stockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.successBackground,
  },
  lowBadge: { backgroundColor: colors.warningBackground },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  stockText: {
    ...typography.bodySM,
    fontWeight: "600",
    color: colors.success,
  },
  lowText: { color: colors.warning },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: { ...typography.bodySM, color: colors.textSecondary },
  progress: { ...typography.numericMD, color: colors.primary },
  floatingBadge: {
    position: "absolute",
    right: 0,
    bottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    elevation: 3,
  },
  floatingText: { ...typography.label, color: colors.primary },
});
