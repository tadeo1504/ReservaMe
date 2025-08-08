from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def obtener_reservas_usuario(id_usuario):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}

    try:
        cursor = conexion.cursor(dictionary=True)
        query = """
            SELECT 
                r.*, 
                n.nombre AS nombre_negocio,
                shr.hora_inicio,
                shr.hora_fin
            FROM reservas r
            JOIN negocios n ON r.id_negocio = n.id
            LEFT JOIN subhorarioreserva shr ON r.id_sub_horario_reserva = shr.id
            WHERE r.id_usuario = %s AND r.estado != 'cancelada'
        """
        cursor.execute(query, (id_usuario,))
        reservas = cursor.fetchall()

        if not reservas:
            return {"message": "No se encontraron reservas para el usuario."}

        return reservas

    except Error as e:
        print(f"Error al obtener las reservas del usuario: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
