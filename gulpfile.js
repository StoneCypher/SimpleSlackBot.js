
var gulp  = require('gulp'),

    babel = require('gulp-babel');



var dirs      = require('./config/dirs.json'),
    targets   = require('./config/targets.json'),
    babel_cfg = require('./config/babel.json');





gulp.task('babel', function() {

  return gulp.src(targets.babel)
    .pipe(babel(babel_cfg))
    .pipe(gulp.dest(dirs.dist));

});





gulp.task('build',   ['babel']);
gulp.task('default', ['build']);
