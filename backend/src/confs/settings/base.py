import os

import dj_database_url
from getenv import env
from unipath import Path

BASE_DIR = Path(__file__).absolute().ancestor(3)

gettext = lambda s: s

SECRET_KEY = env('SECRET_KEY', 'dev_only')

DEBUG = True

TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = []

SITE_ID = 1

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

APPEND_SLASH = True

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 3rd Party apps
    'webpack_loader',
    'storages',
)

MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CONTEXT_PROCESSORS_LIST = [
    'django.contrib.auth.context_processors.auth',
    'django.template.context_processors.debug',
    # 'django.template.context_processors.i18n',
    'django.template.context_processors.request',
    # 'django.template.context_processors.media',
    'django.template.context_processors.static',
    # 'django.template.context_processors.tz',
    # 'django.contrib.messages.context_processors.messages',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR.child('core', 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': CONTEXT_PROCESSORS_LIST,
        },
    },
]

ROOT_URLCONF = 'confs.urls'

WSGI_APPLICATION = 'confs.wsgi.application'


# Database
# https://docs.djangoproject.com/en/dev/ref/settings/#databases

DATABASES = {
    # URL schema: https://github.com/kennethreitz/dj-database-url#url-schema
    'default': dj_database_url.config(),
}


# Internationalization
# https://docs.djangoproject.com/en/dev/topics/i18n/

LANGUAGE_CODE = 'en'

# TIME_ZONE = 'Atlantic/Azores'
USE_I18N = False

USE_L10N = False

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/dev/howto/static-files/

STATIC_ROOT = BASE_DIR.parent.child('static')
STATIC_URL = '/static/'

MEDIA_ROOT = BASE_DIR.parent.child('media')
MEDIA_URL = '/media/'

# Django Storages settings (Amazon S3)

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')

AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME', 'eu-central-1')

AWS_DEFAULT_ACL = None
AWS_LOCATION = 'uploads'

AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

# Templates

TEMPLATE_DIRS = (
    BASE_DIR.child('core', 'templates'),
)


# Email

if 'EMAIL_HOST_USER' in os.environ:
    EMAIL_USE_TLS = True
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_HOST_USER = env('EMAIL_HOST_USER')
    EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
    DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL')

# Webpack Loader

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': BASE_DIR.parent.parent.child('webpack-stats.dev.json'),
        }
}


# Rest Framework settings

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'knox.auth.TokenAuthentication',
    ),
}

# Easy Thumbnails settings

THUMBNAIL_DEFAULT_OPTIONS = {
    'size': (430, 240),
}


# Logging

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
        },
        'console':{
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'filters': [],
        }
    },
    'loggers': {
        'django': {
            'handlers': ['null'],
            'propagate': True,
            'level': 'INFO',
        },
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': False,
        },
    }
}
