
#change import to match your structure
from db.queries.usuario.listar_usuarios import listar_usuarios
from db.queries.usuario.iniciar_sesion import iniciar_sesion
from db.queries.usuario.alta_usuario import alta_usuario
from db.queries.usuario.modificar_usuario import modificar_usuario
from db.queries.usuario.baja_usuario import baja_usuario


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
    data = request.get_json()
    email = data.get('email')
    contrasena = data.get('contrasena')
    
    resultado = iniciar_sesion(email, contrasena)


    # Si viene dict con 'error' -> 401
    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify({"ok": False, "mensaje": resultado['error']}), 401

    # Si vino un usuario válido

    return jsonify({"ok": True, "usuario": resultado}), 200



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
