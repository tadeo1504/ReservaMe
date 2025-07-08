from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def nuevos_negocios():
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}

    try:
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM negocios order by fecha_creacion DESC LIMIT 5")
        resultados = cursor.fetchall()
        return resultados
    except Error as e:
        print("Error al obtener nuevos negocios:", e)
        return {"error": "Error al obtener nuevos negocios."}
    finally:
        cerrar_conexion(conexion)
