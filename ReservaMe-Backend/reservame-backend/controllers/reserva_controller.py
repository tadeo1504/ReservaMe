from db.queries.reserva import (
    alta_reserva,
    listar_reservas,
    obtener_reserva,
    modificar_reserva,
    baja_reserva
)
from flask import Blueprint, request, jsonify
from datetime import datetime



reserva_bp = Blueprint('reserva', __name__)

@reserva_bp.route('/reservas', methods=['POST'])
def alta_reserva_route():
    data = request.get_json()
    id_usuario = data.get('id_usuario')
    id_negocio = data.get('id_negocio')
    fecha = data.get('fecha')
    hora_inicio = data.get('hora_inicio')
    id_horario_disponible = data.get('id_horario_disponible')
    hora_fin = data.get('hora_fin')
    estado = data.get('estado', 'pendiente')
    cupo_maximo = data.get('cupo_maximo')
    id_sub_horario_reserva = data.get('id_sub_horario_reserva')

    if cupo_maximo is not None or cupo_maximo < 1:
        return jsonify({"error": "No hay cupos disponibles"}), 400

    if not id_usuario or not id_negocio or not fecha or not hora_inicio or not hora_fin:
        return jsonify({"error": "Faltan datos requeridos"}), 400
    if estado not in ['pendiente', 'confirmada', 'cancelada']:
        return jsonify({"error": "Estado inválido"}), 400


    resultado = alta_reserva.alta_reserva(id_usuario=id_usuario, id_negocio=id_negocio, fecha=fecha, hora_inicio=hora_inicio, hora_fin=hora_fin, estado=estado, id_horario_disponible=id_horario_disponible, id_sub_horario_reserva=id_sub_horario_reserva)

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400

    return jsonify({"message": "Reserva creada exitosamente."}), 201

@reserva_bp.route('/reservas', methods=['GET'])
def listar_reservas_route():
    resultado = listar_reservas.listar_reservas()

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400

    return jsonify(resultado), 200

@reserva_bp.route('/reservas/<int:id_reserva>', methods=['GET'])
def obtener_reserva_route(id_reserva):
    resultado = obtener_reserva.obtener_reserva(id_reserva)

    if resultado is None or (isinstance(resultado, dict) and 'error' in resultado):
        return jsonify({"error": "Reserva no encontrada."}), 404

    return jsonify(resultado), 200

@reserva_bp.route('/reservas/<int:id_reserva>', methods=['PUT'])
def modificar_reserva_route(id_reserva):
    data = request.get_json()
    fecha = data.get('fecha')
    hora_inicio = data.get('hora_inicio')
    hora_fin = data.get('hora_fin')
    estado = data.get('estado')

    resultado = modificar_reserva.modificar_reserva(id_reserva, fecha, hora_inicio, hora_fin, estado)

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400

    return jsonify({"message": "Reserva modificada exitosamente."}), 200

@reserva_bp.route('/reservas/<int:id_reserva>', methods=['DELETE'])
def baja_reserva_route(id_reserva):
    resultado = baja_reserva.baja_reserva(id_reserva)

    if isinstance(resultado, dict) and 'error' in resultado:
        return jsonify(resultado), 400

    return jsonify({"message": "Reserva eliminada exitosamente."}), 200
