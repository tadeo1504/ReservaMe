from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def obtener_negocio(id_negocio):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor(dictionary=True)
        query = "SELECT * FROM negocios WHERE id_negocio = %s"
        cursor.execute(query, (id_negocio,))
        negocio = cursor.fetchone()
        
        if negocio:
            return negocio  # Retorna el negocio encontrado
        else:
            return {"message": "No se encontró el negocio con el ID proporcionado."}
    
    except Error as e:
        print(f"Error al obtener el negocio: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()