'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/amka',
	assets: {
		lib: {
			css: [
                //'public/lib/bootstrap/dist/css/bootstrap.css',
                //'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/bootswatch/cosmo/bootstrap.min.css',
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
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
