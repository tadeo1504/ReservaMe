from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def baja_reserva(id_reserva):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}

    try:
        cursor = conexion.cursor()

        query_subhorario = """
            SELECT id_sub_horario_reserva
            FROM reservas
            WHERE id_reserva = %s
            FOR UPDATE
        """
        cursor.execute(query_subhorario, (id_reserva,))
        resultado = cursor.fetchone()

        if not resultado:
            return {"error": "No se encontró la reserva con el ID proporcionado."}

        id_sub_horario = resultado[0]

        # Aumentar el cupo del subhorario
        query_update_cupo = """
            UPDATE sub_horarios_reserva
            SET cupos_disponibles = cupos_disponibles + 1
            WHERE id = %s
        """
        cursor.execute(query_update_cupo, (id_sub_horario,))

        # Eliminar la reserva
        query_delete = "DELETE FROM reservas WHERE id_reserva = %s"
        cursor.execute(query_delete, (id_reserva,))

        conexion.commit()
        return True

    except Error as e:
        print(f"Error al eliminar la reserva: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
