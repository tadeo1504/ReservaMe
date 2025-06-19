from flask import Flask
from app.db import init_db

def create_app():
    app = Flask(__name__)

    # Configuración
    app.config.from_object('app.config.Config')

    # Inicializar base de datos
    init_db(app)

    return app
