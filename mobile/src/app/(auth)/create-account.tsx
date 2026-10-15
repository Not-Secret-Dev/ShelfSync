import { useState } from "react";
import { router } from "expo-router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  PackageOpen,
  Check,
  User,
} from "lucide-react-native";
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

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const isOffline = useNetworkStatus();

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const nameError =
    (submitted || touched.name) && !name.trim()
      ? "Enter your full name."
      : undefined;

  const emailError =
    submitted || touched.email
      ? !email.trim()
        ? "Email address is required."
        : !emailIsValid
          ? "Enter a valid email address."
          : undefined
      : undefined;

  const passwordError =
    (submitted || touched.password) && !password
      ? "Password is required."
      : (submitted || touched.password) && password.length < 8
        ? "Password must be at least 8 characters."
        : undefined;

  const confirmPasswordError =
    submitted || touched.confirmPassword
      ? !confirmPassword
        ? "Please confirm your password."
        : password !== confirmPassword
          ? "Passwords don't match."
          : undefined
      : undefined;

  const markTouched = (field: keyof typeof touched) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleCreateAccount = () => {
    setSubmitted(true);

    const hasErrors =
      !name.trim() ||
      !email.trim() ||
      !emailIsValid ||
      !password ||
      password.length < 8 ||
      !confirmPassword ||
      password !== confirmPassword ||
      !agreedToTerms;

    if (hasErrors) {
      return;
    }

    if (isOffline) {
      Alert.alert(
        "Offline account setup",
        "Local account creation needs to be connected to secure on-device storage. Your online account cannot be verified while offline.",
      );
      return;
    }

    Alert.alert(
      "Create account",
      "Connect your authentication service to finish creating your account.",
    );
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
            title="Create account"
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
            <View style={styles.setupBanner}>
              <View style={styles.setupIcon}>
                <PackageOpen
                  size={28}
                  color={colors.primary}
                  strokeWidth={1.8}
                />
              </View>

              <View style={styles.setupTextContainer}>
                <Text style={styles.setupTitle}>SHELFSYNC SETUP</Text>
                <Text style={styles.setupDescription}>
                  Your inventory journey starts here.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            {isOffline && (
              <OfflineBanner message="You can prepare a local profile, but online account verification and cloud sync will wait until you reconnect." />
            )}

            <View style={styles.headingGroup}>
              <Text style={styles.formHeading}>Create your account</Text>
              <Text style={styles.formSubtext}>
                Sign up to keep your inventory organized and in sync.
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextField
                placeholder="Marcus Vance"
                value={name}
                onChangeText={setName}
                onBlur={() => markTouched("name")}
                error={nameError}
                autoCapitalize="words"
                autoComplete="name"
                returnKeyType="next"
                leftIcon={<User size={20} color={colors.textMuted} />}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email address</Text>
              <TextField
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                onBlur={() => markTouched("email")}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                returnKeyType="next"
                leftIcon={<Mail size={20} color={colors.textMuted} />}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextField
                placeholder="At least 8 characters"
                value={password}
                onChangeText={setPassword}
                onBlur={() => markTouched("password")}
                error={passwordError}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                returnKeyType="next"
                leftIcon={<Lock size={20} color={colors.textMuted} />}
                rightIcon={
                  <Pressable
                    onPress={() => setShowPassword((current) => !current)}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? "Hide password" : "Show password"
                    }
                    hitSlop={8}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={colors.textMuted} />
                    ) : (
                      <Eye size={20} color={colors.textMuted} />
                    )}
                  </Pressable>
                }
              />

              <View style={styles.passwordHint}>
                <Check
                  size={14}
                  color={
                    password.length >= 8 ? colors.success : colors.textMuted
                  }
                />
                <Text
                  style={[
                    styles.hintText,
                    password.length >= 8 && styles.hintTextValid,
                  ]}
                >
                  At least 8 characters
                </Text>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Confirm password</Text>
              <TextField
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={() => markTouched("confirmPassword")}
                error={confirmPasswordError}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                returnKeyType="done"
                leftIcon={<Lock size={20} color={colors.textMuted} />}
                rightIcon={
                  <Pressable
                    onPress={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    accessibilityRole="button"
                    accessibilityLabel={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    hitSlop={8}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={colors.textMuted} />
                    ) : (
                      <Eye size={20} color={colors.textMuted} />
                    )}
                  </Pressable>
                }
              />
            </View>

            <View style={styles.termsContainer}>
              <Pressable
                style={styles.termsRow}
                onPress={() => setAgreedToTerms((current) => !current)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: agreedToTerms }}
                accessibilityLabel="Agree to the terms and conditions"
              >
                <View
                  style={[
                    styles.checkbox,
                    agreedToTerms && styles.checkboxChecked,
                    submitted && !agreedToTerms && styles.checkboxError,
                  ]}
                >
                  {agreedToTerms && (
                    <Check size={14} color={colors.onPrimary} strokeWidth={3} />
                  )}
                </View>

                <Text style={styles.termsText}>
                  I agree to the terms and conditions.
                </Text>
              </Pressable>

              {submitted && !agreedToTerms && (
                <Text style={styles.termsError}>
                  You must agree to continue.
                </Text>
              )}
            </View>

            <Button
              title={isOffline ? "Create account offline" : "Create account"}
              onPress={handleCreateAccount}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Pressable
                onPress={() => router.replace("/(auth)/sign-in")}
                accessibilityRole="button"
                hitSlop={8}
              >
                <Text style={styles.footerLink}>Sign in</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.privacyNote}>
            Your inventory, organized and ready to go.
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
  },
  heroContainer: {
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  setupBanner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surfaceLow,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.xl,
    marginBottom: spacing.md,
  },
  setupIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AEEECB",
    borderRadius: radius.lg,
  },
  setupTextContainer: {
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
  formContainer: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    width: "100%",
    borderRadius: radius.xl,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.lg,
  },
  headingGroup: {
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  formHeading: {
    ...typography.headlineLG,
    color: colors.text,
  },
  formSubtext: {
    ...typography.bodyMD,
    color: colors.textSecondary,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.text,
  },
  passwordHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  hintText: {
    ...typography.bodySM,
    color: colors.textMuted,
  },
  hintTextValid: {
    color: colors.success,
  },
  termsContainer: {
    gap: spacing.xs,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxError: {
    borderColor: colors.danger,
  },
  termsText: {
    ...typography.bodySM,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  termsError: {
    ...typography.bodySM,
    color: colors.danger,
    marginLeft: spacing.xxl + spacing.xs,
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
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
  privacyNote: {
    ...typography.bodySM,
    color: colors.textMuted,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
});
