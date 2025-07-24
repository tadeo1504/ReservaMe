from conexion import cerrar_conexion, crear_conexion
from mysql.connector import Error

def modificar_subHorarioReserva(id_sub_horario, hora_inicio, hora_fin, cupos_disponibles):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo conectar a la base de datos."}

    try:
        cursor = conexion.cursor()
        query = """
            UPDATE subhorarioreserva
            SET hora_inicio = %s, hora_fin = %s, cupos_disponibles = %s
            WHERE id = %s
        """
        cursor.execute(query, (hora_inicio, hora_fin, cupos_disponibles, id_sub_horario))
        conexion.commit()

        if cursor.rowcount > 0:
            return {"message": "Sub horario actualizado correctamente."}
            
        else:
            return {"message": "No se encontró el sub horario con ese ID."}

    except Error as e:
        print(f"Error al actualizar el sub horario: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
