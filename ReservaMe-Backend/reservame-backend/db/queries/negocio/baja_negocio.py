from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def baja_negocio(id_negocio, id_duenio):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        # Verificar si el negocio pertenece al dueño
        if id_duenio is not None:
            cursor = conexion.cursor()
            query = "SELECT id_negocio FROM negocio WHERE id_negocio = %s AND id_duenio = %s"
            cursor.execute(query, (id_negocio, id_duenio))
            resultado = cursor.fetchone()

            if resultado is None:
                return {"error": "El negocio no pertenece al dueño especificado."}
        cursor = conexion.cursor()
        query = "DELETE FROM negocio WHERE id_negocio = %s"
        cursor.execute(query, (id_negocio,))
        conexion.commit()

        if cursor.rowcount > 0:
            return True
        else:
            return {"error": "No se encontró el negocio con el ID proporcionado."}

    except Error as e:
        print(f"Error al eliminar el negocio: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()