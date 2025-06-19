# from flask import Blueprint, request, jsonify
# from auth.models import User
# from conexion import get_db_connection

# auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/register', methods=['POST'])
# def register():
#     data = request.json
#     name, email, password, rol = data.get("name"), data.get("email"), data.get("password"), data.get("rol")

#     if not name or not email or not password:
#         return jsonify({"error": "Todos los campos son obligatorios"}), 400

#     hashed_password = User.hash_password(password)
#     conn = get_db_connection()
#     cursor = conn.cursor()
    
#     try:
#         cursor.execute(
#             "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
#             (name, email, hashed_password)
#         )
#         conn.commit()
#         return jsonify({"message": "Usuario registrado con éxito"}), 201
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         cursor.close()
#         conn.close()

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     email, password = data.get("email"), data.get("password")

#     if not email or not password:
#         return jsonify({"error": "Email y contraseña requeridos"}), 400

#     conn = get_db_connection()
#     cursor = conn.cursor()
    
#     cursor.execute("SELECT id, name, email, password FROM users WHERE email = ?", (email,))
#     user = cursor.fetchone()

#     if user and User.check_password(user[3], password):
#         return jsonify({"message": "Login exitoso", "user": {"id": user[0], "name": user[1], "email": user[2]}})
#     else:
#         return jsonify({"error": "Credenciales inválidas"}), 401
    
# @auth_bp.route('/users', methods=['GET'])
# def get_users():
#     conn = get_db_connection()
#     cursor = conn.cursor()
    
#     cursor.execute("SELECT id, name, email FROM users")
#     users = cursor.fetchall()

#     users_list = []
#     for user in users:
#         users_list.append({"id": user[0], "name": user[1], "email": user[2]})

#     return jsonify(users_list)