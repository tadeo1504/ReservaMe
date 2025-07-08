from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error
from dotenv import load_dotenv
import os
import hashlib
import jwt

def iniciar_sesion(email, contrasena):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    if not email or not contrasena:
        return {"error": "Email y contraseña son requeridos."}
    # cargar la secret key desde el archivo .env
    load_dotenv()
    secret_key = os.getenv("JWT_SECRET_KEY")


    if not secret_key:
        return {"error": "No se encontró la clave secreta para JWT."}
    try:
        cursor = conexion.cursor(dictionary=True)
        contrasena_hash = hashlib.sha256(contrasena.encode()).hexdigest()  # Hash de la contraseña
        query = """
        SELECT * FROM usuario WHERE correo = %s AND contrasena_hash = %s
        """
        cursor.execute(query, (email, contrasena_hash))
        usuario = cursor.fetchone()
        # Si el usuario existe, generamos un token JWT
        if usuario:
            # Generar token JWT
            payload = {
                'id_usuario': usuario['id'],
                'email': usuario['correo'],
                'rol': usuario['rol']
            }
            token = jwt.encode(payload, secret_key, algorithm='HS256')  

            # Agregar el token al usuario
            usuario['token'] = token    
        if usuario:
            return usuario  # Retorna el usuario encontrado
        else:
            return {"error": "Credenciales incorrectas"} 
    
    except Error as e:
        print(f"Error al iniciar sesión: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()  