
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors, radius, spacing, typography } from "../../constants/theme";
import { StockStepper } from "../ui/stockStepper";
import { StatusChip } from "../ui/statusChip";

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  category?: string;
  quantity: number;
};

type InventoryCardProps = {
  item: InventoryItem;
  onPress?: () => void;
  onQuantityChange?: (quantity: number) => void;
  lowStockThreshold?: number;
};

export function InventoryCard({
  item,
  onPress,
  onQuantityChange,
  lowStockThreshold = 5,
}: InventoryCardProps) {
  const outOfStock = item.quantity <= 0;
  const lowStock = !outOfStock && item.quantity <= lowStockThreshold;

  return (
    <View
      style={[
        styles.card,
        outOfStock && styles.outOfStock,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.details}>
          <Pressable
            accessibilityRole={onPress ? "button" : undefined}
            disabled={!onPress}
            onPress={onPress}
            style={styles.titleRow}
          >
            <Text numberOfLines={2} style={styles.name}>
              {item.name}
            </Text>
            {onPress ? (
              <ChevronRight size={17} color={colors.textMuted} />
            ) : null}
          </Pressable>

          <Text style={styles.sku}>{item.sku}</Text>

          {item.category ? (
            <Text numberOfLines={1} style={styles.category}>
              {item.category}
            </Text>
          ) : null}

          {outOfStock ? (
            <StatusChip label="Out of stock" variant="danger" />
          ) : lowStock ? (
            <StatusChip label="Low stock" variant="warning" />
          ) : null}
        </View>

        {onQuantityChange ? (
          <StockStepper
            value={item.quantity}
            onChange={onQuantityChange}
            min={0}
          />
        ) : (
          <View style={styles.quantity}>
            <Text style={styles.quantityValue}>{item.quantity}</Text>
            <Text style={styles.quantityLabel}>in stock</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  outOfStock: {
    borderLeftWidth: 3,
    borderLeftColor: colors.danger,
  },
  content: {
    minHeight: 96,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    padding: spacing.md,
  },
  details: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  name: {
    flex: 1,
    color: colors.text,
    ...typography.headlineSM,
  },
  sku: {
    color: colors.textMuted,
    ...typography.sku,
  },
  category: {
    color: colors.textSecondary,
    ...typography.bodySM,
  },
  quantity: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
  },
  quantityValue: {
    color: colors.text,
    ...typography.numericLG,
  },
  quantityLabel: {
    color: colors.textMuted,
    ...typography.bodySM,
  },
});
