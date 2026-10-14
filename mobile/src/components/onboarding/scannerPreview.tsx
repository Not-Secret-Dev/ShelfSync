import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckCircle2, Focus, Package, Zap } from "lucide-react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { colors, radius, spacing, typography } from "@/constants/theme";

export function ScanPreview() {
  const laserPosition = useSharedValue(-58);
  const pulse = useSharedValue(0.45);

  useEffect(() => {
    laserPosition.value = withRepeat(
      withTiming(58, {
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    pulse.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, [laserPosition, pulse]);

  const laserStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: laserPosition.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [{ scale: 0.9 + pulse.value * 0.1 }],
  }));

  return (
    <View
      accessible
      accessibilityLabel="Animated barcode scanning preview"
      style={styles.canvas}
    >
      {/* Ambient background glow */}
      <View style={styles.glow} />

      {/* Product package behind the phone */}
      <View style={styles.package}>
        <View style={styles.packageHeader}>
          <View style={styles.packageTitle}>
            <View style={styles.greenDot} />
            <Text style={styles.packageSku}>COLD BREW 12OZ</Text>
          </View>

          <Package size={16} color={colors.secondary} />
        </View>

        {/* Barcode made from native views */}
        <View style={styles.barcodePanel}>
          <View style={styles.barcode}>
            {[
              3, 1.5, 4, 1, 2.5, 5, 1.5, 3, 2, 4, 1, 3.5, 2, 4.5, 1.5, 3, 1, 4,
              2, 3,
            ].map((width, index) => (
              <View key={index} style={[styles.bar, { width }]} />
            ))}
          </View>

          <Text style={styles.barcodeNumber}>8 410293 847520</Text>
        </View>

        <Text style={styles.packageFooter}>SHELFSYNC INVENTORY</Text>
      </View>

      {/* Phone mockup */}
      <View style={styles.phone}>
        <View style={styles.phoneTop}>
          <View style={styles.notch} />
        </View>

        {/* Camera viewfinder */}
        <View style={styles.viewfinder}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />

          {/* Animated laser: only this thin line moves */}
          <Animated.View style={[styles.laser, laserStyle]} />

          {/* Focus icon */}
          <Animated.View style={[styles.focusIcon, pulseStyle]}>
            <Focus size={30} color={"#AEEECB"} strokeWidth={1.8} />
          </Animated.View>

          <Text style={styles.scanningLabel}>SCANNING BARCODE</Text>
        </View>

        <View style={styles.phoneBottom}>
          <View style={styles.homeIndicator} />
        </View>
      </View>

      {/* Detection notification */}
      <View style={styles.detectionBadge}>
        <View style={styles.detectionDot} />

        <CheckCircle2 size={16} color={colors.secondary} />

        <Text style={styles.detectionText}>EAN-13: 841029384752</Text>
      </View>

      {/* Success notification */}
      <View style={styles.successBadge}>
        <Zap size={15} color="#AEEECB" fill="#AEEECB" />

        <Text style={styles.successText}>+1 Added in 0.4s</Text>
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
    alignSelf: "center",
    position: "relative",
    overflow: "hidden",
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceLow,
    justifyContent: "center",
  },

  glow: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    alignSelf: "center",
    backgroundColor: "#AEEECB",
    opacity: 0.25,
  },

  package: {
    position: "absolute",
    zIndex: 1,
    width: 176,
    height: 208,
    left: "50%",
    marginLeft: -112,
    bottom: 20,
    padding: 14,
    justifyContent: "space-between",
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    transform: [{ rotate: "-3deg" }],
    shadowColor: "#14261D",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },

  packageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },

  packageTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },

  packageSku: {
    ...typography.sku,
    fontSize: 9,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },

  barcodePanel: {
    padding: spacing.sm,
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },

  barcode: {
    width: "100%",
    height: 39,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 2,
    overflow: "hidden",
  },

  bar: {
    height: "100%",
    flexShrink: 0,
    backgroundColor: colors.text,
  },

  barcodeNumber: {
    ...typography.sku,
    fontSize: 9,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },

  packageFooter: {
    ...typography.sku,
    fontSize: 9,
    color: colors.textMuted,
    textAlign: "center",
  },

  phone: {
    position: "absolute",
    zIndex: 2,
    width: 192,
    height: 256,
    left: "50%",
    top: "50%",
    marginLeft: -84,
    marginTop: -136,
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 25,
    backgroundColor: colors.surface,
    shadowColor: "#0B1F16",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
    transform: [{ translateX: 12 }, { translateY: -2 }],
  },

  phoneTop: {
    height: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  notch: {
    width: 40,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHigh,
  },

  viewfinder: {
    height: 178,
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: colors.primaryContainer,
  },

  cornerTopLeft: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 17,
    height: 17,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#AEEECB",
    borderTopLeftRadius: 3,
  },

  cornerTopRight: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 17,
    height: 17,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#AEEECB",
    borderTopRightRadius: 3,
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: 12,
    left: 12,
    width: 17,
    height: 17,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#AEEECB",
    borderBottomLeftRadius: 3,
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 17,
    height: 17,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#AEEECB",
    borderBottomRightRadius: 3,
  },

  laser: {
    position: "absolute",
    top: "50%",
    left: 12,
    right: 12,
    height: 2,
    backgroundColor: "#AEEECB",
    shadowColor: "#AEEECB",
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 3,
  },

  focusIcon: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  scanningLabel: {
    ...typography.sku,
    position: "absolute",
    bottom: 22,
    fontSize: 8,
    color: "#AEEECB",
    letterSpacing: 1,
  },

  phoneBottom: {
    height: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  homeIndicator: {
    width: 46,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHigh,
  },

  detectionBadge: {
    position: "absolute",
    zIndex: 3,
    top: 16,
    left: 12,
    maxWidth: "88%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    shadowColor: "#14261D",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 5,
  },

  detectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },

  detectionText: {
    ...typography.sku,
    flexShrink: 1,
    fontSize: 9,
    color: colors.primary,
  },

  successBadge: {
    position: "absolute",
    zIndex: 3,
    right: 10,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: radius.md,
    backgroundColor: colors.primaryContainer,
    shadowColor: "#14261D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 6,
  },

  successText: {
    ...typography.label,
    fontSize: 11,
    color: "#AEEECB",
  },
});
