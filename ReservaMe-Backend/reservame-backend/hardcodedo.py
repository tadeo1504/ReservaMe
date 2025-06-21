"""
Poblar la tabla Usuario con 10 registros de prueba.
Ejecutar con:  python scripts/poblar_usuarios.py
"""

# Ajustá el import según tu estructura real
from db.queries.usuario.alta_usuario import alta_usuario

usuarios_demo = [
    # nombre, apellido, teléfono, correo, contraseña en texto plano, rol
    ("Juan",    "Pérez",   "099123456", "juan@example.com",   "claveJuan!",  "duenio"),
    ("María",   "Gómez",   "098234567", "maria@example.com",  "claveMaria!", "cliente"),
    ("Lucía",   "Fernández","091345678", "lucia@example.com", "claveLucia!", "cliente"),
    ("Pedro",   "Silva",   "094456789", "pedro@example.com",  "clavePedro!", "duenio"),
    ("Sofía",   "Rodríguez","092567890","sofia@example.com",  "claveSofia!", "cliente"),
    ("Diego",   "López",   "095678901", "diego@example.com",  "claveDiego!", "cliente"),
    ("Carla",   "Suárez",  "097789012", "carla@example.com",  "claveCarla!", "duenio"),
    ("Nicolás", "Díaz",    "091890123", "nico@example.com",   "claveNico!",  "cliente"),
    ("Valeria", "Martín",  "099901234", "valeria@example.com","claveVale!",  "cliente"),
    ("Admin",   "Root",    "000000000", "admin@example.com",  "admin123!",   "admin"),
]

if __name__ == "__main__":
    for nombre, apellido, tel, correo, pwd, rol in usuarios_demo:
        res = alta_usuario(
            nombre=nombre,
            apellido=apellido,
            telefono=tel,
            email=correo,         # tu función usa `email`
            contrasena=pwd,
            rol=rol
        )
        if res is True:
            print(f"✔️  {nombre} {apellido} insertado correctamente.")
        else:
            print(f"❌  Error con {nombre} {apellido}: {res}")
