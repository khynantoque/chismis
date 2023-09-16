from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from server.serializer import ServerSerializer
from .models import Server

# Create your views here.
class ServerListViewSet(viewsets.ModelViewSet):
    queryset = Server.objects.all()
    
    serializer_class = ServerSerializer
    
    def list(self, request):
        category = request.query_params.get('category')
        
        if category:
            self.queryset = self.queryset.filter(category__name=category)
        
        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)