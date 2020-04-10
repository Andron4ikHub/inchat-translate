/* jshint esversion: 8 */

const mocha = require('mocha');
const assert = require('chai').assert;

describe('Insert the functionality (feature/task/function/module) that is being tested', () => {
  const arr = [
    0,
    1,
    2,
  ];

  describe('describe() can be nested for nested testing (helps with test organization)', () => {
    it('should return successful because each assert call is true', () => {
      assert.equal(0, arr[0]);
      assert.equal(1, arr[1]);
      assert.equal(2, arr[2]);
    });

    it('should return successful because true is always equal to itself', () => {
      assert.equal(true, true);
    });
  });
});
