## Pasos para ejecutar el software

- Crear el entorno virtual con el comando ```python -m venv venv```
- Ingresar a las carpetas del entorno virtual con ```cd venv\Scripts``` y luego activarlo con ```activate```. Si esta en Visual Studio Code debe usar el comando ```./activate```.
- Instalar todas las dependencias de Django con el comando ```pip install -r requirements.txt```
- Ejecutar las migraciones con los comandos:

```
python manage.py makemigrations
python manage.py migrate
```

- Crear un usuario en la base de datos con el comando ```python manage.py createsuperuser```
- Correr el servidor de Django con el comando ```python manage.py runserver```
- Instalar nodeJS de la version 20 en adelante
- Abrir otra terminal y acceder a la carpeta frontend e instalar las dependencias de React con el comando ```npm install```
- Correr el servidor de node con ```npm run dev```
- Pegar la siguiente ruta en el navegador ```http://localhost:5173/```