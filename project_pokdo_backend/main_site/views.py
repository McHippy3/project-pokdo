from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.viewsets import ModelViewSet
from .models import Listing
from .serializers import ListingSerializer


class ListingViewSet(ModelViewSet):
    queryset = Listing.objects.all().order_by('-created_at')
    serializer_class = ListingSerializer
    parser_classes = (MultiPartParser, FormParser)