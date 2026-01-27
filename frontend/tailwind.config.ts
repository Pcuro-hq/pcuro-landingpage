import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				variant: '#B5B9D9',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			neutral: {
  				'700': '#4F3D72',
  				'800': '#271E39',
  				'900': '#1B1E23'
  			},
  			brand: {
  				blue: '#1F3062',
  				purple: '#5E16EA',
  				green: '#CADD99'
  			},
  			text: {
  				primary: '#130927',
  				secondary: '#271E39',
  				muted: '#4F3D72'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			gabarito: [
  				'Gabarito',
  				'sans-serif'
  			],
  			roboto: [
  				'Roboto',
  				'sans-serif'
  			],
		'ibm-plex': [
				'"IBM Plex Sans"',
				'sans-serif'
			],
			'egyptian-slate': [
				'"EgyptianSlateW01-Black"',
				'sans-serif'
			]
  		},
  		fontSize: {
  			display: [
  				'64px',
  				{
  					lineHeight: '1',
  					fontWeight: '700'
  				}
  			],
  			h1: [
  				'32px',
  				{
  					lineHeight: '1',
  					fontWeight: '600'
  				}
  			],
  			h2: [
  				'32px',
  				{
  					lineHeight: '1',
  					fontWeight: '600'
  				}
  			],
  			h3: [
  				'22px',
  				{
  					lineHeight: '1',
  					fontWeight: '600'
  				}
  			],
  			h4: [
  				'18px',
  				{
  					lineHeight: '1',
  					fontWeight: '500'
  				}
  			],
  			'card-title': [
  				'24px',
  				{
  					lineHeight: '1',
  					fontWeight: '600'
  				}
  			],
  			'body-lg': [
  				'18px',
  				{
  					lineHeight: '25px',
  					fontWeight: '400'
  				}
  			],
  			body: [
  				'16px',
  				{
  					lineHeight: '1.4',
  					fontWeight: '400'
  				}
  			]
  		},
  		boxShadow: {
  			glass: '0px 0px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  			'glass-secondary': '0px 0px 6px 0px #B5B9D9, 0px 4px 6px 0px #B5B9D9',
  			card: '0px 2px 4px 0px rgba(39, 39, 39, 0.1)',
  			button: '0px 0px 4px 0px rgba(0, 0, 0, 0.25), 0px 6px 6px 0px rgba(0, 0, 0, 0.25)',
  			toggle: '1px 1px 4px 1px rgba(39, 39, 39, 0.5)'
  		},
  		borderRadius: {
  			xl: '16px',
  			'2xl': '24px',
  			'3xl': '40px',
  			'4xl': '48px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'gradient-feature': 'linear-gradient(127deg, rgba(107, 44, 243, 0.15) 11%, rgba(202, 221, 153, 0.15) 72%)',
  			'gradient-communicate': 'linear-gradient(94deg, rgba(107, 44, 243, 0.15) 13%, rgba(202, 221, 153, 0.15) 63%)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
