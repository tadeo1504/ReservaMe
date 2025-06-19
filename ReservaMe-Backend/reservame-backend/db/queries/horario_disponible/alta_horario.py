from conexion import crear_conexion, cerrar_conexion   

def alta_horario(id_negocio, fecha, hora_ini, hora_fin, cupo_max):
    try:
        conn = crear_conexion()
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO HorarioDisponible
                    (id_negocio, fecha, hora_inicio, hora_fin, cupo_max)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (id_negocio, fecha, hora_ini, hora_fin, cupo_max)
            )
        conn.commit()
        return {"id": cur.lastrowid}
    except Exception as e:
        return {"error": str(e)}
    finally:
        cerrar_conexion(conn)
        if cur:
            cur.close()

