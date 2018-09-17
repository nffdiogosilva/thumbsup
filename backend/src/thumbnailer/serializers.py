from rest_framework import serializers

from .models import Thumbnail


class ThumbnailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Thumbnail
        fields = ( 
            'id',
            'created_at',
            'updated_at',
            'image',
            'caption',
        )

    def create(self, validated_data):
        """
        Create and return a new `Thumbnail` instance, given the validated data.
        """
        return Thumbnail.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Thumbnail` instance, given the validated data.
        """
        instance.image = validated_data.get('image', instance.image)
        instance.caption = validated_data.get('caption', instance.caption)
        instance.save()
        return instance
