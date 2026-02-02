/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F7F9FC",
                primary: "#6C63FF",
                secondary: "#FF6584",
                accent: "#48BB78",
                surface: "#FFFFFF",
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
            },
        },
    },
    plugins: [],
}
