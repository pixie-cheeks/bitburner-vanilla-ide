import { builtinRules } from 'eslint/use-at-your-own-risk';
import eslintConfigArray from './eslint.config.js';

let onlyRules = [];
eslintConfigArray.forEach((config) => {
  if (!config.rules) return;
  onlyRules = [...onlyRules, ...Object.keys(config.rules)];
});

const usedRules = new Set(onlyRules.filter((rule) => !rule.includes('/')));

const deprecatedRules = new Map();
builtinRules.forEach((rule) => {
  if (!rule.meta?.deprecated) return;
  const ruleUrl = rule.meta.docs.url;
  deprecatedRules.set(ruleUrl.split('/').pop(), ruleUrl);
});

const usedDeprecatedRules = new Map();

[...usedRules].forEach((rule) => {
  const ruleUrl = deprecatedRules.get(rule);

  if (ruleUrl) usedDeprecatedRules.set(rule, ruleUrl);
});

console.log(usedDeprecatedRules);
