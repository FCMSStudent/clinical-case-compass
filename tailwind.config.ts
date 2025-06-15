import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { designTokens } from "./src/lib/design-tokens";

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
			// Enhanced font family system
			fontFamily: {
				sans: designTokens.fontFamily.primary,
				mono: designTokens.fontFamily.monospace,
				medical: designTokens.fontFamily.medical,
			},
			
			// Standardized font weights
			fontWeight: {
				light: designTokens.fontWeight.light,
				normal: designTokens.fontWeight.normal,
				medium: designTokens.fontWeight.medium,
				semibold: designTokens.fontWeight.semibold,
				bold: designTokens.fontWeight.bold,
				black: designTokens.fontWeight.black,
			},
			
			// Enhanced color system with CSS variables
			colors: {
				// Base system colors (shadcn/ui compatible)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: designTokens.baseColors.primary[50],
					100: designTokens.baseColors.primary[100],
					200: designTokens.baseColors.primary[200],
					300: designTokens.baseColors.primary[300],
					400: designTokens.baseColors.primary[400],
					500: designTokens.baseColors.primary[500],
					600: designTokens.baseColors.primary[600],
					700: designTokens.baseColors.primary[700],
					800: designTokens.baseColors.primary[800],
					900: designTokens.baseColors.primary[900],
					950: designTokens.baseColors.primary[950],
				},
				
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				
				// Enhanced neutral colors
				neutral: designTokens.baseColors.neutral,
				
				// Status colors with full scales
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					...designTokens.baseColors.success
				},
				
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					...designTokens.baseColors.warning
				},
				
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))',
					...designTokens.baseColors.error
				},
				
				// Medical specialty colors
				medical: {
					DEFAULT: 'hsl(var(--medical))',
					foreground: 'hsl(var(--medical-foreground))',
					50: 'hsl(var(--medical-50))',
					100: 'hsl(var(--medical-100))',
					200: 'hsl(var(--medical-200))',
					300: 'hsl(var(--medical-300))',
					400: 'hsl(var(--medical-400))',
					500: 'hsl(var(--medical-500))',
					600: 'hsl(var(--medical-600))',
					700: 'hsl(var(--medical-700))',
					800: 'hsl(var(--medical-800))',
					900: 'hsl(var(--medical-900))',
				},
				
				cardiology: designTokens.baseColors.cardiology,
				neurology: designTokens.baseColors.neurology,
				orthopedic: designTokens.baseColors.orthopedic,
			},
			
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			
			// Enhanced opacity scale
			opacity: designTokens.opacity,
			
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'spin-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				}
			},
			
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'spin-slow': 'spin-slow 20s linear infinite'
			},
			
			// Standardized typography scales
			fontSize: Object.fromEntries(
				Object.entries(designTokens.fontSize).map(([key, value]) => [
					key,
					[value.size, { lineHeight: value.lineHeight }]
				])
			),
			
			spacing: {
				'0': '0',
				'1': '0.25rem',    // 4px
				'2': '0.5rem',     // 8px
				'3': '0.75rem',    // 12px
				'4': '1rem',       // 16px
				'5': '1.25rem',    // 20px
				'6': '1.5rem',     // 24px
				'7': '1.75rem',    // 28px
				'8': '2rem',       // 32px
				'9': '2.25rem',    // 36px
				'10': '2.5rem',    // 40px
				'11': '2.75rem',   // 44px
				'12': '3rem',      // 48px
				'14': '3.5rem',    // 56px
				'16': '4rem',      // 64px
				'20': '5rem',      // 80px
				'24': '6rem',      // 96px
				'28': '7rem',      // 112px
				'32': '8rem',      // 128px
				'36': '9rem',      // 144px
				'40': '10rem',     // 160px
				'44': '11rem',     // 176px
				'48': '12rem',     // 192px
				'52': '13rem',     // 208px
				'56': '14rem',     // 224px
				'60': '15rem',     // 240px
				'64': '16rem',     // 256px
				'72': '18rem',     // 288px
				'80': '20rem',     // 320px
				'96': '24rem',     // 384px
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
