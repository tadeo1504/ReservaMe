from flask import Flask, jsonify
from auth.routes import auth_bp
# from routes.user import users_bp
import os
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()  # Carga las variables de entorno

app = Flask(__name__)
CORS(app)  # Habilita CORS globalmente

# Registrar Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
# app.register_blueprint(users_bp, url_prefix='/users')

# Manejo de errores generales
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Ruta no encontrada"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Error interno del servidor"}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))  # Usa el puerto del .env o 5000 por defecto
    app.run(debug=True, host="0.0.0.0", port=port)
