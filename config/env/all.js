'use strict';

module.exports = {
	app: {
		title: 'AMKA',
		description: 'Atlantic Motorsports Karters Association',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				//'public/lib/bootstrap/dist/css/bootstrap.css',
				//'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/bootswatch/cosmo/bootstrap.css',
                'public/lib/FroalaWysiwygEditor/css/froala_editor.min.css',
                'public/lib/FroalaWysiwygEditor/css/froala_style.min.css',
                'public/lib/FroalaWysiwygEditor/css/font-awesome.min.css',
                'public/lib/FroalaWysiwygEditor/css/themes/dark.min.css'

            ],
			js: [
                'public/lib/jquery/dist/jquery.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',,
                'public/lib/FroalaWysiwygEditor/js/froala_editor.min.js',
                'public/lib/angular-froala/src/angular-froala.js',
                'public/lib/angular-froala/src/froala-sanitize.js'
            ]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
