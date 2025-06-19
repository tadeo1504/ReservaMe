from conexion import crear_conexion, cerrar_conexion
from _mysql_connector import Error

def obtener_usuario(id_usuario):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor(dictionary=True)
        query = "SELECT * FROM usuarios WHERE id_usuario = %s"
        cursor.execute(query, (id_usuario,))
        usuario = cursor.fetchone()
        
        if usuario:
            return usuario  # Retorna el usuario encontrado
        else:
            return {"message": "No se encontró el usuario con el ID proporcionado."}
    
    except Error as e:
        print(f"Error al obtener el usuario: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()