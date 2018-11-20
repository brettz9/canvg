module.exports = {
  extends: ['ash-nazg/sauron'],
  env: {
    es6: true
  },
  overrides: [{
    // These are just consumed by build scripts, so no need for naming
    files: ['rollup.config.js', 'ava.config.js'],
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 8
    },
    rules: {
      'import/no-anonymous-default-export': 'off'
    }
  }, {
    // Linting for JavaScript within Markdown (and JSDoc examples as well, by way of
    //   `matchingFileName` in conjunction with `jsdoc/check-examples` within `ash-nazg`)
    files: ['**/*.md'],
    rules: {
      'eol-last': ['off'],
      'no-console': ['off'],
      'no-undef': ['off'],
      'no-unused-vars': ['warn'],
      'padded-blocks': ['off'],
      'import/unambiguous': ['off'],
      'import/no-unresolved': ['off'],
      'node/no-missing-import': ['off']
    }
  }, {
    env: {
      es6: true,
      node: true
    },
    parserOptions: {
      ecmaVersion: 8
    },
    files: ['test/**'],
    rules: {
      "compat/compat": "off",
      "import/no-dynamic-require": "off",
      "no-console": "off"
    }
  }],
  settings: {
    jsdoc: {
        additionalTagNames: {
          // In case we need to extend
          customTags: []
        },
        tagNamePreference: {
          arg: "param",
          return: "returns"
        },
        allowOverrideWithoutParam: true,
        allowImplementsWithoutParam: true,
        allowAugmentsExtendsWithoutParam: true,
        // For `jsdoc/check-examples` in `ash-nazg`
        matchingFileName: "dummy.md",
        rejectExampleCodeRegex: "^`"
    }
  },
  rules: {
    'import/unambiguous': 0,
    'import/no-commonjs': 0,
    'require-jsdoc': 0,
    'capitalized-comments': 0,
    'max-len': 0,
    'block-scoped-var': 0,
    'no-magic-numbers': 0,
    'global-require': 0,
    'new-cap': 0,
    'no-lonely-if': 0,
    complexity: 0,
    'default-case': 0,
    'no-warning-comments': 0,
    'consistent-this': 0
  }
};
