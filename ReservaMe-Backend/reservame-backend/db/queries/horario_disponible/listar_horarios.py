from conexion import crear_conexion, cerrar_conexion
import _mysql_connector.Error

def listar_horarios():
    conn = crear_conexion()
    if conn is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute("""
                SELECT hd.*,
                    ( SELECT COUNT(*)
                        FROM Reserva r
                        WHERE r.id_horario_disponible = hd.id ) AS reservas_actuales
                FROM HorarioDisponible hd
                HAVING reservas_actuales < cupo_max
            """)
            return cur.fetchall()
    finally:
        cerrar_conexion(conn)
        if cur:
            cur.close()