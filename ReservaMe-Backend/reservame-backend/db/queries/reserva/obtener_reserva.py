from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def obtener_reserva(id_reserva):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor(dictionary=True)
        query = "SELECT * FROM reservas WHERE id_reserva = %s"
        cursor.execute(query, (id_reserva,))
        reserva = cursor.fetchone()
        
        if reserva:
            return reserva  # Retorna la reserva encontrada
        else:
            return {"message": "No se encontró la reserva con el ID proporcionado."}
    
    except Error as e:
        print(f"Error al obtener la reserva: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()