from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def listar_subHorariosReserva():
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo conectar a la base de datos."}

    try:
        cursor = conexion.cursor(dictionary=True)
        query = "SELECT * FROM subhorarioreserva"
        cursor.execute(query)
        resultados = cursor.fetchall()
        return resultados

    except Error as e:
        print(f"Error al obtener los sub horarios: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
