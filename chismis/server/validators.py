import os
from django.core.exceptions import ValidationError
from PIL import Image

def validate_icon_image_size(image):
    with Image.open(image) as img:
        if img.width > 70 or img.height > 70:
            raise ValidationError("The maximum image dimension is 70x70 pixels")
        
def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_image_extension = ['.jpg', '.png', '.jpeg', '.gif']
    if ext.lower() not in valid_image_extension:
        raise ValidationError('Unsupported file extension.')
