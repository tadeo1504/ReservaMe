from flask import Blueprint, request, jsonify

from db.queries.subHorarioReserva.alta_subHorarioReserva import alta_subHorarioReserva
from db.queries.subHorarioReserva.baja_subHorarioReserva import baja_subHorarioReserva
from db.queries.subHorarioReserva.listar_subHorarioReserva import listar_subHorariosReserva
from db.queries.subHorarioReserva.modificar_subHorarioReserva import modificar_subHorarioReserva
from db.queries.subHorarioReserva.obtener_subHorarioReserva import obtener_subHorarioReserva
from db.queries.subHorarioReserva.obtener_subHorarioReserva_negocio import obtener_subHorarioReserva_negocio

subHorarioReserva_bp = Blueprint('subHorarioReserva_bp', __name__)

# Crear subhorario (POST)
@subHorarioReserva_bp.route('/sub_horarios_reserva', methods=['POST'])
def crear_subHorarioReserva():
    data = request.get_json()
    id_horario_disponible = data.get('id_horario_disponible')
    hora_inicio = data.get('hora_inicio')
    hora_fin = data.get('hora_fin')
    cupos_disponibles = data.get('cupos_disponibles')

    if not all([id_horario_disponible, hora_inicio, hora_fin, cupos_disponibles]):
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    resultado = alta_subHorarioReserva(id_horario_disponible, hora_inicio, hora_fin, cupos_disponibles)
    return jsonify(resultado)

# Obtener todos los subhorarios (GET)
@subHorarioReserva_bp.route('/sub_horarios_reserva', methods=['GET'])
def obtener_todos_subHorariosReserva():
    resultado = listar_subHorariosReserva()
    return jsonify(resultado)

# Obtener subhorario por ID (GET)
@subHorarioReserva_bp.route('/sub_horarios_reserva/<int:id>', methods=['GET'])
def obtener_subHorarioPorId(id):
    resultado = obtener_subHorarioReserva(id)
    return jsonify(resultado)

# Obtener subhorarios por negocio (GET)
@subHorarioReserva_bp.route('/sub_horarios_reserva/negocio/<int:id_negocio>', methods=['GET'])
def obtener_subHorariosPorNegocio(id_negocio):
    resultado = obtener_subHorarioReserva_negocio(id_negocio)
    return jsonify(resultado)

# Modificar subhorario (PUT)
@subHorarioReserva_bp.route('/sub_horarios_reserva/<int:id>', methods=['PUT'])
def actualizar_subHorario(id):
    data = request.get_json()
    hora_inicio = data.get('hora_inicio')
    hora_fin = data.get('hora_fin')
    cupos_disponibles = data.get('cupos_disponibles')

    if not all([hora_inicio, hora_fin, cupos_disponibles]):
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    resultado = modificar_subHorarioReserva(id, hora_inicio, hora_fin, cupos_disponibles)
    return jsonify(resultado)

# Eliminar subhorario (DELETE)
@subHorarioReserva_bp.route('/sub_horarios_reserva/<int:id>', methods=['DELETE'])
def eliminar_subHorario(id):
    resultado = baja_subHorarioReserva(id)
    return jsonify(resultado)
