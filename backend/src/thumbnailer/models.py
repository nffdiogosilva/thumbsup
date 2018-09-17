from easy_thumbnails.fields import ThumbnailerImageField

from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


class Thumbnail(models.Model):
    """
    Thumbnail model that represents the Thumbnail instance.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    image = ThumbnailerImageField(upload_to='thumbnails',
                                  resize_source=settings.THUMBNAIL_DEFAULT_OPTIONS,
                                  thumbnail_storage='storages.backends.s3boto3.S3Boto3Storage')
    caption = models.CharField(max_length=255, blank=True, default='')

    owner = models.ForeignKey(User, related_name="thumbnails", on_delete=models.CASCADE)

    def __str__(self):
        return '{} - Owner: {}, Caption: {}'.format(self.pk, self.owner, self.caption)
