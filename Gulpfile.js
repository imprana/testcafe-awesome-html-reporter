/* eslint global-require: 0 */
/* eslint import/no-unresolved: 0 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import del from 'del';

gulp.task('clean', () => del('lib'));

gulp.task('build', gulp.series(['clean'], () => gulp
  .src('src/**/*.js')
  .pipe(
    babel({
      presets: ['@babel/env'],
    }),
  )
  .pipe(gulp.dest('lib'))));

gulp.task('test', () => {
  process.env.NODE_ENV = 'test';
  return gulp.src('test/**.js').pipe(
    mocha({
      ui: 'bdd',
      reporter: 'spec',
      timeout: typeof v8debug === 'undefined' ? 2000 : Infinity, // NOTE: disable timeouts in debug
    }),
  );
});

gulp.task('preview', () => {
  const { buildReporterPlugin } = require('testcafe').embeddingUtils;
  const pluginFactory = require('./lib');
  const reporterTestCalls = require('./test/utils/reporter-test-calls');
  const plugin = buildReporterPlugin(pluginFactory);

  reporterTestCalls.forEach((call) => {
    plugin[call.method](...call.args);
  });

  process.exit(0);
});
