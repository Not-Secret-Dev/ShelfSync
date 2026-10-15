import { useState } from "react";
import { router } from "expo-router";
import {
  Mail,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Screen, Button, TextField } from "@/components/ui";
import { TopBar } from "@/components/ui/topBar";
import { colors, radius, spacing, typography } from "@/constants/theme";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const trimmedEmail = email.trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  const emailError =
    hasAttemptedSubmit || emailTouched
      ? !trimmedEmail
        ? "Email address is required."
        : !emailIsValid
          ? "Enter a valid email address."
          : undefined
      : undefined;

  const handleResetPassword = () => {
    setHasAttemptedSubmit(true);

    if (!trimmedEmail || !emailIsValid) {
      return;
    }

    // Connect your authentication service here.
    setIsSubmitted(true);
  };

  const handleTryAnotherEmail = () => {
    setIsSubmitted(false);
    setHasAttemptedSubmit(false);
    setEmailTouched(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Screen
        scroll
        header={
          <TopBar
            title="Forgot password"
            onBack={() => router.back()}
            rightAction={
              <View style={styles.headerIcon}>
                <KeyRound size={20} color={colors.onPrimary} />
              </View>
            }
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.setupBanner}>
            <View style={styles.setupIcon}>
              <ShieldCheck size={26} color={colors.primary} strokeWidth={1.8} />
            </View>

            <View style={styles.setupText}>
              <Text style={styles.setupTitle}>ACCOUNT SECURITY</Text>
              <Text style={styles.setupDescription}>
                A secure way to get back into your account.
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.statusIcon}>
              {isSubmitted ? (
                <CheckCircle2
                  size={34}
                  color={colors.success}
                  strokeWidth={1.8}
                />
              ) : (
                <Mail size={34} color={colors.primary} strokeWidth={1.8} />
              )}
            </View>

            <Text style={styles.heading}>
              {isSubmitted ? "Check your inbox" : "Reset your password"}
            </Text>

            <Text style={styles.description}>
              {isSubmitted
                ? `If an account exists for ${trimmedEmail}, reset instructions will be sent to that address.`
                : "Enter the email address linked to your ShelfSync account. We'll help you get back in."}
            </Text>
          </View>

          {!isSubmitted ? (
            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Email address</Text>

                <TextField
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => setEmailTouched(true)}
                  error={emailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  leftIcon={<Mail size={20} color={colors.textMuted} />}
                  returnKeyType="done"
                  onSubmitEditing={handleResetPassword}
                />
              </View>

              <Button
                title="Send reset instructions"
                onPress={handleResetPassword}
              />
            </View>
          ) : (
            <View style={styles.successCard}>
              <CheckCircle2 size={21} color={colors.success} />

              <View style={styles.successContent}>
                <Text style={styles.successTitle}>What happens next?</Text>
                <Text style={styles.successDescription}>
                  Check your inbox and spam folder for the reset email. Follow
                  its instructions to choose a new password.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.footer}>
            <Pressable
              onPress={() => router.replace("/(auth)/sign-in")}
              accessibilityRole="button"
              accessibilityLabel="Back to sign in"
              hitSlop={8}
              style={styles.backLink}
            >
              <ArrowLeft size={17} color={colors.primary} />
              <Text style={styles.footerLink}>Back to sign in</Text>
            </Pressable>
          </View>

          {isSubmitted && (
            <Pressable
              onPress={handleTryAnotherEmail}
              accessibilityRole="button"
              hitSlop={8}
            >
              <Text style={styles.tryAgain}>Try another email address</Text>
            </Pressable>
          )}

          <Text style={styles.privacyNote}>
            Your account security matters to us.
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
    paddingVertical: spacing.sm,
    gap: spacing.xl,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  setupBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surfaceLow,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  setupIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AEEECB",
    borderRadius: radius.lg,
  },
  setupText: {
    flex: 1,
    gap: spacing.xs,
  },
  setupTitle: {
    ...typography.label,
    color: colors.primary,
    letterSpacing: 0.8,
  },
  setupDescription: {
    ...typography.bodyMD,
    color: colors.textSecondary,
  },
  content: {
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
  },
  statusIcon: {
    width: 68,
    height: 68,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceLow,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
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
  form: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: spacing.xl,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.text,
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
  successContent: {
    flex: 1,
    gap: spacing.xs,
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
  footer: {
    alignItems: "center",
    marginTop: spacing.xs,
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.xs,
  },
  footerLink: {
    ...typography.bodyMD,
    color: colors.primary,
    fontWeight: "600",
  },
  tryAgain: {
    ...typography.bodyMD,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "600",
  },
  privacyNote: {
    ...typography.bodySM,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: "auto",
    paddingTop: spacing.md,
  },
});
