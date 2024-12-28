import pyodbc
from flask import current_app, g

def get_db():
    """
    Devuelve la conexión activa a la base de datos. Si no existe una conexión, la crea.
    """
    if 'db' not in g:
        g.db = pyodbc.connect(
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={current_app.config['SQL_SERVER']};"
            f"DATABASE={current_app.config['SQL_DATABASE']};"
            f"Trusted_Connection=yes;"
        )
    return g.db

def close_db(e=None):
    """
    Cierra la conexión a la base de datos si existe.
    """
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db(app):
    """
    Configura la aplicación Flask para usar la base de datos.
    """
    app.teardown_appcontext(close_db)
