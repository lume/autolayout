export default {
	useTabs: true,
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: false,
	printWidth: 120,
	arrowParens: 'avoid',

	overrides: [{files: ['*.md', '*.yml'], options: {useTabs: false, tabWidth: 2}}],
}
