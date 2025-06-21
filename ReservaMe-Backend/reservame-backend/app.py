from flask import Flask
from flask_cors import CORS
from controllers.usuario_controller import usuario_bp
from controllers.negocio_controller import negocio_bp
from controllers.reserva_controller import reserva_bp
from controllers.horario_controller import horario_bp

def create_app():
    app = Flask(__name__)
    
    # Habilitar CORS para permitir conexión con frontend (ej: React)
    CORS(app)

    # Registrar Blueprints
    app.register_blueprint(usuario_bp, url_prefix='/api/usuarios')
    app.register_blueprint(negocio_bp, url_prefix='/api/negocios')
    app.register_blueprint(reserva_bp, url_prefix='/api/reservas')
    app.register_blueprint(horario_bp, url_prefix='/api/horarios')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
