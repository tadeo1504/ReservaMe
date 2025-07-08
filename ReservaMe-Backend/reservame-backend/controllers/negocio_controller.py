from db.queries.negocio import (
    alta_negocio,
    listar_negocios,
    obtener_negocio,
    modificar_negocio,
    baja_negocio,
    nuevos_negocios
)
from flask import Blueprint, request, jsonify

negocio_bp = Blueprint('negocio', __name__)

@negocio_bp.route('/negocios', methods=['POST'])
def alta_negocio_route():
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    direccion = data.get('direccion')
    telefono_contacto = data.get('telefono_contacto')
    id_duenio = data.get('id_duenio')

    resultado = alta_negocio(nombre, descripcion, direccion, telefono_contacto, id_duenio)

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400
    
    return jsonify({"message": "Negocio creado exitosamente."}), 201

@negocio_bp.route('/negocios', methods=['GET'])
def listar_negocios_route():
    resultado = listar_negocios()

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400

    return jsonify(resultado), 200

@negocio_bp.route('/negocios/<int:id_negocio>', methods=['GET'])
def obtener_negocio_route(id_negocio):
    resultado = obtener_negocio(id_negocio)

    if resultado is None or (isinstance(resultado, dict) and 'error' in resultado):
        return jsonify({"error": "Negocio no encontrado."}), 404

    return jsonify(resultado), 200

@negocio_bp.route('/negocios/<int:id_negocio>', methods=['PUT'])
def modificar_negocio_route(id_negocio):
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    direccion = data.get('direccion')
    telefono_contacto = data.get('telefono_contacto')

    resultado = modificar_negocio(id_negocio, nombre, descripcion, direccion, telefono_contacto)

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400

    return jsonify({"message": "Negocio modificado exitosamente."}), 200

@negocio_bp.route('/negocios/<int:id_negocio>', methods=['DELETE'])
def baja_negocio_route(id_negocio):
    resultado = baja_negocio(id_negocio)

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400

    return jsonify({"message": "Negocio eliminado exitosamente."}), 200

@negocio_bp.route('/negocios/nuevos', methods=['GET'])
def nuevos_negocios_route():
    resultado = nuevos_negocios()

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400

    return jsonify(resultado), 200
