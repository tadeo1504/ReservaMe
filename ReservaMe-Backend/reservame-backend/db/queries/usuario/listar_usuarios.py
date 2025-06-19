from conexion import crear_conexion, cerrar_conexion
from _mysql_connector import Error

def listar_usuarios():
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor(dictionary=True)
        query = "SELECT * FROM usuarios"
        cursor.execute(query)
        usuarios = cursor.fetchall()
        
        if usuarios:
            return usuarios  # Retorna la lista de usuarios encontrados
        else:
            return {"message": "No se encontraron usuarios."}
    
    except Error as e:
        print(f"Error al listar los usuarios: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()