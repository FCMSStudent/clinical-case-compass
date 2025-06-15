
export const typography = {
  // Headings
  h1: `text-4xl font-bold leading-tight tracking-tight text-white`,
  h2: `text-3xl font-bold leading-tight tracking-tight text-white`,
  h3: `text-2xl font-semibold leading-tight tracking-tight text-white`,
  h4: `text-xl font-semibold leading-snug text-white`,
  h5: `text-lg font-semibold leading-snug text-white`,
  h6: `text-base font-semibold leading-normal text-white`,
  
  // Body text
  body: {
    large: `text-lg leading-relaxed text-white`,
    default: `text-base leading-relaxed text-white`,
    small: `text-sm leading-normal text-white/70`,
    caption: `text-xs leading-tight text-white/60`
  },
  
  // Labels and form elements
  label: `text-sm font-medium leading-none text-white`,
  description: `text-sm leading-normal text-white/70`,
  placeholder: `placeholder:text-white/60`
} as const;
