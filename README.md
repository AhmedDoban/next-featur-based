## Project Architecture Overview

This is a **feature-based Next.js 14 application** with internationalization (i18n), Redux Toolkit state management, and a modular component system. The codebase follows a domain-driven design where features are self-contained modules.

### Key Architectural Patterns

- **Feature-First Structure**: Code is organized by business domains (`features/auth/`, `features/products/`) rather than technical layers
- **Internationalization**: Uses `next-intl` with locale-based routing (`[locale]` dynamic routes)
- **Multi-Step Forms**: Leverages `FormikStepper` component for wizard-like form flows
- **Custom Component Library**: Consistent input components in `components/Inputs/` with Formik integration

## Critical Development Workflows

### Development Commands

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # ESLint validation
```

### Internationalization Setup

- **Locale Configuration**: `i18n/routing.ts` defines supported locales (`en`, `ar`)
- **Message Files**: Add translations to `messages/en.json` and `messages/ar.json`
- **RTL Support**: Arabic automatically sets `dir="rtl"` and uses Arabic fonts
- **Translation Usage**: Always use `useTranslations()` hook for text content

## Project-Specific Conventions

### State Management Architecture

- **Redux Toolkit Query**: API calls use RTK Query slices (see `store/Slices/ProductsSlice.tsx`)
- **Base Query Setup**: `store/baseQuery.ts` handles authentication headers and language headers automatically
- **Cookie Integration**: Uses `cookies-next` for client-side cookie management with auth tokens

### Component Patterns

#### Custom Input Components

- **Location**: All inputs in `components/Inputs/[ComponentName]/`
- **Integration**: Built for Formik with `useField` hook
- **Naming**: Follow `Custom[Type]Input` pattern (e.g., `CustomPhoneInput`, `CustomOtpInput`)
- **Styling**: Each component has its own CSS file following BEM methodology

#### Form Architecture

- **Multi-Step Forms**: Use `FormikStepper` wrapper with step state management
- **Validation**: Yup schemas defined inline with form components
- **Example Pattern**:

```jsx
<FormikStepper
  initialValues={{}}
  validationSchema={Yup.object().shape({})}
  Step={Step}
  SetStep={SetStep}
  onSubmit={(values) => {}}
>
  {/* Form steps as children */}
</FormikStepper>
```

### Feature Module Structure

Each feature follows this pattern:

```
features/[feature-name]/
  ├── [FeatureName].jsx          # Main feature component
  ├── [FeatureName].css          # Feature-specific styles
  └── components/                # Feature-scoped components
```

### API Integration Patterns

- **Server Components**: Use `useAxiosData` hook for server-side data fetching
- **Client Components**: Use RTK Query hooks for client-side API calls
- **Authentication**: Token automatically attached via base query configuration
- **Language Headers**: `Accept-Language` header set from cookie (`NEXT_LOCALE`)

## File Naming and Organization

### CSS Architecture

- **Global Styles**: `style/` directory with `Root.css`, `Style.css`, `Normalize.css`
- **Component Styles**: Co-located with components using same name
- **Fonts**: Custom fonts in `style/Fonts/` with Arabic support

### Key Integration Points

- **Middleware**: `middleware.ts` handles locale routing and auth redirects (currently commented)
- **Layout Providers**: Nested provider pattern in `app/[locale]/layout.tsx`:
  - ToastProvider → NextIntlClientProvider → Loading → AOSProvider → StoreProvider
- **Font Loading**: Conditional font family based on locale (`HelveticaNeueLTArabic` for Arabic)

## Development Guidelines

### When Adding New Features

1. Create feature directory under `features/`
2. Build feature-specific components within the feature
3. Add translations to both `en.json` and `ar.json`
4. Use existing custom input components for consistency
5. Follow the FormikStepper pattern for multi-step workflows

### When Creating Components

1. Place reusable components in `components/`
2. Feature-specific components stay within `features/[feature]/components/`
3. Always include TypeScript interfaces for props
4. Co-locate CSS files with component files
5. Use `useTranslations()` for any user-facing text

### API Development

- Extend RTK Query slices for new endpoints
- Authentication and language headers are handled automatically
- Use TypeScript interfaces for API response types
- Follow the baseQuery pattern for consistent error handling
