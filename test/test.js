import fs from 'fs';
import assert from 'assert';
import normalizeNewline from 'normalize-newline';
import createReport from './utils/create-report.js';


it('Should produce report with colors', async () => {
  let report = await createReport(true);
  let expected = fs.readFileSync('./test/data/report-with-colors.html', 'utf8');

  report = normalizeNewline(report).trim();
  expected = normalizeNewline(expected).trim();

  assert.strictEqual(report, expected);
});
