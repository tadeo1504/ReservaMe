import os

class Config:
    SQL_SERVER = os.getenv('SQL_SERVER', 'LAPTOP-OMEVDG9L')
    SQL_DATABASE = os.getenv('SQL_DATABASE', 'ReservaMe')
