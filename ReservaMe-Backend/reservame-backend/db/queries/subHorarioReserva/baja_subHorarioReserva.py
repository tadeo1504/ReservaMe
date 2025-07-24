from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def baja_subHorarioReserva(id_sub_horario):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = "DELETE FROM subhorarioreserva WHERE id = %s"
        cursor.execute(query, (id_sub_horario,))
        conexion.commit()
        
        if cursor.rowcount > 0:
            return {"message": "Sub horario de reserva eliminado exitosamente."}
        else:
            return {"message": "No se encontró el sub horario de reserva con el ID proporcionado."}
    
    except Error as e:
        print(f"Error al eliminar el sub horario de reserva: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()