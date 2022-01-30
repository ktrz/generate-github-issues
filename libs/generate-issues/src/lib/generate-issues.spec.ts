import { generateIssues } from './generate-issues';

describe('generateIssues', () => {
  it('should work', () => {
    expect(generateIssues()).toEqual('generate-issues');
  });
});
