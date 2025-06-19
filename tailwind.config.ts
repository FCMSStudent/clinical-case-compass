import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { typographyTokens } from "./src/lib/design-tokens";
import { colors } from "./src/lib/design-tokens";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',    // 16px - iOS standard mobile margin
				sm: '1.5rem',       // 24px - tablet margin
				md: '2rem',         // 32px - desktop margin
				lg: '3rem',         // 48px - large screen margin
			},
			screens: {
				'2xl': '1400px'     // Prevent overly wide content
			}
		},
		extend: {
			// 8pt Grid Spacing System
			spacing: {
				// Base 8pt increments with Apple-inspired values
				0: '0',
				1: '0.25rem',   // 4px - half-step for fine adjustments
				2: '0.5rem',    // 8px - base unit
				3: '0.75rem',   // 12px - 1.5x base
				4: '1rem',      // 16px - 2x base (standard iOS margin)
				5: '1.25rem',   // 20px - 2.5x base
				6: '1.5rem',    // 24px - 3x base
				8: '2rem',      // 32px - 4x base
				10: '2.5rem',   // 40px - 5x base
				12: '3rem',     // 48px - 6x base
				16: '4rem',     // 64px - 8x base
				20: '5rem',     // 80px - 10x base
				24: '6rem',     // 96px - 12x base
				32: '8rem',     // 128px - 16x base
				40: '10rem',    // 160px - 20x base
				48: '12rem',    // 192px - 24x base
				56: '14rem',    // 224px - 28x base
				64: '16rem',    // 256px - 32x base
			},
			fontFamily: {
				sans: typographyTokens.fontFamily.sans,
				mono: typographyTokens.fontFamily.mono,
			},
			fontWeight: {
				normal: typographyTokens.fontWeight.normal,
				medium: typographyTokens.fontWeight.medium,
				semibold: typographyTokens.fontWeight.semibold,
				bold: typographyTokens.fontWeight.bold,
			},
			colors: {
				primary: colors.primary,
				gray: colors.gray,
				success: colors.success,
				warning: colors.warning,
				error: colors.error,
				info: colors.info,
			},
			fontSize: {
				'2xs': typographyTokens.fontSize['2xs'],
				xs: typographyTokens.fontSize.xs,
				sm: typographyTokens.fontSize.sm,
				base: typographyTokens.fontSize.base,
				lg: typographyTokens.fontSize.lg,
				xl: typographyTokens.fontSize.xl,
				'2xl': typographyTokens.fontSize['2xl'],
				'3xl': typographyTokens.fontSize['3xl'],
				'4xl': typographyTokens.fontSize['4xl'],
				'5xl': typographyTokens.fontSize['5xl'],
				'6xl': typographyTokens.fontSize['6xl'],
				'7xl': typographyTokens.fontSize['7xl'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Apple-inspired max-widths for readable content
			maxWidth: {
				'readable': '56rem',      // 896px - optimal reading width
				'comfortable': '64rem',   // 1024px - comfortable content width
				'spacious': '72rem',      // 1152px - spacious content width
			},
			// Apple-inspired min-height for touch targets
			minHeight: {
				'touch': '2.75rem',       // 44px - Apple's minimum touch target
				'touch-lg': '3rem',       // 48px - larger touch target
			},
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
