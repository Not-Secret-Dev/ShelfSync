# ShelfSync

**Offline-first inventory management, designed for reliability.**

ShelfSync is a mobile inventory management application built with React Native and Expo. It aims to help users manage products and stock levels through a clean, accessible interface, with offline-first workflows designed for environments where connectivity may be unreliable.

The project emphasizes reusable UI components, consistent design tokens, clear stock indicators, and a foundation for reliable inventory operations.

> **Development status:** The mobile UI and authentication screens are under active development. Authentication services, persistent offline storage, synchronization, and other backend-dependent features must be integrated and tested before they can be considered production-ready.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Available Scripts and Commands](#available-scripts-and-commands)
- [Application Architecture](#application-architecture)
- [Design System](#design-system)
- [Authentication Screens](#authentication-screens)
- [Offline-First Design](#offline-first-design)
- [Development Workflow](#development-workflow)
- [Testing and Quality Checks](#testing-and-quality-checks)
- [Implementation Roadmap](#implementation-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Inventory Management

ShelfSync is designed to provide a practical workflow for managing inventory.

Planned core capabilities include:

- Product creation and editing.
- Product names, SKUs, and stock quantities.
- Stock increases and decreases.
- Search and filtering.
- Low-stock indicators.
- Inventory summaries.
- Clear empty, loading, and error states.
- Reliable inventory updates when connectivity is interrupted.

### Authentication UI

The current mobile project includes authentication screens built with reusable components.

- **Sign in:** Email and password fields, password visibility controls, and inline validation.
- **Create account:** Account form, input validation, password guidance, and terms acceptance.
- **Forgot password:** Email validation and a user-friendly confirmation state.
- **Verify device/email:** Six-digit verification-code interface, resend countdown, error feedback, and navigation to change the email address.

The authentication UI is a foundation for integrating a real authentication provider or backend. Displaying a screen or confirmation message does not by itself mean that an authentication operation has succeeded.

### Reusable UI Components

The project includes shared components intended to keep the interface consistent and easier to maintain:

- Buttons and icon buttons.
- Cards and section headers.
- Text fields.
- Top bars and screen layouts.
- Search bars.
- Status chips.
- Stock steppers.
- Floating action buttons.
- Offline banners.
- Loading and empty states.
- Dividers.

### Offline-First Direction

ShelfSync is designed around the principle that core inventory workflows should remain usable when a network connection is unavailable.

The intended approach includes local persistence, queued changes, and synchronization when connectivity returns. These behaviors require implementation and testing against the app's actual data layer before they can be considered complete.

---

## Technology Stack

| Technology          | Purpose                             |
| ------------------- | ----------------------------------- |
| React Native        | Cross-platform mobile UI            |
| Expo SDK 57         | Mobile development and tooling      |
| Expo Router         | File-based navigation               |
| React 19.2.3        | UI rendering                        |
| React Native 0.86.3 | Native mobile application framework |
| TypeScript          | Static typing and safer refactoring |
| Inter               | Primary interface typography        |
| JetBrains Mono      | Numeric and SKU typography          |

The project uses TypeScript with strict settings and shared design tokens for colors, spacing, typography, and border radii.

Backend, authentication provider, database, and synchronization technologies should be documented here once they have been selected and integrated.

---

## Project Structure

The mobile application is located in the `mobile/` directory.

```text
ShelfSync/
└── mobile/
    └── src/
        ├── app/
        │   ├── _layout.tsx
        │   └── (auth)/
        │       ├── _layout.tsx
        │       ├── sign-in.tsx
        │       ├── create-account.tsx
        │       ├── forgot-password.tsx
        │       └── verify-device.tsx
        │
        ├── components/
        │   ├── hooks/
        │   │   └── useNetworkStatus.ts
        │   └── ui/
        │       ├── button.tsx
        │       ├── card.tsx
        │       ├── divider.tsx
        │       ├── emptyState.tsx
        │       ├── FAB.tsx
        │       ├── iconButton.tsx
        │       ├── index.ts
        │       ├── loadingState.tsx
        │       ├── offlineBanner.tsx
        │       ├── screen.tsx
        │       ├── searchBar.tsx
        │       ├── sectionHeader.tsx
        │       ├── statusChip.tsx
        │       ├── stockStepper.tsx
        │       ├── textField.tsx
        │       └── topBar.tsx
        │
        └── constants/
            └── theme.ts
```

_This tree highlights the known mobile source structure; other project files, assets, configuration files, and future modules may also exist._

### Important Directories

**`mobile/src/app/`**

Contains the Expo Router routes and navigation layouts. Route groups such as `(auth)` organize related screens without adding the group name to the URL path.

**`mobile/src/components/ui/`**

Contains reusable interface components. Prefer extending these components over creating duplicate buttons, fields, cards, or layout primitives.

**`mobile/src/components/hooks/`**

Contains reusable React hooks, including network connectivity status.

**`mobile/src/constants/theme.ts`**

Defines the shared design system, including colors, spacing, radii, and typography.

---

## Getting Started

### Prerequisites

Install the following before developing:

- [Node.js](https://nodejs.org/) — use a version compatible with the project's Expo SDK.
- npm, or the package manager already used by the repository.
- [Git](https://git-scm.com/).
- [Expo Go](https://expo.dev/go/) for compatible development previews, or an iOS simulator, Android emulator, or development build as required by the project's native dependencies.

### 1. Clone the Repository

```bash
git clone https://github.com/Not-Secret-Dev/ShelfSync.git
cd ShelfSync
```

### 2. Enter the Mobile Project

```bash
cd mobile
```

### 3. Install Dependencies

If the project uses npm:

```bash
npm install
```

If the repository has a committed lockfile for another package manager, use that package manager and its corresponding install command instead.

### 4. Start Expo

```bash
npx expo start
```

Follow the terminal instructions to open the app on a connected device or simulator.

If a package is missing or incompatible, check the project's `package.json` and use Expo's compatibility-aware installer where appropriate:

```bash
npx expo install package-name
```

Replace `package-name` with the actual dependency you need to install.

---

## Running the App

From the `mobile/` directory:

### Start the development server

```bash
npx expo start
```

### Open on Android

```bash
npx expo start --android
```

### Open on iOS

```bash
npx expo start --ios
```

The iOS command requires macOS and an available iOS simulator for local simulator use.

### Open the web version, if supported

```bash
npx expo start --web
```

Web support depends on the project's installed dependencies and configuration.

If changes are not reflected correctly, restart Expo and clear its cache:

```bash
npx expo start --clear
```

---

## Available Scripts and Commands

Use the scripts defined in `mobile/package.json` as the source of truth.

The following commands are useful during development:

| Command                         | Purpose                                                   |
| ------------------------------- | --------------------------------------------------------- |
| `npx expo start`                | Start the Expo development server                         |
| `npx expo start --clear`        | Restart with a cleared Metro cache                        |
| `npx expo install package-name` | Install a dependency compatible with Expo                 |
| `npx tsc --noEmit`              | Run TypeScript type checking, if TypeScript is configured |
| `npx expo-doctor`               | Check common Expo configuration and dependency issues     |

These are development commands, not a guarantee that every command is already configured as an npm script.

---

## Application Architecture

### Navigation

ShelfSync uses Expo Router for file-based navigation.

The root layout is located at:

```text
mobile/src/app/_layout.tsx
```

Authentication routes are grouped under:

```text
mobile/src/app/(auth)/
```

Keep navigation behavior consistent across the authentication flow. Test back navigation, route replacement after successful authentication, and access to protected screens once authentication is integrated.

### Shared Components

Reusable UI components should own their visual presentation and common interaction patterns.

For example, use the shared `Button` component for consistent button styling and the shared `TextField` component for input styling and field-level error presentation.

Avoid duplicating theme values directly in individual screens when an existing design token or component already covers the use case.

### TypeScript

The project uses TypeScript with strict checking.

When changing a component:

1. Preserve its exported props and types unless a change is necessary.
2. Check the component's actual prop definitions before using it.
3. Use existing error and helper-text props instead of inventing unsupported styling props.
4. Run type checking after making changes.
5. Test the affected screen in the running app.

### Path Aliases

The current codebase uses imports such as:

```tsx
import { Button, Screen } from "@/components/ui";
import { colors, spacing } from "@/constants/theme";
```

Use the project's configured alias rather than introducing inconsistent relative imports. Confirm the exports in the relevant `index.ts` files before importing components from a barrel.

---

## Design System

The shared design system is defined in `mobile/src/constants/theme.ts`.

### Color Palette

| Token            | Value     | Purpose                         |
| ---------------- | --------- | ------------------------------- |
| `primary`        | `#1B4332` | Primary actions and brand color |
| `primaryPressed` | `#143326` | Pressed primary actions         |
| `secondary`      | `#2D6A4F` | Secondary brand color           |
| `background`     | `#F9F9F7` | Main screen background          |
| `surface`        | `#FFFFFF` | Cards and elevated surfaces     |
| `text`           | `#111827` | Primary text                    |
| `textSecondary`  | `#475569` | Secondary text                  |
| `textMuted`      | `#64748B` | Supporting text                 |
| `border`         | `#E5E7EB` | Standard borders                |
| `success`        | `#166534` | Success states                  |
| `warning`        | `#92400E` | Warning states                  |
| `danger`         | `#DC2626` | Error and destructive states    |

Use the existing tokens rather than hardcoding new colors in screen components.

### Spacing

The theme provides a consistent spacing scale:

| Token  | Value |
| ------ | ----: |
| `xs`   |     4 |
| `sm`   |     8 |
| `md`   |    12 |
| `lg`   |    16 |
| `xl`   |    24 |
| `xxl`  |    32 |
| `xxxl` |    48 |

### Border Radii

The theme includes small, medium, large, extra-large, and fully rounded radius tokens. Reuse these values to keep cards, fields, and buttons visually consistent.

### Typography

- **Inter:** Headings, labels, body text, and general UI.
- **JetBrains Mono:** Numeric values, stock quantities, and SKU-oriented information.

Ensure the fonts are loaded by the app configuration before relying on them in production.

### UI Guidelines

- Use inline field errors where possible.
- Provide visible loading, empty, and failure states.
- Make interactive elements large enough to tap comfortably.
- Use accessible labels for icon-only actions.
- Keep spacing and typography consistent across screens.
- Support small screens and keyboard-visible layouts.
- Do not use a success state to imply an operation completed unless the operation actually succeeded.

---

## Authentication Screens

The authentication UI currently includes four primary screens.

| Screen              | Route file            | Responsibility                                   |
| ------------------- | --------------------- | ------------------------------------------------ |
| Sign in             | `sign-in.tsx`         | Collect credentials and validate input           |
| Create account      | `create-account.tsx`  | Collect account details and validate fields      |
| Forgot password     | `forgot-password.tsx` | Collect an email address and show reset guidance |
| Verify device/email | `verify-device.tsx`   | Enter a verification code and handle resend UI   |

### Current UI Behavior

The screens include input validation and feedback intended to help users correct mistakes before submitting forms.

The forgot-password screen should continue to use a generic confirmation message that does not disclose whether a particular email address has an account.

The verification screen's countdown and six-digit code input are UI elements; they do not independently send or validate a real verification code.

### Remaining Authentication Work

Before authentication is production-ready, integrate and test:

- A real authentication service.
- Account creation and sign-in requests.
- Secure credential and session handling.
- Password-reset email delivery.
- Verification-code generation and server-side validation.
- Resend-code cooldown and rate limiting.
- Loading, timeout, and server-error handling.
- Sign-out and protected-route behavior.
- Appropriate error handling when the device is offline.

Never store passwords in plain text or treat a locally displayed success message as proof of authentication.

---

## Offline-First Design

Offline-first behavior is a central design goal for ShelfSync.

An offline-first application should not simply detect a lost connection. It should have a reliable strategy for reading and updating data locally and reconciling changes with a remote service.

### Intended Behavior

1. Read locally available inventory data without requiring a network request.
2. Allow supported inventory changes while offline.
3. Persist changes locally so they survive app restarts.
4. Track pending operations that require synchronization.
5. Retry synchronization when connectivity returns.
6. Handle failed requests and conflicting updates safely.
7. Communicate connection and synchronization status clearly.

### Network Status

The project includes a network-status hook:

```text
mobile/src/components/hooks/useNetworkStatus.ts
```

The UI also includes an offline banner:

```text
mobile/src/components/ui/offlineBanner.tsx
```

These can help communicate connectivity state, but connectivity detection alone does not provide offline persistence or synchronization.

### Recommended Data Strategy

When implementing the data layer, establish clear responsibilities for:

- Local persistence.
- A single inventory data model.
- A repository or service layer for reads and writes.
- Pending-operation tracking.
- Synchronization retries.
- Conflict resolution.
- Data validation and duplicate-operation protection.

Choose the local database and remote backend based on the app's requirements. Document the actual choices here once they have been integrated.

---

## Development Workflow

### Before Making Changes

1. Inspect the existing screen or component.
2. Check its prop types and current exports.
3. Reuse existing UI components and design tokens.
4. Identify any affected routes or screens.
5. Keep changes scoped to the requested functionality.

### After Making Changes

1. Run TypeScript checks.
2. Start the app and open the affected screen.
3. Test the normal flow and invalid input.
4. Test loading and failure states where applicable.
5. Check keyboard behavior and smaller screen sizes.
6. Review the final diff before committing.

### Commit Message Examples

```text
feat: add inventory item creation
fix: correct sign-in field validation
ui: standardize authentication screen spacing
refactor: reuse shared text field component
docs: update setup instructions
```

---

## Testing and Quality Checks

ShelfSync should be tested at the UI, application, and data layers as those layers are implemented.

### UI Testing

- [ ] All authentication screens render correctly.
- [ ] Field validation appears at the appropriate time.
- [ ] Password visibility toggles work.
- [ ] Navigation between authentication screens works.
- [ ] Keyboard interactions do not hide important controls.
- [ ] Buttons have appropriate disabled and loading states.
- [ ] Screen-reader labels are meaningful.
- [ ] Offline indicators accurately reflect connectivity.

### Inventory Testing

- [ ] Products can be created and edited.
- [ ] Search and filtering return the expected results.
- [ ] Stock increases and decreases are validated.
- [ ] Invalid stock changes are rejected.
- [ ] Low-stock states are displayed correctly.
- [ ] Inventory data persists across app restarts.

### Offline and Synchronization Testing

- [ ] Previously saved inventory remains available offline.
- [ ] Supported changes can be made without connectivity.
- [ ] Pending changes survive an app restart.
- [ ] Reconnection triggers the intended synchronization process.
- [ ] Failed synchronization can be retried.
- [ ] Duplicate operations are prevented or handled safely.
- [ ] Conflicting updates follow a defined policy.

### Release Readiness

- [ ] TypeScript checks pass.
- [ ] Expo configuration and dependency checks pass.
- [ ] Authentication uses a real, tested service.
- [ ] Secrets are not committed to the repository.
- [ ] Error states are tested.
- [ ] App permissions and platform-specific behavior are reviewed.
- [ ] A production build has been tested on target platforms.

---

## Implementation Roadmap

The following roadmap describes the intended progression of the project. It is not a claim that each feature has already been implemented.

### Phase 1 — UI Foundation

- [x] Establish a shared theme and design tokens.
- [x] Create reusable UI components.
- [x] Build the primary authentication screen layouts.
- [x] Add form validation and user feedback to authentication UI.
- [ ] Complete visual and interaction testing across target devices.

### Phase 2 — Authentication

- [ ] Integrate account creation and sign-in.
- [ ] Implement secure session handling.
- [ ] Connect password-reset requests.
- [ ] Connect device or email verification.
- [ ] Implement protected navigation and sign-out.
- [ ] Test authentication failures and offline behavior.

### Phase 3 — Inventory

- [ ] Define the inventory data model.
- [ ] Implement product creation and editing.
- [ ] Implement inventory listing, search, and filtering.
- [ ] Implement stock adjustment workflows.
- [ ] Add low-stock indicators and inventory summaries.
- [ ] Add validation and error handling.

### Phase 4 — Offline Persistence

- [ ] Select and implement local persistence.
- [ ] Support local reads and supported offline writes.
- [ ] Track pending changes.
- [ ] Implement synchronization and retry behavior.
- [ ] Define conflict-resolution rules.
- [ ] Test persistence through app restarts and network interruptions.

### Phase 5 — Quality and Release

- [ ] Add automated tests for critical workflows.
- [ ] Validate accessibility and responsive layouts.
- [ ] Review performance and data integrity.
- [ ] Configure production environment variables and secrets.
- [ ] Test production builds on target devices.
- [ ] Document deployment and support procedures.

---

## Contributing

Contributions should preserve ShelfSync's focus on reliable inventory workflows and a consistent user experience.

When contributing:

1. Keep changes focused and easy to review.
2. Reuse existing components and theme tokens.
3. Follow the project's TypeScript conventions.
4. Handle errors and offline scenarios explicitly.
5. Test affected screens and workflows.
6. Update this README when setup steps, architecture, or supported features change.

For substantial changes, open an issue or discussion first to explain the problem and proposed solution.

---

## License

No license information has been specified in this README.

Before distributing or accepting external contributions, add a `LICENSE` file and update this section with the project's chosen license. Until then, do not assume the repository is licensed for unrestricted reuse.

---

## Project Status

ShelfSync is being developed as an offline-first inventory management mobile application.

The current focus is establishing a consistent mobile UI, reusable components, and authentication screens. The next major milestones are completing UI testing, integrating real authentication, building the inventory data layer, and implementing reliable offline persistence and synchronization.

**The goal:** an inventory application that remains practical and dependable even when the network does not.
