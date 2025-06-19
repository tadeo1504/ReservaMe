from flask import Blueprint, request, jsonify
from auth.models import User
from conexion import get_db_connection
import bcrypt



auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    nombre, apellido, email, contrasena = data.get("nombre"), data.get("email"), data.get("contrasena"), data.get("apellido")

    if not nombre or not email or not contrasena or not apellido:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    hashed_password = User.hash_password(contrasena)
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
    "INSERT INTO users (nombre, email, contrasena, apellido) VALUES (?, ?, ?, ?)",
    (nombre, email, hashed_password, apellido)
)
        conn.commit()
        return jsonify({"message": "Usuario registrado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email, contrasena = data.get("email"), data.get("contrasena")

    if not email or not contrasena:
        return jsonify({"error": "Email y contraseña requeridos"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, nombre, email, contrasena FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    

    if user and User.check_password(user[3], contrasena):
        return jsonify({"message": "Login exitoso", "user": {"id": user[0], "nombre": user[1], "email": user[2]}})
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401


@auth_bp.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, nombre, apellido ,email, rol, created_at FROM users")
    users = cursor.fetchall()

    users_list = []
    for user in users:
        users_list.append({"id": user[0], "nombre": user[1], "apellido": user[3], "email": user[2], "rol": user[4], "created_at": user[5]
        })

    return jsonify({"users": users_list})

