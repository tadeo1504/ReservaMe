from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def modificar_usuario(id_usuario, nombre=None, apellido=None, telefono=None, email=None):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = "UPDATE usuario SET "
        params = []

        if nombre is not None:
            query += "nombre = %s, "
            params.append(nombre)
        if apellido is not None:
            query += "apellido = %s, "
            params.append(apellido)
        if telefono is not None:
            query += "telefono = %s, "
            params.append(telefono)
        if email is not None:
            query += "email = %s, "
            params.append(email)

        # Eliminar la última coma y espacio
        query = query.rstrip(", ")
        query += " WHERE id_usuario = %s"
        params.append(id_usuario)

        cursor.execute(query, tuple(params))
        conexion.commit()

        return True

    except Error as e:
        print(f"Error al editar el usuario: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()