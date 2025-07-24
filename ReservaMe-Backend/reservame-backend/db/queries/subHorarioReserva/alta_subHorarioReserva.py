from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def alta_subHorarioReserva(id_horario_disponible, hora_inicio, hora_fin, cupos_disponibles):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = """
            INSERT INTO subhorarioreserva (id_horario_disponible, hora_inicio, hora_fin, cupos_disponibles, creado_en)
            VALUES (%s, %s, %s, %s, NOW())
        """
        cursor.execute(query, (id_horario_disponible, hora_inicio, hora_fin, cupos_disponibles))
        conexion.commit()
        
        return {"message": "Sub horario de reserva creado exitosamente.", "id_sub_horario": cursor.lastrowid}
    
    except Error as e:
        print(f"Error al crear el sub horario de reserva: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()