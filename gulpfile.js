var gulp = require('gulp'),
  replace = require('gulp-replace'),
  shell = require('gulp-shell'),
  jshint = require('gulp-jshint'),
  jshStylish = require('jshint-stylish'),
  exec = require('child_process').exec,
  runSequence = require('run-sequence'),
  prompt = require('gulp-prompt'),
  mocha = require('gulp-mocha'),
  babel = require('babel-core/register'),
  version

/*
* Testing
*/
gulp.task('test-meteor',
  shell.task(['meteor test --once --driver-package=dispatch:mocha-phantomjs'], { verbose : true})
)

gulp.task('test', function() {
  gulp.src( './tests/*.js', { read: false } )
    .pipe( mocha( {
      reporter:'nyan',
      compilers: {
              js: babel
          }
    } ) )
})

/*
* Versioning
*/
gulp.task('publish', [], function( next ){
  runSequence('confver', 'lint', 'pkgver', 'push', 'tag', next);
});

gulp.task('confver', ['version'], function(){
  return gulp.src('.')
    .pipe( prompt.confirm({ message: 'Are you sure version `' + version + '` is OK to publish?' }) )
  ;
});

gulp.task('version', function( next ){
  var now = new Date();
  version = process.env['VERSION'];

  if( version ){
    done();
  } else {
    exec('git rev-parse HEAD', function( error, stdout ){
      var sha = stdout.substring(0, 10); // shorten so not huge filename

      version = [ 'snapshot', sha, +now ].join('-');
      done();
    });
  }

  function done(){
    console.log('Using version number `%s` for building', version);
    next();
  }

});

gulp.task('pkgver', ['version'], function(){
  return gulp.src([
    'package.json',
    'bower.json'
  ])
    .pipe( replace(/\"version\"\:\s*\".*?\"/, '"version": "' + version + '"') )

    .pipe( gulp.dest('./') )
  ;
});

gulp.task('push', shell.task([
  'git add -A',
  'git commit -m "pushing changes for v$VERSION release"',
  'git push'
]));

gulp.task('tag', shell.task([
  'git tag -a $VERSION -m "tagging v$VERSION"',
  'git push origin $VERSION'
]));

gulp.task('npm', shell.task([
  'npm publish .'
]));

// http://www.jshint.com/docs/options/
gulp.task('lint', function(){
  return gulp.src( 'imports/*.js' )
    .pipe( jshint({
      esversion: 6,
      funcscope: true,
      laxbreak: true,
      loopfunc: true,
      strict: true,
      unused: 'vars',
      eqnull: true,
      sub: true,
      shadow: true,
      laxcomma: true
    }) )

    .pipe( jshint.reporter(jshStylish) )

    //.pipe( jshint.reporter('fail') )
  ;
});


/*
*
*/
gulp.task('default', [], function( next ){
  console.log('You must explicitly call `gulp publish` to publish the extension');
  next();
});
