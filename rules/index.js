module.exports = {
    extends: [
        './base/base',
        './base/errors',
        './base/es6',
        './base/imports',
        './base/strict',
        './react/jsx-a11y',
        './react/react',
        './react/react-hooks'
    ].map(require.resolve),
    "parserOptions": {
        "ecmaVersion": 2021,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },

    "env": {
        "es2021": true,
        "browser": true,
        "node": true,
        "jest": true
    },

    "plugins": [
        "import",
        "jsx-a11y",
        "react",
        "react-hooks",
    ],

    "globals": {
        "document": "readonly",
        "navigator": "readonly",
        "window": "readonly"
    },
}