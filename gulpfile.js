var gulp = require('gulp');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');

var reload = browserSync.reload;
var target = gulp.src('app/index.html');

var libraryDependenciesPathsArray = [
										'js/*.js',
									];

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('build-styles', function(){
	var stylesInjectionTag = '<!-- inject:styles -->';
	var stylesSrc = gulp.src([
								'app/css/*.css',
							 ], {read: false});

	return target.pipe(inject(stylesSrc, {ignorePath:'/app/', starttag: stylesInjectionTag}))
				 .pipe(gulp.dest('app'));
});

gulp.task('build-libs', function(){
	var appInjectionTag = '<!-- inject:libs -->';
	var appSrc = gulp.src(['app/libs/*.min.js'], {read: false});

	return target.pipe(inject(appSrc, {ignorePath:'/app/', starttag: appInjectionTag}))
				 .pipe(gulp.dest('app'));
});

// Injects <script> tags with app scripts into index.html
gulp.task('build-js', function(){
	var appInjectionTag = '<!-- inject:js -->';
	var appSrc = gulp.src(['app/js/*.js'], {read: false});

	return target.pipe(inject(appSrc, {ignorePath:'/app/', starttag: appInjectionTag}))
				 .pipe(gulp.dest('app'));
});
gulp.task('build-libraries', function(cb){
	var libraryDependenciesInjectionTag = '<!-- inject:libraryDependencies -->';

	var libraryDependenciesSrc = gulp.src(libraryDependenciesPathsArray, {read: false});

	return gulp.src('app/index.html')
				.pipe(inject(libraryDependenciesSrc, {ignorePath:'/app/', starttag: libraryDependenciesInjectionTag}))
				.pipe(gulp.dest('app'));
});

// Injects <script> and <link> into index.html
// Moves vendor files (plugins) to the libs folder and then calls every build task in the correr order.
gulp.task('build', [
					'build-styles',
					'build-libs',
					'build-js'            
				   ], function() {
	return;
});


gulp.task('serve', ['build'], function() {
	browserSync({
			server: {
			baseDir: 'app'
		}
	});

gulp.watch(['app/*.html',
				'app/**/*.css',
				'app/*.js'
				], {cwd: 'app'}, reload);
});