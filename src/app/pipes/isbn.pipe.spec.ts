import { IsbnPipe } from './isbn.pipe';
describe('IsbnPipe', () => {
  const pipe = new IsbnPipe();
  it('should add a prefix', () => {
    expect(pipe.transform('3864903572', true)).toMatch(/^ISBN-10: /);
    expect(pipe.transform('9783864903571', true)).toMatch(/^ISBN-13: /);
  });
});
