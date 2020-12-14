from django.db import models

class Usuario(models.Model):
    numerouser= models.IntegerField()   
    nif=models.CharField(max_length=20)
    nombre=models.CharField(max_length=100)
    direccion=models.CharField(max_length=100)
    telefono=models.CharField(max_length=20)
    
    def __str__(self):
        return self.nombre

class Autor(models.Model):
    nombre=models.CharField(max_length=100)
    nacionalidad=models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    codigo=models.IntegerField()
    titulo=models.CharField(max_length=100)
    isbn=models.CharField(max_length=30)
    editorial=models.CharField(max_length=60)
    numpage=models.SmallIntegerField()
    autor=models.ForeignKey(Autor, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo

class Prestamo(models.Model):
    idlibro=models.ForeignKey(Libro, on_delete=models.CASCADE)
    idusuario=models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecprestamo=models.DateField(auto_now=True)
    fecdevolucion=models.DateField()

    def __str__(self):
        return self.fecdevolucion