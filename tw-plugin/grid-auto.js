const plugin = require('tailwindcss/plugin');

const gridAuto = plugin(
	function ({ matchUtilities, theme }) {
		matchUtilities(
			{
				'grid-auto-fill': (value) => ({
					gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${value}), 1fr))`
				}),
				'grid-auto-fit': (value) => ({
					gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${value}), 1fr))`
				})
			},
			{ values: theme('gridAuto') }
		);
	},
	{
		theme: {
			gridAuto: {
				DEFAULT: '16rem',
				xs: '12rem',
				sm: '14rem',
				md: '16rem',
				lg: '18rem',
				xl: '20rem'
			}
		}
	}
);
module.exports = gridAuto;
