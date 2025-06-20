import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { typographyTokens } from "./src/design-system/tokens/design-tokens";
import { colors } from "./src/design-system/tokens/design-tokens";

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
				DEFAULT: '1rem',
				md: '2rem',
				lg: '3rem',
			},
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
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
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
