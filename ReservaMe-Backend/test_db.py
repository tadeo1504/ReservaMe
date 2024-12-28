from app import create_app
from app.db import get_db

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        try:
            # Intentar conectarse a la base de datos
            db = get_db()
            cursor = db.cursor()
            cursor.execute("SELECT name FROM sys.databases")
            databases = cursor.fetchall()

            print("Conexión exitosa. Bases de datos disponibles:")
            for db_name in databases:
                print(f"- {db_name[0]}")
            
            cursor.close()
        except Exception as e:
            print("Error al conectar con la base de datos:")
            print(e)
