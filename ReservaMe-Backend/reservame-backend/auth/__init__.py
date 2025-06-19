from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

from auth import routes  # Importa las rutas después de definir el Blueprint
