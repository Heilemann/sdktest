const { src, watch, series, dest } = require('gulp')
const replace = require('gulp-replace')
var cssBase64 = require('gulp-css-base64')
const inlinesource = require('gulp-inline-source')

const inlineImages = () => {
	return src('build/static/css/*.css')
		.pipe(cssBase64())
		.pipe(dest('build/static/css/'))
}

const cleanUp = () => {
	return src('./build/*.html')
		.pipe(replace('<link rel="manifest" href="/manifest.json"/>', ''))
		.pipe(replace('<link rel="icon" href="/favicon.ico"/>', ''))
		.pipe(replace('<link rel="apple-touch-icon" href="/logo192.png"/>', ''))
		.pipe(dest('./build'))
}

const inlineScriptsAndCSS = () => {
	const regex = /<script.*<\/script>/g
	return (
		src('./build/*.html')
			// move <script> to end of file, as defer won't work with inline scripts
			.pipe(
				replace(regex, function replace(match, offset, string) {
					const newString = string
						.replace(match, '')
						.replace('</body></html>', match + '</body></html>')
					return newString
				}),
			)
			// inline js and css
			.pipe(replace('.js"></script>', '.js" inline></script>'))
			.pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
			.pipe(inlinesource())
			.pipe(dest('./dist'))
	)
}

// rename path to asset files (which are uploaded on installation)
const renameAssetsPaths = () => {
	return src('./dist/index.html')
		.pipe(replace('static/media/', 'files/'))
		.pipe(dest('./dist'))
}

// const watchTask = () => {
// 	watch('build/*.[html, js, css]', inlineScripts)
// }

exports.default = series(
	inlineImages,
	cleanUp,
	inlineScriptsAndCSS,
	renameAssetsPaths,
)