from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error
import hashlib

def hash_contrasena(contrasena):
    """Genera un hash SHA-256 de la contraseña."""
    return hashlib.sha256(contrasena.encode()).hexdigest()

def alta_usuario(nombre, apellido, telefono, email, contrasena, rol):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    try:
        contrasena_hash = hash_contrasena(contrasena)
        cursor = conexion.cursor()
        query = """
        INSERT INTO usuario
        (nombre, apellido, telefono, correo, contrasena_hash, rol)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (nombre, apellido, telefono, email, contrasena_hash, rol))
        conexion.commit()
        return True
    except Error as e:
        print(f"Error al registrar el usuario: {e}")
        return {"error": str(e)}
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()

