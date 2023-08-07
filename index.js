"use strict";

const ruleComposer = require("eslint-rule-composer");

const convertDotToOptionalChain = ruleComposer.filterReports(
	(context) => true, // check all code
	(context) => {
		const sourceCode = context.getSourceCode();
		return {
			MemberExpression(node) {
				const tokens = sourceCode.getTokens(node);
				const dotToken = tokens.at(-2);
				if (dotToken.value === "?.") {
					return;
				}
				context.report({
					node,
					loc: tokens.at(-2).loc,
					message: "should use optional chain",
					fix: (fixer) => {
						return fixer.insertTextBefore(dotToken, "?");
					},
				});
			},
		};
	}
);

module.exports = {
	rules: {
		"auto-optional-chain": convertDotToOptionalChain,
	},
};
