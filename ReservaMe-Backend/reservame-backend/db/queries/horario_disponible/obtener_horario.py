from conexion import crear_conexion, cerrar_conexion
from _mysql_connector import Error

def obtener_horario(id_horario):
    conn = crear_conexion()
    try:
        if conn is None:
            return {"error": "No se pudo establecer la conexión a la base de datos."}
        with conn.cursor(dictionary=True) as cur:
            cur.execute("""
                SELECT * FROM HorarioDisponible WHERE id = %s
            """, (id_horario,))
            return cur.fetchone()
    finally:
        cerrar_conexion(conn)
        if conn:
            conn.close()
        if cur:
            cur.close()


