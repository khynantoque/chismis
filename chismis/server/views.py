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
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user') == 'True'
        
        if category:
            self.queryset = self.queryset.filter(category__name=category)
        
        if by_user:
            userId = request.user.id
            self.queryset = self.queryset.filter(member=userId)
        
        if qty:
            self.queryset = self.queryset[:int(qty)]
        
        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)