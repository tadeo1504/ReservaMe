from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error

def obtener_subHorarioReserva(id_sub_horario):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo conectar a la base de datos."}

    try:
        cursor = conexion.cursor(dictionary=True)
        query = "SELECT * FROM subhorarioreserva WHERE id = %s"
        cursor.execute(query, (id_sub_horario,))
        resultado = cursor.fetchone()
        if resultado:
            return resultado
        else:
            return {"message": "No se encontró el sub horario con ese ID."}

    except Error as e:
        print(f"Error al obtener el sub horario: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
