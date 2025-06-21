from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def listar_negocios():
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor(dictionary=True)
        query = "SELECT * FROM negocios"
        cursor.execute(query)
        negocios = cursor.fetchall()
        
        if negocios:
            return negocios  # Retorna la lista de negocios encontrados
        else:
            return {"message": "No se encontraron negocios."}
    
    except Error as e:
        print(f"Error al listar los negocios: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()