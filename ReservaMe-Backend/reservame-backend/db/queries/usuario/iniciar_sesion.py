from conexion import crear_conexion, cerrar_conexion
from _mysql_connector import Error
from dotenv import load_dotenv
import hashlib

def iniciar_sesion(email, contrasena):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor(dictionary=True)
        contrasena_hash = hashlib.sha256(contrasena.encode()).hexdigest()  # Hash de la contraseña
        query = """
        SELECT * FROM usuarios WHERE email = %s AND contrasena = %s
        """
        cursor.execute(query, (email, contrasena_hash))
        usuario = cursor.fetchone()
        
        if usuario:
            return usuario  # Retorna el usuario encontrado
        else:
            return True
    
    except Error as e:
        print(f"Error al iniciar sesión: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()  