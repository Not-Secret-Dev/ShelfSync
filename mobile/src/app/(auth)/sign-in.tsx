import { useState } from "react";
import { router } from "expo-router";
import { Package, Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Screen, Button, TextField } from "@/components/ui";
import { TopBar } from "@/components/ui/topBar";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { useNetworkStatus } from "@/components/hooks/useNetworkStatus";
import { OfflineBanner } from "@/components/ui";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isOffline = useNetworkStatus();

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailError =
    submitted && !email.trim()
      ? "Email address is required."
      : submitted && !emailIsValid
        ? "Enter a valid email address."
        : undefined;

  const passwordError =
    submitted && !password ? "Password is required." : undefined;

  const handleSignIn = () => {
    setSubmitted(true);

    if (!email.trim() || !emailIsValid || !password) {
      return;
    }

    if (isOffline) {
      Alert.alert(
        "Offline sign-in",
        "Offline sign-in is available only for accounts previously saved securely on this device. Local credential verification is not connected yet.",
      );
      return;
    }

    Alert.alert("Sign in", "Connect your authentication service to continue.");
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
            title="Sign in"
            onBack={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(onboarding)");
              }
            }}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.heroContainer}>
            <View style={styles.iconContainer}>
              <Package size={56} color={colors.primary} strokeWidth={1.8} />
            </View>

            <View style={styles.brandRow}>
              <Text style={styles.heroHeading}>ShelfSync</Text>
              <View style={styles.versionPill}>
                <Text style={styles.versionText}>V2.4</Text>
              </View>
            </View>

            <Text style={styles.heroSubtext}>Inventory, in sync.</Text>
          </View>

          <View style={styles.formContainer}>
            {isOffline && (
              <OfflineBanner message="Sign in to a saved local profile to access your on-device inventory. Cloud sync will resume when you're connected." />
            )}

            <Text style={styles.formHeading}>Welcome Back</Text>
            <Text style={styles.formSubtext}>
              Sign in to sync your inventory across devices.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <TextField
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon={<Mail size={20} color={colors.textMuted} />}
                accessibilityLabel="Email address"
                accessibilityHint="Enter your account email"
                error={emailError}
              />
              {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.fieldLabel}>Password</Text>

                <Pressable
                  onPress={() => router.push("/(auth)/forgot-password")}
                  accessibilityRole="button"
                  hitSlop={8}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot password?
                  </Text>
                </Pressable>
              </View>

              <TextField
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon={<Mail size={20} color={colors.textMuted} />}
                accessibilityLabel="Email address"
                accessibilityHint="Enter your account email"
                error={emailError}
              />
              {passwordError && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}
            </View>

            <Button
              title={isOffline ? "Sign in offline" : "Sign In"}
              onPress={handleSignIn}
            />

            {!isOffline && (
              <View style={styles.socialContainer}>
                <View style={styles.socialDivider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.socialLabel}>or continue with</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                  <Pressable
                    style={styles.socialButton}
                    onPress={() =>
                      Alert.alert(
                        "Apple sign-in",
                        "Apple authentication is not configured yet.",
                      )
                    }
                    accessibilityRole="button"
                    accessibilityLabel="Continue with Apple"
                  >
                    <FontAwesome name="apple" size={22} color={colors.text} />
                    <Text style={styles.socialButtonText}>Apple</Text>
                  </Pressable>

                  <Pressable
                    style={styles.socialButton}
                    onPress={() =>
                      Alert.alert(
                        "Google sign-in",
                        "Google authentication is not configured yet.",
                      )
                    }
                    accessibilityRole="button"
                    accessibilityLabel="Continue with Google"
                  >
                    <FontAwesome name="google" size={19} color="#4285F4" />
                    <Text style={styles.socialButtonText}>Google</Text>
                  </Pressable>
                </View>
              </View>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don’t have an account?</Text>
              <Pressable
                onPress={() => router.push("/(auth)/create-account")}
                accessibilityRole="button"
              >
                <Text style={styles.footerLink}>Create account</Text>
              </Pressable>
            </View>
          </View>
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
    paddingVertical: spacing.xl,
  },
  heroContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AEEECB",
    borderRadius: radius.xl,
    marginBottom: spacing.xl,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  heroHeading: {
    ...typography.headlineXL,
    color: colors.text,
  },
  versionPill: {
    backgroundColor: "#AEEECB",
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  versionText: {
    ...typography.label,
    color: colors.primary,
  },
  heroSubtext: {
    ...typography.bodyLG,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.sm,
    letterSpacing: 0.2,
  },
  formContainer: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    width: "100%",
    borderRadius: radius.xl,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.md,
  },
  formHeading: {
    ...typography.headlineLG,
    color: colors.text,
  },
  formSubtext: {
    ...typography.bodyMD,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.text,
  },
  passwordLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  forgotPasswordText: {
    ...typography.bodySM,
    color: colors.primary,
    fontWeight: "600",
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    ...typography.bodySM,
    color: colors.danger,
  },
  socialContainer: {
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  socialDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  socialLabel: {
    ...typography.bodySM,
    color: colors.textMuted,
  },
  socialButtons: {
    flexDirection: "row",
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  socialButtonText: {
    ...typography.bodyMD,
    color: colors.text,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  footerText: {
    ...typography.bodyMD,
    color: colors.textSecondary,
  },
  footerLink: {
    ...typography.bodyMD,
    color: colors.primary,
    fontWeight: "600",
  },
});
