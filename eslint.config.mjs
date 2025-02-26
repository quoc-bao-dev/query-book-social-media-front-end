import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/no-unused-vars': 'off',
      // 'react-hooks/exhaustive-deps': 'off',
      // 'eslint-comments/no-unlimited-disable': 'off', // Cho phép sử dụng eslint-disable mà không bị cảnh báo
      // 'eslint-comments/no-unused-disable': 'off',
      // '@typescript-eslint/no-explicit-any': 'off',
      // 'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
    },
  },
];

export default eslintConfig;
