/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D6EFD",
        secondary: "#6C757D",
        success: "#2AA174",
        danger: "#FF3544",
        warning: "#FFC107",
        info: "#17A2B8",
        light: "#F8F9FA",
        dark: "#343A40",
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
        primaryColor: {
          900: "#2D2D2D",
          500: "#222222",
          300: "#9e9e9e",
        },
        mouseHoverColor: {
          900: "#2D2D2D",
        },
        grey: {
          900: "#2D2D2D",
          800: "#ABABAB",
          300: "#F2F2F2",
          700: "#757575",
        },
        borderFill: {
          900: "#F2F2F2",
          800: "#E2E2E2",
          700: "#ABABAB",
          600: "F1F1F1",
          500: "#D9D9D9",
          400: "#FF7070",
          300: "#eeeeef",
        },
        boxFill: {
          900: "#f2f2f2",
        },
        backgroundFill: {
          900: "#2D2D2D",
        },
        buttonFill: {
          900: "w-30 h-7", // Note: this is not a valid color value, Tailwind CSS expects hex, rgb, or named colors
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
    screens: {
      "4xl": { max: "2047px" },
      "3xl": { max: "1791px" },
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },

      "min-2xl": { min: "1536px" },
      "min-xl": { min: "1280px" },
      "min-lg": { min: "1024px" },
      "min-md": { min: "768px" },
      "min-sm": { min: "640px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
