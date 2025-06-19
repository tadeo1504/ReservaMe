from conexion import crear_conexion, cerrar_conexion
from _mysql_connector import Error

def modificar_negocio(id_negocio, id_duenio, nombre=None, descripcion=None, telefono_contacto=None, email=None):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = "UPDATE negocios SET "
        params = []

        if nombre is not None:
            query += "nombre = %s, "
            params.append(nombre)
        if descripcion is not None:
            query += "descripcion = %s, "
            params.append(descripcion)
        if telefono_contacto is not None:
            query += "telefono_contacto = %s, "
            params.append(telefono_contacto)
        if email is not None:
            query += "email = %s, "
            params.append(email)

        # Eliminar la última coma y espacio
        query = query.rstrip(", ")
        query += " WHERE id_negocio = %s AND id_duenio = %s"
        params.append(id_negocio, id_duenio)

        cursor.execute(query, tuple(params))
        conexion.commit()

        return True

    except Error as e:
        print(f"Error al editar el negocio: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()