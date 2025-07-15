from conexion import crear_conexion, cerrar_conexion
from mysql.connector import Error  

def listar_horarios(id_negocio):
    conn = crear_conexion()
    try:
        if conn is None:
            return {"error": "No se pudo conectar a la base de datos"}
        
        with conn.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM HorarioDisponible WHERE id_negocio = %s"
            cursor.execute(query, (id_negocio,))
            resultados = cursor.fetchall()

            for r in resultados:
                r["hora_inicio"] = str(r["hora_inicio"])
                r["hora_fin"] = str(r["hora_fin"])
            
            return resultados
    except Error as e:
        return {"error": str(e)}
    finally:
        cerrar_conexion(conn)
        if conn:
            conn.close()
