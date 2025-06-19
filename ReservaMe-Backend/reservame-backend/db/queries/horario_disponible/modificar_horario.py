from conexion import crear_conexion, cerrar_conexion

def modificar_horario(id_horario, fecha, hora_ini, hora_fin, cupo_max):
    try:
        conn = crear_conexion()
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE HorarioDisponible
                SET fecha=%s, hora_inicio=%s, hora_fin=%s, cupo_max=%s
                WHERE id=%s
                """,
                (fecha, hora_ini, hora_fin, cupo_max, id_horario)
            )
        conn.commit()
        return True
    except Exception as e:
        return {"error": str(e)}
    finally:
        cerrar_conexion(conn)
        if cur:
            cur.close()

