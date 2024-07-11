
export default {
	content: [
	'./src/**/*.{astro,html,js,jsx,md,mdx,svelve,ts,tsx,vue}'],
	darkMode: 'class', // o 'media'
	theme: {
	extend: {
		colors: {
		'Verde': '#A3E784',
		'Color_carta': '#FBFCFF',
		'Verde_claro': '#A3E784',
		'Gris_Oscuro': '#F5F6FA',
		'Borde_gris':'#B9B9B9',
		'custom-green': 'rgba(163, 231, 132, 1)',

		},
		fontFamily: {
		'Inter': ['Inter', 'sans-serif'],
		},
		maxWidth: {
        'max-1200': '1200px',
      },
	},
	},
	variants: {},
	plugins: [],
}

