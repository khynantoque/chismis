from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
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
        by_serverid = request.query_params.get('by_serverid')
        
        if not request.user.is_authenticated:
            raise AuthenticationFailed(detail='Authentication is required!')
        
        if category:
            self.queryset = self.queryset.filter(category__name=category)
        
        if by_user:
            userId = request.user.id
            self.queryset = self.queryset.filter(member=userId)
        
        if qty:
            self.queryset = self.queryset[:int(qty)]
            
        if by_serverid:
            try:
                self.queryset = self.queryset.filter(id=int(by_serverid))
                if not self.queryset.exists():
                    raise ValidationError(detail=f'Server with ID of {by_serverid} is not found!')
            except ValueError:
                raise ValidationError(detail=f'Server value error!')
        
        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)