from conexion import crear_conexion, cerrar_conexion

def baja_horario(id_horario):
    try:
        conn = crear_conexion()
        with conn.cursor() as cur:
            cur.execute("DELETE FROM HorarioDisponible WHERE id=%s", (id_horario,))
        conn.commit()
        return True
    except Exception as e:
        return {"error": str(e)}
    finally:
        cerrar_conexion(conn)
        if cur:
            cur.close()