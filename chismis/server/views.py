from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from server.serializer import ServerSerializer
from .models import Server
from .schema import server_list_docs
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class ServerListViewSet(viewsets.ModelViewSet):
    
    queryset = Server.objects.all()
    permission_classes = [IsAuthenticated]
    
    serializer_class = ServerSerializer
    
    @server_list_docs
    def list(self, request):
        """
    A viewset for listing servers with flexible filtering options.

    Attributes:
        queryset (QuerySet): The queryset of Server objects.
        serializer_class (Serializer): The serializer class for Server objects.

    Methods:
        list(request): Retrieve a list of servers based on query parameters.

    URL Parameters:
        - category (str, optional): Filter servers by category name.
        - qty (int, optional): Limit the number of servers returned.
        - by_user (bool, optional): Filter servers owned by the requesting user.
        - by_serverid (int, optional): Filter servers by server ID.
        - with_num_members (bool, optional): Include the number of members in the response.

    Raises:
        AuthenticationFailed: If the user is not authenticated.
        ValidationError: If there are validation errors in the query parameters,
            or if the requested server ID does not exist.

    Returns:
        Response: A JSON response containing a list of filtered servers.

    Usage Examples:
        - Retrieve all servers in a specific category:
            GET /api/servers/?category=gaming

        - Retrieve the first 5 servers:
            GET /api/servers/?qty=5

        - Retrieve servers owned by the authenticated user:
            GET /api/servers/?by_user=True

        - Retrieve a server by its ID (e.g., ID 42):
            GET /api/servers/?by_serverid=42

        - Include the number of members in the response:
            GET /api/servers/?with_num_members=True

    Notes:
        - Authentication is required to access this viewset.
        - Invalid query parameters may result in a ValidationError.
        - If by_serverid is used, the server must exist; otherwise, a ValidationError is raised.

        """
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user') == 'true'
        by_serverid = request.query_params.get('by_serverid')
        with_num_members = request.query_params.get('with_num_members') == 'true'

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            userId = request.user.id
            self.queryset = self.queryset.filter(member=userId)

        if qty:
            self.queryset = self.queryset[:int(qty)]

        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count('member'))

        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            try:
                self.queryset = self.queryset.filter(id=int(by_serverid))
                if not self.queryset.exists():
                    raise ValidationError(detail=f'Server with ID of {by_serverid} is not found!')
            except ValueError as e:
                raise ValidationError(detail='Server value error!') from e

        serializer = ServerSerializer(self.queryset, many=True, context={'num_members': with_num_members})
        return Response(serializer.data)