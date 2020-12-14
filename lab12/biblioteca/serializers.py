from rest_framework import serializers
from .models import Prestamo, Libro, Autor



""" class PrestamoSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    idlibro=serializers.IntegerField()
    idusuario=serializers.IntegerField()
    fecprestamo=serializers.DateField()
    fecdevolucion=serializers.DateField()

    def create(self, validated_data):
        return Prestamo.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.idlibro = validated_data.get('idlibro', instance.idlibro)
        instance.idusuario= validated_data.get('idusuario', instance.idusuario)
        instance.fecprestamo = validated_data.get('fechaprestamo', instance.fecprestamo)
        instance.fecdevolucion = validated_data.get('fechadevolucion', instance.fecdevolucion)
        instance.save()
        return instance
 """
class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = ('nombre','nacionalidad')
class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = ('codigo', 'titulo', 'isbn', 'numpage', 'autor')
class PrestamoSerializer(serializers.ModelSerializer):
    libro=LibroSerializer(many=False, read_only=True)
    class Meta:
        model = Prestamo
        fields = "__all__"



