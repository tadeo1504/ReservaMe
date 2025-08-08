from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def alta_reserva(id_usuario, id_negocio, creada_en, estado, id_horario_disponible, id_sub_horario_reserva):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}

    try:
        cursor = conexion.cursor()

        # Verificar cupo disponible
        query_check = "SELECT cupos_disponibles FROM subhorarioreserva WHERE id = %s FOR UPDATE"
        cursor.execute(query_check, (id_sub_horario_reserva,))
        resultado = cursor.fetchone()

        if resultado is None:
            return {"error": "El sub horario no existe."}

        cupos = resultado[0]
        if cupos <= 0:
            return {"error": "No hay cupos disponibles para este sub horario."}

        # Insertar reserva
        query_insert = """
        INSERT INTO reservas (
            id_usuario, id_negocio, creada_en, estado, id_horario_disponible, id_sub_horario_reserva
        ) VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query_insert, (
            id_usuario, id_negocio, creada_en, estado,
            id_horario_disponible, id_sub_horario_reserva
        ))

        # Decrementar cupo
        query_update = """
        UPDATE subhorarioreserva
        SET cupos_disponibles = cupos_disponibles - 1
        WHERE id = %s
        """
        cursor.execute(query_update, (id_sub_horario_reserva,))

        conexion.commit()
        return {"message": "Reserva creada exitosamente."}

    except Error as e:
        print(f"Error al registrar la reserva: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
