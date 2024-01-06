import { getWithFirstUpperCharText } from './get-init-upper-char';

test('getWithFirstUpperCharText', () => {
  expect(getWithFirstUpperCharText('hello World!')).toBe('Hello World!');
});
