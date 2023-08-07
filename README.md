# eslint-plugin-auto-optional-chain

This is an ESLint plugin that provides a custom rule to automatically convert dot operators (.) to optional chain operators (?.) in your code.

## Installation

You can install this plugin using npm:

```bash
npm install eslint-plugin-auto-optional-chain --save-dev
```

## Usage

1. Install the plugin as shown above.

2. Add the plugin to your ESLint configuration:

```javascript
module.exports = {
	plugins: ["eslint-plugin-auto-optional-chain"],
	rules: {
		"auto-optional-chain/auto-optional-chain": "error",
		// ...other rules
	},
};
```

3. Run ESLint with your configuration:

```bash
eslint yourFile.js
```

The `auto-optional-chain` rule will detect instances where dot operators should be replaced with optional chain operators.

## Rule Details

This rule enforces the usage of optional chain operators over dot operators.

### Example

Examples of incorrect code for this rule:

```javascript
const value = object.property;
```

Examples of correct code for this rule:

```javascript
const value = object?.property;
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find any problems or want to improve this plugin.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
