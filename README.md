
# BACKEND

El backend está hecho con:

- Python 3.10 (Pyenv para la gestión de versiones de python en mi local)
- FastAPI como framework web
- SQLAlchemy para el manejo de la bd en python
- Sqlite (creada y manejada por python)

Me faltó tiempo para completar las consultas del "Tiempo promedio por red social", por ahora se ven valores fijos.
Y mucho menos para hacer aunque sea unas simples pruebas unitarias

Los endpoints están validados, gracias a FastAPI y corre en el puerto 8000
La documentación del API esta aquí:

`http://localhost:8000/docs`



#### Para levantar el backend hacer:

`cd api`

`pip install -r requirements.txt`

Luego de instalar, correr el proyecto con
`uvicorn main:app --reload`



## FRONTEND

Está hecho con:

- Node 14.18
- React 18

No use frameworks ni librerías de estilos por no saber si eran permitidos.
Para esta tampoco pude hacer pruebas unitarias con jest.
Este se levanta en el puerto 3000.

Para correr este proyecto

`cd client`

`npm i`

`npm start`
