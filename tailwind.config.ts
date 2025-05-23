import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
        vscode: {
          blue: "#569cd6",
          lightBlue: "#9cdcfe",
          cyan: "#4ec9b0",
          yellow: "#dcdcaa",
          orange: "#ce9178",
          green: "#6a9955",
          red: "#f44747",
          purple: "#c586c0",
          background: "#1e1e1e",
          darkBackground: "#252526",
          border: "#3e3e3e",
          statusBar: "#007acc",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#d4d4d4",
            a: {
              color: "#569cd6",
              "&:hover": {
                color: "#9cdcfe",
              },
            },
            h1: {
              color: "#569cd6",
            },
            h2: {
              color: "#4ec9b0",
            },
            h3: {
              color: "#dcdcaa",
            },
            code: {
              color: "#ce9178",
              backgroundColor: "#2d2d2d",
              padding: "0.2em 0.4em",
              borderRadius: "3px",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
export default config
