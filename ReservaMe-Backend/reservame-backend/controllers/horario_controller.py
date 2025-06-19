from flask import Blueprint, request, jsonify
from db.queries.horario_disponible import (
    alta_horario, listar_horarios, obtener_horario,
    modificar_horario, baja_horario
)

horario_bp = Blueprint('horario', __name__)

@horario_bp.route('/horarios_disponibles', methods=['POST'])
def alta_horario_route():
    data = request.get_json()
    res = alta_horario(
        data.get('id_negocio'),
        data.get('fecha'),
        data.get('hora_inicio'),
        data.get('hora_fin'),
        data.get('cupo_max', 1)
    )
    if 'error' in res:
        return jsonify(res), 400
    return jsonify({"message": "Horario creado", "id": res['id']}), 201


@horario_bp.route('/horarios_disponibles', methods=['GET'])
def listar_horarios_route():
    res = listar_horarios()
    if isinstance(res, dict) and 'error' in res:
        return jsonify(res), 400
    return jsonify(res), 200


@horario_bp.route('/horarios_disponibles/<int:id_horario>', methods=['GET'])
def obtener_horario_route(id_horario):
    res = obtener_horario(id_horario)
    if not res:
        return jsonify({"error": "Horario no encontrado"}), 404
    return jsonify(res), 200


@horario_bp.route('/horarios_disponibles/<int:id_horario>', methods=['PUT'])
def modificar_horario_route(id_horario):
    data = request.get_json()
    res = modificar_horario(
        id_horario,
        data.get('fecha'),
        data.get('hora_inicio'),
        data.get('hora_fin'),
        data.get('cupo_max')
    )
    if isinstance(res, dict) and 'error' in res:
        return jsonify(res), 400
    return jsonify({"message": "Horario modificado"}), 200


@horario_bp.route('/horarios_disponibles/<int:id_horario>', methods=['DELETE'])
def baja_horario_route(id_horario):
    res = baja_horario(id_horario)
    if isinstance(res, dict) and 'error' in res:
        return jsonify(res), 400
    return jsonify({"message": "Horario eliminado"}), 200
