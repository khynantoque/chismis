from rest_framework import serializers
from .models import Server, Channel, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"

class ServerSerializer(serializers.ModelSerializer):
    num_members = serializers.SerializerMethodField()
    channel_server = ChannelSerializer(many=True)
    category = serializers.StringRelatedField()
    
    class Meta:
        model = Server
        exclude = ("member",)
        
    def get_num_members(self, obj):
        return obj.num_members if hasattr(obj, "num_members") else None
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get("num_members")
        if not num_members:
            data.pop('num_members', None)
        return data