import os
import dotenv

from whitenoise import WhiteNoise

from django.core.wsgi import get_wsgi_application
from django.conf import settings


base = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
# Load environment
dotenv.read_dotenv(os.path.join(base, '.env'))
# Get WSGI handler

if settings.DEBUG:
    application = get_wsgi_application()
else:
    application = WhiteNoise(get_wsgi_application(), root='/app/assets')
