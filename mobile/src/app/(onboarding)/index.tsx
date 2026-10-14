import { useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ArrowRight, Package, ArrowLeft } from "lucide-react-native";
import { Screen } from "@/components/ui/screen";
import { IconButton } from "@/components/ui";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { ScanPreview } from "@/components/onboarding/scannerPreview";
import { InventoryHero } from "@/components/onboarding/inventoryHero";
import { OfflineSyncPreview } from "@/components/onboarding/offlineSyncPreview";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

const slides = [
  {
    title: "Your inventory, organized.",
    description:
      "Keep products, quantities, and stock levels in one simple place.",
    visual: "inventory" as const,
    footer: "Simple inventory. Less guesswork.",
  },
  {
    title: "Add products in seconds.",
    description:
      "Scan a barcode or enter product details manually for instant catalog synchronization.",
    visual: "scanner" as const,
    footer: "Your inventory, always within reach.",
  },
  {
    title: "Stay in sync, even offline.",
    description:
      "Your changes stay on your device and sync when you're back online.",
    visual: "offline" as const,
    footer: "Your inventory, always within reach.",
  },
];

const HERO_HEIGHT = 420;

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [heroHeight, setHeroHeight] = useState(0);
  const [previewHeight, setPreviewHeight] = useState(0);

  const previewScale =
    heroHeight > 0 && previewHeight > 0
      ? Math.min(1, heroHeight / previewHeight)
      : 1;

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;
  const slide = slides[currentSlide];

  function handleNext() {
    if (isLastSlide) {
      router.replace("/(auth)");
      return;
    }

    setDirection("next");
    setCurrentSlide((current) => current + 1);
  }

  function handlePrevious() {
    if (currentSlide === 0) return;
    setDirection("previous");

    setCurrentSlide((current) => current - 1);
  }

  function handleSkip() {
    router.replace("/(auth)");
  }

  return (
    <Screen padding={spacing.xl}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.container}>
          {/* Brand and skip */}
          <View style={styles.topBar}>
            {isLastSlide || !isFirstSlide ? (
              <View
                style={{
                  backgroundColor: colors.onSecondary,
                  padding: 6,
                  borderRadius: radius.full,
                  borderWidth: 1,
                }}
              >
                <IconButton
                  icon={<ArrowLeft />}
                  size={20}
                  accessibilityLabel="previous"
                  style={{ padding: 12 }}
                  onPress={handlePrevious}
                />
              </View>
            ) : (
              <View style={styles.brandPill}>
                <View style={styles.brandIcon}>
                  <Package size={16} color={colors.onPrimary} />
                </View>

                <Text style={styles.brandText}>ShelfSync</Text>
              </View>
            )}

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Skip onboarding"
              onPress={handleSkip}
              hitSlop={8}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </View>

          {/* Central illustration / inventory preview */}
          <View
            style={styles.hero}
            onLayout={(e) => setHeroHeight(e.nativeEvent.layout.height)}
          >
            <Animated.View
              key={`preview-${currentSlide}`}
              entering={
                direction === "next"
                  ? SlideInRight.duration(300)
                  : SlideInLeft.duration(300)
              }
            >
              <View
                onLayout={(e) => setPreviewHeight(e.nativeEvent.layout.height)}
                style={{ transform: [{ scale: previewScale }] }}
              >
                {slide.visual === "scanner" ? (
                  <ScanPreview />
                ) : slide.visual === "offline" ? (
                  <OfflineSyncPreview />
                ) : (
                  <InventoryHero />
                )}
              </View>
            </Animated.View>
          </View>
        </View>

        {/* Slide indicators */}
        <View
          accessibilityLabel={`Step ${currentSlide + 1} of ${slides.length}`}
          accessibilityRole="progressbar"
          accessibilityValue={{
            min: 1,
            max: slides.length,
            now: currentSlide + 1,
          }}
          style={styles.dots}
        >
          {slides.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.dot,
                index === currentSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Slide content */}
        <View style={styles.copy}>
          <Text style={styles.heading}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={handleNext}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isLastSlide ? "Get started" : "Next"}
            </Text>

            <ArrowRight size={19} color={colors.onPrimary} />
          </Pressable>

          <View style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>
              {currentSlide === 0
                ? "Simple inventory. Less guesswork."
                : currentSlide === 1
                  ? "Know your stock at a glance."
                  : "Your inventory, always within reach."}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 32,
  },
  topBar: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    zIndex: 1,
  },
  brandPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.full,
  },
  brandIcon: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  brandText: {
    ...typography.headlineSM,
    color: colors.primary,
  },
  skipButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
  },
  skipText: {
    ...typography.bodyMD,
    color: colors.textSecondary,
  },
  hero: {
    height: HERO_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 32,
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: radius.full,
  },
  activeDot: {
    width: 28,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.surfaceHigh,
  },
  copy: {
    alignItems: "center",
    gap: 12,
  },
  heading: {
    ...typography.headlineXL,
    color: colors.text,
    textAlign: "center",
  },
  description: {
    ...typography.bodyLG,
    color: colors.textSecondary,
    textAlign: "center",
    maxWidth: 320,
  },
  actions: {
    gap: 12,
    marginTop: 32,
  },
  primaryButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    ...typography.headlineSM,
    color: colors.onPrimary,
  },
  secondaryAction: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryActionText: {
    ...typography.bodyMD,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
