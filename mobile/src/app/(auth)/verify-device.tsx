import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MailCheck,
  PackageOpen,
  ShieldCheck,
  Wifi,
} from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Screen, Button } from "@/components/ui";
import { TopBar } from "@/components/ui/topBar";
import { colors, radius, spacing, typography } from "@/constants/theme";

const RESEND_DELAY = 42;

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [remaining, setRemaining] = useState(RESEND_DELAY);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [hasAttemptedVerify, setHasAttemptedVerify] = useState(false);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (remaining <= 0 || isVerified) return;

    const timer = setInterval(() => {
      setRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, isVerified]);

  const handleCodeChange = (value: string) => {
    const sanitizedCode = value.replace(/\D/g, "").slice(0, 6);

    setCode(sanitizedCode);
    setError("");
  };

  const handleVerify = () => {
    setHasAttemptedVerify(true);

    if (code.length !== 6) {
      setError("Enter the complete 6-digit verification code.");
      inputRef.current?.focus();
      return;
    }

    // Connect your authentication service here.
    // Only set isVerified(true) after the server confirms verification.
    setError("Email verification isn't connected yet. Please try again later.");
  };

  const handleResend = () => {
    if (remaining > 0) return;

    // Connect your authentication service to resend the code.
    // Restart the countdown only after a resend succeeds.
    setError("Resending verification codes isn't connected yet.");
  };

  const handleChangeEmail = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Screen
        scroll
        header={<TopBar title="Verify device" onBack={() => router.back()} />}
      >
        <View style={styles.container}>
          <View style={styles.heroCard}>
            <View
              style={[styles.heroIcon, isVerified && styles.heroIconSuccess]}
            >
              {isVerified ? (
                <CheckCircle2
                  size={32}
                  color={colors.success}
                  strokeWidth={1.8}
                />
              ) : (
                <MailCheck size={32} color={colors.primary} strokeWidth={1.8} />
              )}
            </View>

            <Text style={styles.heading}>
              {isVerified ? "Email verified" : "Verify your email"}
            </Text>

            <Text style={styles.description}>
              {isVerified
                ? "Your email has been verified. You're ready for the next step."
                : "Enter the 6-digit verification code sent to your email to secure your ShelfSync account and enable synchronization."}
            </Text>
          </View>

          {!isVerified && (
            <>
              <View style={styles.codeCard}>
                <View style={styles.codeHeader}>
                  <Text style={styles.codeLabel}>AUTHENTICATION CODE</Text>

                  <View style={styles.deliveryLabel}>
                    <ShieldCheck size={14} color={colors.secondary} />
                    <Text style={styles.deliveryText}>EMAIL CODE</Text>
                  </View>
                </View>

                <View style={styles.codeInputWrapper}>
                  <Pressable
                    style={styles.codeGrid}
                    onPress={() => inputRef.current?.focus()}
                    accessibilityRole="button"
                    accessibilityLabel="Enter verification code"
                  >
                    {Array.from({ length: 6 }, (_, index) => {
                      const digit = code[index];
                      const isActive = index === code.length && code.length < 6;

                      return (
                        <View
                          key={index}
                          style={[
                            styles.codeBox,
                            isActive && styles.codeBoxActive,
                            digit && styles.codeBoxFilled,
                            error && styles.codeBoxError,
                          ]}
                        >
                          <Text style={styles.codeDigit}>
                            {digit || (isActive ? "•" : "")}
                          </Text>
                        </View>
                      );
                    })}
                  </Pressable>

                  <TextInput
                    ref={inputRef}
                    value={code}
                    onChangeText={handleCodeChange}
                    keyboardType="number-pad"
                    maxLength={6}
                    autoComplete="one-time-code"
                    textContentType="oneTimeCode"
                    accessibilityLabel="6-digit verification code"
                    accessibilityHint="Enter the code sent to your email"
                    style={styles.hiddenInput}
                    editable={!isVerified}
                  />
                </View>

                {error ? (
                  <View
                    style={styles.errorBanner}
                    accessibilityRole="alert"
                    accessibilityLiveRegion="polite"
                  >
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : (
                  <Text style={styles.codeHint}>
                    Tap the boxes above to enter your code.
                  </Text>
                )}

                <View style={styles.resendRow}>
                  <View style={styles.timerGroup}>
                    <Clock3 size={16} color={colors.textMuted} />
                    <Text style={styles.timerText}>
                      {remaining > 0 ? "Resend in " : "Ready to resend"}
                      {remaining > 0 && (
                        <Text style={styles.timerValue}>
                          {` 0:${String(remaining).padStart(2, "0")}`}
                        </Text>
                      )}
                    </Text>
                  </View>

                  <Pressable
                    onPress={handleResend}
                    disabled={remaining > 0}
                    accessibilityRole="button"
                    accessibilityState={{ disabled: remaining > 0 }}
                    hitSlop={8}
                  >
                    <Text
                      style={[
                        styles.resendText,
                        remaining > 0 && styles.resendDisabled,
                      ]}
                    >
                      Resend code
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.actions}>
                <Button
                  title="Verify email"
                  onPress={handleVerify}
                  leftIcon={<ShieldCheck size={19} color={colors.onPrimary} />}
                />

                <Pressable
                  onPress={handleChangeEmail}
                  accessibilityRole="button"
                  accessibilityLabel="Change email address"
                  hitSlop={8}
                  style={styles.changeEmail}
                >
                  <ArrowLeft size={16} color={colors.textSecondary} />
                  <Text style={styles.changeEmailText}>
                    Change email address
                  </Text>
                </Pressable>
              </View>
            </>
          )}

          {isVerified && (
            <View style={styles.successCard}>
              <CheckCircle2 size={21} color={colors.success} />
              <View style={styles.ledgerContent}>
                <Text style={styles.successTitle}>Verification complete</Text>
                <Text style={styles.successDescription}>
                  Your email verification is complete. You can continue once the
                  next onboarding step is connected.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.ledgerCard}>
            <View style={styles.ledgerIcon}>
              <PackageOpen size={21} color={colors.primary} />
            </View>

            <View style={styles.ledgerContent}>
              <View style={styles.ledgerTitleRow}>
                <Text style={styles.ledgerTitle}>
                  Your inventory stays safe
                </Text>
                <View style={styles.onlineDot} />
              </View>

              <Text style={styles.ledgerDescription}>
                ShelfSync keeps local inventory available on your device.
                Verification helps prepare your account for syncing without
                interrupting offline work.
              </Text>

              <View style={styles.ledgerStatus}>
                <View style={styles.statusItem}>
                  <Text style={styles.statusLabel}>LOCAL STORAGE</Text>
                  <Text style={styles.statusValue}>Available</Text>
                </View>

                <View style={styles.statusItem}>
                  <Text style={styles.statusLabel}>CLOUD SYNC</Text>
                  <View style={styles.syncValue}>
                    <Wifi size={14} color={colors.secondary} />
                    <Text style={styles.statusValue}>Pending</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.privacyNote}>
            Secure your account. Keep your inventory in sync.
          </Text>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
  },
  heroCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: spacing.md,
  },
  heroIcon: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHigh,
  },
  heroIconSuccess: {
    backgroundColor: colors.successBackground,
  },
  heading: {
    ...typography.headlineLG,
    color: colors.text,
    textAlign: "center",
  },
  description: {
    ...typography.bodyMD,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  codeCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: spacing.md,
  },
  codeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  codeLabel: {
    ...typography.label,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  deliveryLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  deliveryText: {
    ...typography.bodySM,
    color: colors.secondary,
    fontWeight: "600",
  },
  codeInputWrapper: {
    position: "relative",
  },
  codeGrid: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  codeBox: {
    flex: 1,
    minWidth: 0,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "transparent",
  },
  codeBoxActive: {
    backgroundColor: "#E1F5E9",
    borderColor: colors.secondary,
  },
  codeBoxFilled: {
    backgroundColor: colors.surfaceHigh,
  },
  codeBoxError: {
    borderColor: colors.danger,
  },
  codeDigit: {
    ...typography.numericLG,
    color: colors.primary,
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  codeHint: {
    ...typography.bodySM,
    color: colors.textMuted,
  },
  errorBanner: {
    padding: spacing.md,
    backgroundColor: colors.dangerBackground,
    borderRadius: radius.md,
  },
  errorText: {
    ...typography.bodySM,
    color: colors.danger,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  timerGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  timerText: {
    ...typography.bodySM,
    color: colors.textSecondary,
  },
  timerValue: {
    ...typography.numericMD,
    color: colors.text,
  },
  resendText: {
    ...typography.bodyMD,
    color: colors.secondary,
    fontWeight: "600",
  },
  resendDisabled: {
    color: colors.textMuted,
    opacity: 0.65,
  },
  actions: {
    gap: spacing.md,
  },
  changeEmail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  changeEmailText: {
    ...typography.bodyMD,
    color: colors.textSecondary,
    textDecorationLine: "underline",
  },
  ledgerCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
  },
  ledgerIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: "#AEEECB",
    alignItems: "center",
    justifyContent: "center",
  },
  ledgerContent: {
    flex: 1,
    gap: spacing.sm,
  },
  ledgerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  ledgerTitle: {
    ...typography.headlineSM,
    color: colors.text,
    flexShrink: 1,
  },
  ledgerDescription: {
    ...typography.bodySM,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  ledgerStatus: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  statusItem: {
    flex: 1,
    gap: spacing.xs,
  },
  statusLabel: {
    ...typography.sku,
    color: colors.textMuted,
    fontSize: 9,
    letterSpacing: 0.2,
  },
  statusValue: {
    ...typography.bodySM,
    color: colors.text,
    fontWeight: "600",
  },
  syncValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  successCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.successBackground,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  successTitle: {
    ...typography.headlineSM,
    color: colors.success,
  },
  successDescription: {
    ...typography.bodyMD,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  privacyNote: {
    ...typography.bodySM,
    color: colors.textMuted,
    textAlign: "center",
    paddingVertical: spacing.sm,
  },
});
