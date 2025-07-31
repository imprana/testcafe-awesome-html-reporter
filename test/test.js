import assert from 'assert';
import normalizeNewline from 'normalize-newline';
import { readSync as read } from 'read-file-relative';
import createReport from './utils/create-report.js';

it('Should produce report with colors', () => {
  let report = createReport(true);
  let expected = read('./data/report-with-colors.html');

  report = normalizeNewline(report).trim();
  expected = normalizeNewline(expected).trim();

  assert.strictEqual(report, expected);
});
