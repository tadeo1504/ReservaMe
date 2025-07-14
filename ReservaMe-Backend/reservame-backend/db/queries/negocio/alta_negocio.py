from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def alta_negocio(nombre, descripcion, direccion, telefono_contacto, id_duenio, email, coord_lat, coord_lon):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = """
        INSERT INTO negocios (nombre, descripcion, direccion, telefono, email)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (nombre, descripcion, direccion, telefono_contacto, id_duenio, email, coord_lat, coord_lon))
        conexion.commit()
        return True
    except Error as e:
        print(f"Error al registrar el negocio: {e}")
        return {"error": str(e)}
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()