from conexion import crear_conexion, cerrar_conexion
from _mysql_connector import Error

def listar_reservas():
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor(dictionary=True)
        query = "SELECT * FROM reservas"
        cursor.execute(query)
        reservas = cursor.fetchall()
        
        if reservas:
            return reservas  # Retorna la lista de reservas encontradas
        else:
            return {"message": "No se encontraron reservas."}
    
    except Error as e:
        print(f"Error al listar las reservas: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()