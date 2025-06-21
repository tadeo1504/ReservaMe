import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

def crear_conexion():
    try:
       conexion = mysql.connector.connect(
       host=os.getenv("DB_HOST"),
       user=os.getenv("DB_USER"),
       password=os.getenv("DB_PASSWORD"),
       database=os.getenv("DB_NAME")
    )
       if conexion.is_connected():
            print("Connection established successfully.")
            return conexion
    except Error as e:
        print(f"Error connecting to the database: {e}")
    return None

def cerrar_conexion(conexion):
    if conexion.is_connected():
        conexion.close()
        print("Connection closed.")
    else:
        print("Connection is already closed.")