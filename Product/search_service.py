from urllib.request import Request

from home.models import Product
from home.serializers import ProductSerializer, QuickProductSerializer

Model = Product

class ProductSearchService:
    def __init__(self, request):
        self.request = request
        self.model = Model
        self.name = self.request.query_params.get('name')
        self.search_method = self.request.query_params.get('type', 'quick')

    def select_search_method(self):
        search_map = {
            "quick" : (self.quick, QuickProductSerializer),
            "full" : (self.full, ProductSerializer),
            "category" : (self.category, ProductSerializer),
            "ids" : (self.ids, ProductSerializer)
        }
        method, serializer_class = search_map.get(self.search_method, (self.quick, QuickProductSerializer))

        return method(), serializer_class

    def quick(self):
        return self.model.objects.filter(name__icontains=self.name).values('name', 'id')

    def full(self):
        return self.model.objects.filter(name__icontains=self.name)

    def category(self):
        return self.model.objects.filter(category__name__icontains=self.name)

    def ids(self):
        objects = []
        ids = self.name.split(",")
        for id in ids:
            objects.append(self.model.objects.get(id=id))
        return objects
