import * as gulp from 'gulp';
import {join} from 'path';
import {APP_DEST} from '../../config';

export = () => {
  let src = [
    'node_modules/systemjs/**/*',
    'node_modules/reflect-metadata/**/*',
    'node_modules/es6-shim/**/*',
    'node_modules/@angular/**/*',
    'node_modules/rxjs/**/*',
    'node_modules/angulartics2/**/*',
    'node_modules/lodash/**/*',
    'node_modules/ng2-translate/**/*',
    'node_modules/@ngrx/**/*',
    'node_modules/zone.js/**/*',
    'node_modules/firebase/**/*',
    'node_modules/core-js/**/*'
  ];
  return gulp.src(src, { base: 'node_modules' })
    .pipe(gulp.dest(join(APP_DEST + '/node_modules')));
};
