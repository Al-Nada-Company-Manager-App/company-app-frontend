# UI Components

This folder contains reusable UI components built with Ant Design that support both light and dark themes.

## Loading Component

A flexible loading spinner component with customizable size and dark mode support.

### Props

- `size`: `'small' | 'default' | 'large' | number` - Size of the spinner
- `message`: `string` - Text to display below the spinner
- `containerStyle`: `React.CSSProperties` - Custom styles for the container
- `textStyle`: `React.CSSProperties` - Custom styles for the text
- `className`: `string` - Additional CSS classes
- `isDark`: `boolean` - Enable dark mode styling (default: false)

### Usage Examples

```tsx
import { Loading } from '../UI';

// Basic usage
<Loading />

// With dark mode
<Loading isDark={true} />

// With custom message and size in dark mode
<Loading
  size="large"
  message="Loading employees..."
  isDark={isDark}
/>

// With custom styling
<Loading
  size={48}
  message="Please wait..."
  isDark={isDark}
  containerStyle={{ minHeight: '300px', backgroundColor: 'transparent' }}
  textStyle={{ fontSize: '16px' }}
/>
```

## ErrorDisplay Component

A comprehensive error display component supporting various error states, actions, and dark mode.

### Props

- `status`: `'403' | '404' | '500' | 'error' | 'warning'` - Error status type
- `title`: `string` - Custom title (optional, defaults based on status)
- `subTitle`: `string` - Custom subtitle (optional, defaults based on status)
- `message`: `string` - Error message
- `onRetry`: `() => void` - Retry button callback
- `onGoHome`: `() => void` - Home button callback
- `showRetryButton`: `boolean` - Show/hide retry button (default: true)
- `showHomeButton`: `boolean` - Show/hide home button (default: false)
- `retryButtonText`: `string` - Custom retry button text
- `homeButtonText`: `string` - Custom home button text
- `extraActions`: `React.ReactNode[]` - Additional action buttons
- `details`: `string[]` - Detailed error messages
- `className`: `string` - Additional CSS classes
- `style`: `React.CSSProperties` - Custom styles
- `isDark`: `boolean` - Enable dark mode styling (default: false)

### Usage Examples

```tsx
import { ErrorDisplay } from '../UI';

// Basic error with dark mode
<ErrorDisplay
  status="error"
  message="Something went wrong"
  onRetry={() => window.location.reload()}
  isDark={isDark}
/>

// 404 error in dark mode
<ErrorDisplay
  status="404"
  onGoHome={() => navigate('/')}
  showHomeButton={true}
  showRetryButton={false}
  isDark={isDark}
/>

// Custom error with details in dark mode
<ErrorDisplay
  status="error"
  title="Validation Failed"
  subTitle="Please fix the following issues:"
  details={[
    "Email is required",
    "Password must be at least 8 characters"
  ]}
  onRetry={handleRetry}
  isDark={isDark}
  extraActions={[
    <Button key="help" onClick={showHelp}>Get Help</Button>
  ]}
/>
```

## Dark Mode Features

Both components automatically adjust their styling based on the `isDark` prop:

### Loading Component Dark Mode

- **Spinner Color**: Changes from blue (`#1890ff`) to white (`#ffffff`)
- **Text Color**: Changes from gray (`#666`) to light gray (`#a0aec0`)
- **Background**: Remains transparent for flexibility

### ErrorDisplay Component Dark Mode

- **Text Color**: All text changes to white (`#ffffff`) for titles
- **Detail Text**: Uses light gray (`#a0aec0`) for better readability
- **Error Icons**: Maintains red color (`#ff4d4f`) for visibility
- **Background**: Transparent to work with container styling

## Theme Integration

The components work seamlessly with your existing theme system:

```tsx
// In your component
const { isDark, theme } = useTheme();

// Loading with theme integration
<Loading
  isDark={isDark}
  textStyle={{ color: theme.title.color }}
  containerStyle={{
    background: theme.container.background,
    backdropFilter: theme.container.backdropFilter,
  }}
/>

// Error with theme integration
<ErrorDisplay
  isDark={isDark}
  style={{
    background: theme.container.background,
    backdropFilter: theme.container.backdropFilter,
  }}
/>
```

## Styling

Both components inherit theme colors and can be styled using:

- The `isDark` prop for automatic dark mode styling
- Custom CSS classes via `className` prop
- Inline styles via `style` or specific style props
- Ant Design theme customization

The components are designed to work well with both light and dark themes and will automatically adjust their appearance based on the `isDark` prop.

## ErrorDisplay Component

A comprehensive error display component supporting various error states and actions.

### Props

- `status`: `'403' | '404' | '500' | 'error' | 'warning'` - Error status type
- `title`: `string` - Custom title (optional, defaults based on status)
- `subTitle`: `string` - Custom subtitle (optional, defaults based on status)
- `message`: `string` - Error message
- `onRetry`: `() => void` - Retry button callback
- `onGoHome`: `() => void` - Home button callback
- `showRetryButton`: `boolean` - Show/hide retry button (default: true)
- `showHomeButton`: `boolean` - Show/hide home button (default: false)
- `retryButtonText`: `string` - Custom retry button text
- `homeButtonText`: `string` - Custom home button text
- `extraActions`: `React.ReactNode[]` - Additional action buttons
- `details`: `string[]` - Detailed error messages
- `className`: `string` - Additional CSS classes
- `style`: `React.CSSProperties` - Custom styles

### Usage Examples

```tsx
import { ErrorDisplay } from '../UI';

// Basic error
<ErrorDisplay
  status="error"
  message="Something went wrong"
  onRetry={() => window.location.reload()}
/>

// 404 error
<ErrorDisplay
  status="404"
  onGoHome={() => navigate('/')}
  showHomeButton={true}
  showRetryButton={false}
/>

// Custom error with details
<ErrorDisplay
  status="error"
  title="Validation Failed"
  subTitle="Please fix the following issues:"
  details={[
    "Email is required",
    "Password must be at least 8 characters"
  ]}
  onRetry={handleRetry}
  extraActions={[
    <Button key="help" onClick={showHelp}>Get Help</Button>
  ]}
/>

// 403 Forbidden
<ErrorDisplay
  status="403"
  onGoHome={() => navigate('/')}
  showHomeButton={true}
  showRetryButton={false}
/>

// Server error
<ErrorDisplay
  status="500"
  onRetry={handleRetry}
  onGoHome={() => navigate('/')}
  showRetryButton={true}
  showHomeButton={true}
/>
```

## Styling

Both components inherit theme colors and can be styled using:

- Custom CSS classes via `className` prop
- Inline styles via `style` or specific style props
- Ant Design theme customization

The components are designed to work well with both light and dark themes.
