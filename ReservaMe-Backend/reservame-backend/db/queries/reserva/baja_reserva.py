from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def baja_reserva(id_reserva):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = "DELETE FROM reservas WHERE id_reserva = %s"
        cursor.execute(query, (id_reserva,))
        conexion.commit()

        if cursor.rowcount > 0:
            return True
        else:
            return {"error": "No se encontró la reserva con el ID proporcionado."}

    except Error as e:
        print(f"Error al eliminar la reserva: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
            