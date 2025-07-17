from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def alta_reserva(id_usuario, id_negocio, fecha, hora_inicio, hora_fin, estado, id_horario_disponible=None):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = """
        INSERT INTO reservas (id_usuario, id_negocio, fecha, hora_inicio, hora_fin, estado, id_horario_disponible)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (id_usuario, id_negocio, fecha, hora_inicio, hora_fin, estado, id_horario_disponible))
        conexion.commit()
        return True
    except Error as e:
        print(f"Error al registrar la reserva: {e}")
        return {"error": str(e)}
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
