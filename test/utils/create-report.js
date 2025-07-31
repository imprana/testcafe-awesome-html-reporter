/* eslint global-require: 0 */
/* eslint import/no-unresolved: 0 */

import reporterTestCalls from './reporter-test-calls.js';
import testcafe from 'testcafe';
const { embeddingUtils } = testcafe;

export default async function createReport(withColors) {
  const pkg = await import('../../lib/index.js');
  const pluginFactory = pkg.default || pkg;
  // ...existing code...
  const outStream = {
    data: '',

    write(text) {
      this.data += text;
    },
  };

  const plugin = buildReporterPlugin(pluginFactory, outStream);

  plugin.chalk.enabled = !plugin.noColors && withColors;
  plugin.symbols = { ok: '✓', err: '✖' };

  // NOTE: disable errors coloring if we don't have custom
  // error decorator. Default error colors may be prone to changing.
  if (plugin.chalk.enabled && !pluginFactory().createErrorDecorator) {
    const origFormatError = plugin.formatError;

    plugin.formatError = () => {
      plugin.chalk.enabled = false;

      const result = origFormatError.apply(plugin);

      plugin.chalk.enabled = true;

      return result;
    };
  }

  reporterTestCalls.forEach((call) => {
    plugin[call.method](...call.args);
  });

  // NOTE: mock stack entries
  return outStream.data.replace(/\s*?\(.+?:\d+:\d+\)/g, ' (some-file:1:1)');
}
