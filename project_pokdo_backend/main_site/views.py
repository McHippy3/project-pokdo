from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.viewsets import ModelViewSet
from .models import Listing
from .serializers import ListingSerializer


class ListingViewSet(ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        if 'image' in self.request.data:
            serializer.save(image=self.request.data.get('image'))