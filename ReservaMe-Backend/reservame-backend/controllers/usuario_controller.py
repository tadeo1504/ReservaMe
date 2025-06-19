from db.queries.usuario import (
    modificar_usuario,
    iniciar_sesion,
    alta_usuario,
    baja_usuario,
    listar_usuarios
)
from flask import Blueprint, request, jsonify

usuario_bp = Blueprint('usuario', __name__)
@usuario_bp.route('/registrar', methods=['POST'])
def registrar_usuario_route():
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    telefono = data.get('telefono')
    email = data.get('email')
    contrasena_hash = data.get('contrasena_hash')
    rol = data.get('rol')

    resultado = alta_usuario(nombre, apellido, telefono, email, contrasena_hash, rol)
    
    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400
    
    return jsonify({"message": "Usuario registrado exitosamente."}), 201

@usuario_bp.route('/iniciar_sesion', methods=['POST'])
def iniciar_sesion_route():
    data_json = request.get_json()
    email = data_json.get('email')
    contrasena_hash = data_json.get('contrasena_hash')
    resultado = iniciar_sesion(email, contrasena_hash)
    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 401
    return jsonify(resultado), 200

@usuario_bp.route('/modificar/<int:id_usuario>', methods=['PUT'])
def modificar_usuario_route(id_usuario):
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    telefono = data.get('telefono')
    email = data.get('email')

    resultado = modificar_usuario(id_usuario, nombre, apellido, telefono, email)
    
    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400
    
    return jsonify({"message": "Usuario modificado exitosamente."}), 200

@usuario_bp.route('/baja/<int:id_usuario>', methods=['DELETE'])
def baja_usuario_route(id_usuario):
    resultado = baja_usuario(id_usuario)
    
    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400
    
    return jsonify({"message": "Usuario eliminado exitosamente."}), 200

@usuario_bp.route('/usuarios', methods=['GET'])
def listar_usuarios_route():
    resultado = listar_usuarios()
    
    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400
    
    return jsonify(resultado), 200
