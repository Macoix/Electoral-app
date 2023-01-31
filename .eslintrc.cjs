
module.exports = {
	// ...
	extends: ['ts-standard',],
	rules: {
		'no-tabs': 'off',
		indent: 'off',
		'space-before-function-paren': 'off'
	},
	// ...
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro']
			},
			rules: {}
		}
	]
}
