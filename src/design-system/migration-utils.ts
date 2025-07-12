// ────────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM MIGRATION UTILITIES
// ────────────────────────────────────────────────────────────────────────────────

import { UnifiedDesignSystem } from './unified-system';

/**
 * Migration utilities to help convert existing components to use the unified design system
 */

// Common style patterns to replace
export const LEGACY_STYLE_PATTERNS = {
  // Background patterns
  backgrounds: {
    'bg-white/10': 'glass.subtle',
    'bg-white/20': 'glass.elevated',
    'bg-white/25': 'glass.overlay',
    'backdrop-blur-md': 'glassmorphic',
    'backdrop-blur-lg': 'glass.elevated',
    'backdrop-blur-xl': 'glass.overlay',
  },
  
  // Border patterns
  borders: {
    'border-white/20': 'border-white/20', // Keep as is
    'border-white/30': 'border-white/30', // Keep as is
    'rounded-lg': 'borderRadius.md',
    'rounded-xl': 'borderRadius.lg',
    'rounded-2xl': 'borderRadius.xl',
  },
  
  // Shadow patterns
  shadows: {
    'shadow-lg': 'shadows.lg',
    'shadow-xl': 'shadows.xl',
    'shadow-2xl': 'shadows.2xl',
  },
  
  // Spacing patterns
  spacing: {
    'p-4': 'spacing.md',
    'p-6': 'spacing.lg',
    'p-8': 'spacing.xl',
    'px-4': 'spacing.md',
    'py-2': 'spacing.sm',
    'gap-4': 'spacing.md',
    'gap-6': 'spacing.lg',
  },
  
  // Text patterns
  text: {
    'text-sm': 'typographyTokens.fontSize.sm',
    'text-base': 'typographyTokens.fontSize.base',
    'text-lg': 'typographyTokens.fontSize.lg',
    'font-medium': 'typographyTokens.fontWeight.medium',
    'font-semibold': 'typographyTokens.fontWeight.semibold',
  },
} as const;

/**
 * Convert legacy className to unified design system classes
 */
export function migrateClassName(legacyClassName: string): string {
  let migratedClassName = legacyClassName;
  
  // Replace background patterns
  Object.entries(LEGACY_STYLE_PATTERNS.backgrounds).forEach(([legacy, replacement]) => {
    migratedClassName = migratedClassName.replace(
      new RegExp(`\\b${legacy}\\b`, 'g'),
      replacement
    );
  });
  
  // Replace spacing patterns
  Object.entries(LEGACY_STYLE_PATTERNS.spacing).forEach(([legacy, replacement]) => {
    migratedClassName = migratedClassName.replace(
      new RegExp(`\\b${legacy}\\b`, 'g'),
      replacement
    );
  });
  
  return migratedClassName;
}

/**
 * Get unified component variant based on legacy props
 */
export function getUnifiedVariant(component: 'button' | 'card' | 'input', legacyProps: any) {
  const { components } = UnifiedDesignSystem;
  
  switch (component) {
    case 'button':
      return getButtonVariant(legacyProps);
    case 'card':
      return getCardVariant(legacyProps);
    case 'input':
      return getInputVariant(legacyProps);
    default:
      return '';
  }
}

function getButtonVariant(props: any): string {
  const { variant, size, className } = props;
  
  if (className?.includes('destructive')) return UnifiedDesignSystem.components.buttonVariants.destructive;
  if (className?.includes('success')) return UnifiedDesignSystem.components.buttonVariants.success;
  if (className?.includes('warning')) return UnifiedDesignSystem.components.buttonVariants.warning;
  if (className?.includes('error')) return UnifiedDesignSystem.components.buttonVariants.error;
  if (className?.includes('info')) return UnifiedDesignSystem.components.buttonVariants.info;
  if (className?.includes('medical')) return UnifiedDesignSystem.components.buttonVariants.medical;
  if (className?.includes('critical')) return UnifiedDesignSystem.components.buttonVariants.critical;
  
  switch (variant) {
    case 'primary':
      return UnifiedDesignSystem.components.buttonVariants.primary;
    case 'secondary':
      return UnifiedDesignSystem.components.buttonVariants.secondary;
    case 'outline':
      return UnifiedDesignSystem.components.buttonVariants.outline;
    case 'ghost':
      return UnifiedDesignSystem.components.buttonVariants.ghost;
    default:
      return UnifiedDesignSystem.components.buttonVariants.primary;
  }
}

function getCardVariant(props: any): string {
  const { variant, className } = props;
  
  if (className?.includes('elevated')) return UnifiedDesignSystem.components.card.variant.elevated;
  if (className?.includes('interactive')) return UnifiedDesignSystem.components.card.variant.interactive;
  if (className?.includes('featured')) return UnifiedDesignSystem.components.card.variant.featured;
  if (className?.includes('compact')) return UnifiedDesignSystem.components.card.variant.compact;
  if (className?.includes('navigation')) return UnifiedDesignSystem.components.card.variant.navigation;
  if (className?.includes('modal')) return UnifiedDesignSystem.components.card.variant.modal;
  if (className?.includes('alert')) return UnifiedDesignSystem.components.card.variant.alert;
  
  switch (variant) {
    case 'elevated':
      return UnifiedDesignSystem.components.card.variant.elevated;
    case 'interactive':
      return UnifiedDesignSystem.components.card.variant.interactive;
    case 'featured':
      return UnifiedDesignSystem.components.card.variant.featured;
    case 'compact':
      return UnifiedDesignSystem.components.card.variant.compact;
    default:
      return UnifiedDesignSystem.components.card.variant.default;
  }
}

function getInputVariant(props: any): string {
  const { size, className } = props;
  
  let baseClass = UnifiedDesignSystem.components.input.base;
  
  switch (size) {
    case 'sm':
      baseClass += ` ${UnifiedDesignSystem.components.input.size.sm}`;
      break;
    case 'lg':
      baseClass += ` ${UnifiedDesignSystem.components.input.size.lg}`;
      break;
    default:
      baseClass += ` ${UnifiedDesignSystem.components.input.size.md}`;
  }
  
  return baseClass;
}

/**
 * Apply glass effect to component
 */
export function applyGlassEffect(component: string, variant: string = 'card'): string {
  const { glass } = UnifiedDesignSystem.components;
  
  switch (component) {
    case 'card':
      return glass.card;
    case 'modal':
      return glass.modal;
    case 'navigation':
      return glass.navigation;
    case 'alert':
      return glass.alert;
    case 'dropdown':
      return glass.dropdown;
    case 'overlay':
      return glass.overlay;
    default:
      return glass[variant as keyof typeof glass] || glass.card;
  }
}

/**
 * Generate unified component props
 */
export function generateUnifiedProps(component: string, legacyProps: any) {
  const baseProps = { ...legacyProps };
  
  // Remove legacy className and replace with unified
  if (baseProps.className) {
    baseProps.className = migrateClassName(baseProps.className);
  }
  
  // Add glass effect if specified
  if (baseProps.glassEffect) {
    const glassClass = applyGlassEffect(component, baseProps.glassEffect);
    baseProps.className = `${baseProps.className || ''} ${glassClass}`.trim();
    delete baseProps.glassEffect;
  }
  
  // Add unified variant
  if (baseProps.variant) {
    const unifiedVariant = getUnifiedVariant(component as any, baseProps);
    baseProps.className = `${baseProps.className || ''} ${unifiedVariant}`.trim();
  }
  
  return baseProps;
}

/**
 * Batch migration utility for multiple components
 */
export function batchMigrateComponents(components: Array<{
  component: string;
  props: any;
  type: 'button' | 'card' | 'input';
}>) {
  return components.map(({ component, props, type }) => ({
    component,
    props: generateUnifiedProps(type, props),
    type
  }));
}

/**
 * Validate component against design system
 */
export function validateComponent(component: string, props: any): {
  isValid: boolean;
  warnings: string[];
  suggestions: string[];
} {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  // Check for hardcoded values
  if (props.className) {
    const hardcodedPatterns = [
      /bg-\w+-\d+/,
      /text-\w+-\d+/,
      /p-\d+/,
      /m-\d+/,
      /w-\d+/,
      /h-\d+/
    ];
    
    hardcodedPatterns.forEach(pattern => {
      if (pattern.test(props.className)) {
        warnings.push(`Hardcoded value found: ${props.className.match(pattern)?.[0]}`);
        suggestions.push('Use design tokens instead of hardcoded values');
      }
    });
  }
  
  // Check for missing accessibility props
  if (component === 'button' && !props['aria-label'] && !props.children) {
    warnings.push('Button missing accessible label');
    suggestions.push('Add aria-label or descriptive children');
  }
  
  // Check for missing focus management
  if (['button', 'input', 'select'].includes(component) && !props.className?.includes('focus')) {
    suggestions.push('Consider adding focus ring styles');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
    suggestions
  };
}

/**
 * Generate migration report
 */
export function generateMigrationReport(components: Array<{
  component: string;
  props: any;
  type: 'button' | 'card' | 'input';
  filePath: string;
}>) {
  const report = {
    total: components.length,
    migrated: 0,
    warnings: 0,
    errors: 0,
    details: [] as Array<{
      component: string;
      filePath: string;
      status: 'success' | 'warning' | 'error';
      issues: string[];
    }>
  };
  
  components.forEach(({ component, props, type, filePath }) => {
    const validation = validateComponent(component, props);
    const unifiedProps = generateUnifiedProps(type, props);
    
    let status: 'success' | 'warning' | 'error';
    if (validation.isValid) {
      status = 'success';
    } else if (validation.warnings.length > 0) {
      status = 'warning';
    } else {
      status = 'error';
    }
    
    const detail = {
      component,
      filePath,
      status,
      issues: [...validation.warnings, ...validation.suggestions]
    };
    
    report.details.push(detail);
    
    if (detail.status === 'success') report.migrated++;
    if (detail.status === 'warning') report.warnings++;
    if (detail.status === 'error') report.errors++;
  });
  
  return report;
}

export default {
  migrateClassName,
  getUnifiedVariant,
  applyGlassEffect,
  generateUnifiedProps,
  batchMigrateComponents,
  validateComponent,
  generateMigrationReport,
  LEGACY_STYLE_PATTERNS
};