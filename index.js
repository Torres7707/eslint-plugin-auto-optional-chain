const ruleComposer = require("eslint-rule-composer");

const convertDotToOptionalChain = ruleComposer.filterReports(
	(context) => true, // check all code
	(context) => {
		const sourceCode = context.getSourceCode();
		let insideObjectAccess = false; // Track if we are inside an object access context

		return {
			MemberExpression(node) {
				const tokens = sourceCode.getTokens(node);
				const dotToken = tokens.at(-2);

				if (dotToken.value === "?.") {
					// Already an optional chain, skip
					return;
				}

				if (insideObjectAccess) {
					context.report({
						node,
						loc: tokens.at(-2).loc,
						message: "should use optional chain",
						fix: (fixer) => {
							return fixer.insertTextBefore(dotToken, "?");
						},
					});
				}
			},
			"MemberExpression:exit"(node) {
				// Reset insideObjectAccess when exiting MemberExpression
				const tokens = sourceCode.getTokens(node);
				const dotToken = tokens.at(-2);
				if (dotToken.value === ".") {
					insideObjectAccess = false;
				}
			},
			ObjectExpression() {
				// We are inside an object context
				insideObjectAccess = true;
			},
		};
	}
);

module.exports = {
	rules: {
		"auto-optional-chain": convertDotToOptionalChain,
	},
};
