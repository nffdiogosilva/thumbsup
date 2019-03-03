from .base import *


DEBUG = False

TEMPLATE_DEBUG = DEBUG

# Allow all host headers
ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', default=['example.com'])


INSTALLED_APPS += (
)


MIDDLEWARE = ['whitenoise.middleware.WhiteNoiseMiddleware'] + MIDDLEWARE


STATIC_ROOT = BASE_DIR.parent.parent.child('assets')

# Webpack
WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': BASE_DIR.parent.parent.child('webpack-stats.prod.json'),
        }
}
