from conexion import crear_conexion, cerrar_conexion
from _mysql_connector import Error

def modificar_reserva(id_reserva, id_usuario=None, id_negocio=None, fecha=None, hora_inicio=None, hora_fin=None, estado=None):
    conexion = crear_conexion()
    if conexion is None:
        return {"error": "No se pudo establecer la conexión a la base de datos."}
    
    try:
        cursor = conexion.cursor()
        query = "UPDATE reservas SET "
        params = []

        if id_usuario is not None:
            query += "id_usuario = %s, "
            params.append(id_usuario)
        if id_negocio is not None:
            query += "id_negocio = %s, "
            params.append(id_negocio)
        if fecha is not None:
            query += "fecha = %s, "
            params.append(fecha)
        if hora_inicio is not None:
            query += "hora_inicio = %s, "
            params.append(hora_inicio)
        if hora_fin is not None:
            query += "hora_fin = %s, "
            params.append(hora_fin)
        if estado is not None:
            query += "estado = %s, "
            params.append(estado)

        # Eliminar la última coma y espacio
        query = query.rstrip(", ")
        query += " WHERE id_reserva = %s"
        params.append(id_reserva)

        cursor.execute(query, tuple(params))
        conexion.commit()

        if cursor.rowcount > 0:
            return True
        else:
            return {"error": "No se encontró la reserva con el ID proporcionado."}

    except Error as e:
        print(f"Error al modificar la reserva: {e}")
        return {"error": str(e)}
    
    finally:
        cerrar_conexion(conexion)
        if cursor:
            cursor.close()