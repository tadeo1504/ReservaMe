from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error
from datetime import time, datetime, timedelta

def obtener_subHorarioReserva_negocio(id_negocio):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo conectar a la base de datos."}

    try:
        cursor = conexion.cursor(dictionary=True)
        query = """
            SELECT shr.*
            FROM subhorarioreserva shr
            JOIN horariodisponible hd ON shr.id_horario_disponible = hd.id
            WHERE hd.id_negocio = %s
        """
        cursor.execute(query, (id_negocio,))
        resultados_raw = cursor.fetchall()

        resultados = []
        for fila in resultados_raw:
            fila_serializable = {}
            for k, v in fila.items():
                if isinstance(v, (datetime, time, timedelta)):
                    fila_serializable[k] = str(v)
                else:
                    fila_serializable[k] = v
            resultados.append(fila_serializable)

        return resultados

    except Error as e:
        print(f"Error al obtener los sub horarios del negocio: {e}")
        return {"error": str(e)}

    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()
