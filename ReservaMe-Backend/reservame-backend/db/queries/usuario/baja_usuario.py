from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def baja_usuario(id_usuario):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = "DELETE FROM usuarios WHERE id_usuario = %s"
        cursor.execute(query, (id_usuario,))
        conexion.commit()

        if cursor.rowcount > 0:
            return True
        else:
            return {"error": "No se encontró el usuario con el ID proporcionado."}

    except Error as e:
        print(f"Error al eliminar el usuario: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()  