import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ArrowLeftRight,
  Check,
  Cloud,
  Database,
  ShieldCheck,
  Smartphone,
  WifiOff,
  Zap,
} from "lucide-react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { colors, radius, spacing, typography } from "@/constants/theme";

const MINT = "#AEEECB";
const ON_MINT = "#316E52";

export function OfflineSyncPreview() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1400,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [progress]);

  const firstPacketStyle = useAnimatedStyle(() => ({
    opacity: 0.45 + progress.value * 0.55,
    transform: [{ scale: 0.85 + progress.value * 0.3 }],
  }));

  const secondPacketStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value * 0.45,
    transform: [{ scale: 1 - progress.value * 0.15 }],
  }));

  const thirdPacketStyle = useAnimatedStyle(() => ({
    opacity: 0.45 + (1 - progress.value) * 0.55,
    transform: [{ scale: 0.85 + (1 - progress.value) * 0.3 }],
  }));

  return (
    <View style={styles.container}>
      {/* Ambient background accents */}
      <View pointerEvents="none" style={styles.topGlow} />
      <View pointerEvents="none" style={styles.bottomGlow} />

      {/* Offline readiness status */}
      <View style={styles.statusPill}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>
          LOCAL QUEUE ACTIVE · 100% OFFLINE READY
        </Text>
      </View>

      {/* Device → Sync bridge → Cloud */}
      <View style={styles.syncFlow}>
        <View style={styles.endpoint}>
          <View style={styles.endpointIcon}>
            <Smartphone size={30} color={colors.primary} />

            <View style={styles.deviceBadge}>
              <Database size={13} color={ON_MINT} />
            </View>
          </View>

          <Text style={styles.endpointTitle}>Device Safe</Text>
          <Text style={styles.endpointCaption}>SQLite / Instant</Text>
        </View>

        <View style={styles.bridge}>
          <View style={styles.bridgeTrack}>
            {Array.from({ length: 7 }, (_, index) => (
              <View key={index} style={styles.trackDot} />
            ))}

            <Animated.View
              style={[styles.packet, styles.packetOne, firstPacketStyle]}
            />
            <Animated.View
              style={[styles.packet, styles.packetTwo, secondPacketStyle]}
            />
            <Animated.View
              style={[styles.packet, styles.packetThree, thirdPacketStyle]}
            />
          </View>

          <View style={styles.bridgeLabel}>
            <Text style={styles.bridgeLabelText}>AUTO-SYNC BUS</Text>
          </View>
        </View>

        <View style={styles.endpoint}>
          <View style={styles.endpointIcon}>
            <Cloud size={30} color={colors.primary} />

            <View style={styles.cloudBadge}>
              <Check size={14} color={colors.onPrimary} />
            </View>
          </View>

          <Text style={styles.endpointTitle}>Cloud Vault</Text>
          <Text style={styles.endpointCaption}>Auto Reconciled</Text>
        </View>
      </View>

      {/* Offline-first benefits */}
      <View style={styles.featureRow}>
        <FeatureChip
          icon={<WifiOff size={14} color={ON_MINT} />}
          title="No Signal"
          subtitle="Floor ready"
        />
        <FeatureChip
          icon={<Zap size={14} color={ON_MINT} />}
          title="Zero Lag"
          subtitle="Instant scan"
        />
        <FeatureChip
          icon={<ShieldCheck size={14} color={ON_MINT} />}
          title="Zero Loss"
          subtitle="Queued logs"
        />
      </View>

      {/* Operational status */}
      <View style={styles.simulatorCard}>
        <View style={styles.simulatorIcon}>
          <ArrowLeftRight size={23} color={colors.secondary} />
        </View>

        <View style={styles.simulatorContent}>
          <View style={styles.simulatorHeading}>
            <Text style={styles.simulatorTitle}>Offline Status Simulator</Text>

            <View style={styles.readyBadge}>
              <Text style={styles.readyText}>READY</Text>
            </View>
          </View>

          <Text style={styles.simulatorDescription}>
            Test counting basement stock without cellular coverage.
          </Text>
        </View>
      </View>
    </View>
  );
}

type FeatureChipProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

function FeatureChip({ icon, title, subtitle }: FeatureChipProps) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>{icon}</View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },

  topGlow: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    top: -65,
    right: -45,
    backgroundColor: "#D8F5E5",
    opacity: 0.7,
  },

  bottomGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    bottom: -55,
    left: -45,
    backgroundColor: colors.surfaceHigh,
    opacity: 0.8,
  },

  statusPill: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
    elevation: 1,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },

  statusText: {
    ...typography.sku,
    fontSize: 9,
    letterSpacing: 0.35,
    color: colors.secondary,
    fontWeight: "600",
  },

  syncFlow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },

  endpoint: {
    width: 88,
    alignItems: "center",
    zIndex: 1,
  },

  endpointIcon: {
    width: 62,
    height: 62,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  deviceBadge: {
    position: "absolute",
    right: -5,
    bottom: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: MINT,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.surfaceLow,
  },

  cloudBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.surfaceLow,
  },

  endpointTitle: {
    ...typography.label,
    color: colors.text,
    marginTop: spacing.md,
    textAlign: "center",
  },

  endpointCaption: {
    ...typography.sku,
    fontSize: 9,
    letterSpacing: 0,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 3,
  },

  bridge: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    paddingTop: 19,
  },

  bridgeTrack: {
    width: "100%",
    height: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },

  trackDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: MINT,
  },

  packet: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    top: 7.5,
  },

  packetOne: {
    left: "22%",
  },

  packetTwo: {
    left: "49%",
    backgroundColor: colors.primary,
  },

  packetThree: {
    right: "14%",
  },

  bridgeLabel: {
    backgroundColor: MINT,
    borderRadius: radius.sm,
    paddingHorizontal: 5,
    paddingVertical: 4,
    marginTop: 2,
  },

  bridgeLabelText: {
    ...typography.sku,
    fontSize: 8,
    letterSpacing: 0,
    color: ON_MINT,
    fontWeight: "600",
    textAlign: "center",
  },

  featureRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  featureCard: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    elevation: 1,
  },

  featureIcon: {
    width: 26,
    height: 26,
    borderRadius: radius.full,
    backgroundColor: MINT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },

  featureTitle: {
    ...typography.label,
    fontSize: 11,
    lineHeight: 14,
    color: colors.text,
    textAlign: "center",
  },

  featureSubtitle: {
    ...typography.bodySM,
    fontSize: 10,
    lineHeight: 13,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 3,
  },

  simulatorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    elevation: 1,
  },

  simulatorIcon: {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: radius.md,
    backgroundColor: "#DDF4E6",
    alignItems: "center",
    justifyContent: "center",
  },

  simulatorContent: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
  },

  simulatorHeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  simulatorTitle: {
    ...typography.headlineSM,
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
    flexShrink: 1,
  },

  readyBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: radius.sm,
    backgroundColor: MINT,
  },

  readyText: {
    ...typography.sku,
    fontSize: 9,
    color: ON_MINT,
    fontWeight: "600",
  },

  simulatorDescription: {
    ...typography.bodySM,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
