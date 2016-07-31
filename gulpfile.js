if (typeof Meteor === typeof undefined) {
  // eslint-disable-next-line vars-on-top, no-var
  var r = require
  var gulp = r('gulp'),
    version,
    replace = r('gulp-replace'),
    rename = r('gulp-rename'),
    gutil = r('gulp-util'),
    shell = r('gulp-shell'),
    jshint = r('gulp-jshint'),
    jshStylish = r('jshint-stylish'),
    exec = r('child_process').exec,
    runSequence = r('run-sequence'),
    prompt = r('gulp-prompt'),
    mocha = r('gulp-mocha'),
    babel = r('babel-core/register'),
    concat = r('gulp-concat'),
    gulpReactDocs = r('gulp-react-docs'),
    gulpJsdoc2md = r('gulp-jsdoc-to-markdown'),
    debug = r('gulp-debug'),
    runSequence = r('run-sequence'),
    insert = r('gulp-insert'),
    del = r('del')

    // jsdoc = r('gulp-jsdoc3'), // very nice but does not support markdown
    // documentation = r('gulp-documentation'), does not work
    // markdown = r('gulp-markdown'),
    // toc    = require('gulp-doctoc'),
    // marked = require('gulp-marked')
    // RSG = require('react-styleguide-generator'), // jsdoc style does not work
    // docco = r("gulp-jsx-docco"), no nav / table of contents


  /*
  * Docs
  */

  var DOC_DEST_FOLDER = './.docs';
  var API_DOC_DEST_FOLDER = DOC_DEST_FOLDER + '/api';
  var UI_DOC_DEST_FOLDER = DOC_DEST_FOLDER + '/ui';

  gulp.task('doc', function(done){
    runSequence('doc:clean', 'doc:react', 'doc:api', 'doc:build', function(){
      gutil.log(gutil.colors.green('OK : docs built at ', DOC_DEST_FOLDER  ))
      done()
    })
  })

  gulp.task('doc:clean', function() {
    // Return the Promise from del()
    return del([
      API_DOC_DEST_FOLDER,
      UI_DOC_DEST_FOLDER,
      DOC_DEST_FOLDER+'/index.md',
      DOC_DEST_FOLDER+'/api.md',
      DOC_DEST_FOLDER+'/ui.md',
    ], { force : true});
});

  gulp.task('doc:build', function(cb){
    return gulp.src(['./README.md', DOC_DEST_FOLDER+'/api.md', DOC_DEST_FOLDER+'/ui.md'])
      .pipe(concat('index.md'))
      .pipe(gulp.dest(DOC_DEST_FOLDER));
  })

  gulp.task('doc:react', function() {
      return gulp.src('./imports/ui/components/**/*.jsx')
          .pipe(gulpReactDocs())
          // .pipe(insert.prepend('#')) // make h3
          .pipe(insert.transform(function(contents, file) {
              // QUICKFIX: add some nicer header stuff
              var path = './imports/' + file.path.split('topogram/imports')[1].split(".")[0] + '.jsx'
              var link =   'File: [' + path + '](../' + path + ')\n';
              var name = file.path.split('/imports')[1].split("/").pop().split('.')[0]
              var header = link + '\n'
              return header  + contents;
          }))
          // .pipe(debug())
          .pipe(gulp.dest(UI_DOC_DEST_FOLDER))
          .pipe(concat('ui.md'))
          .pipe(insert.prepend('# UI Components\n'))
          .pipe(gulp.dest(DOC_DEST_FOLDER))
  });

  gulp.task('doc:api', function (cb) {

      return gulp.src('./imports/api/**/*.js')
        .pipe(gulpJsdoc2md())
        .on('error', function (err) {
          gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
        })
        .pipe(rename(function (path) {
          path.extname = '.md'
        }))
        // .pipe(debug())
        .pipe(gulp.dest(API_DOC_DEST_FOLDER))
        .pipe(concat('api.md'))
        .pipe(insert.prepend('# API Methods\n'))
        .pipe(gulp.dest(DOC_DEST_FOLDER));

  });



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
}
