const { Pool } = require("pg");
require('console-success');

const pool_conexion = new Pool ({
user: "postgres",
host: "localhost",
password: "xxxxxx",
database: "always_music",
port: 5432,
max: 20,
idleTimeoutMillis: 5000,
connectionTimeoutMillis: 2000,
});

const parametros = process.argv;
const funcion = parametros[2];
const nombre = parametros[3];
const rut = parametros[4];
const curso = parametros[5];
const nivel = parametros[6];

pool_conexion.connect(async (error_conexion, pool_client, release) => {
    if(error_conexion){
        return console.error('Error de conexion: ', error_conexion.stack);
    }
    if(funcion == 'consulta'){
        const consulta = {
            name: 'consulta',
            text: "SELECT * FROM estudiantes",
            rowMode: 'array',
            };
            pool_client.query(consulta, (error_consultaSQL, resultado) => {
                release();
                if(error_consultaSQL){
                    return console.error('Error en la consulta: ', error_consultaSQL.stack);
                }
                console.success(resultado.rows);
            })
    }
    if(funcion == 'nuevo'){
        const ingresar = {
            name: 'ingresar',
            text: `insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4)`,
            values: [nombre, rut, curso, nivel],
            rowMode: 'array',
            };
            pool_client.query(ingresar, (error_consultaSQL) => {
                release();
                if(error_consultaSQL){
                    return console.error('Error en la consulta: ', error_consultaSQL.stack);
                }
                console.success(`Registro de estudiante ${nombre}, exitoso`);
            })
    }
    if(funcion == 'actualizar'){
        const actualizar = {
            name: 'actualizar',
            text: `UPDATE estudiantes SET nombre = $1, rut = $2, curso = $3, nivel = $4 WHERE nombre = $1`,
            values: [nombre, rut, curso, nivel],
            rowMode: 'array',
            };
            pool_client.query(actualizar, (error_consultaSQL) => {
                release();
                if(error_consultaSQL){
                    return console.error('Error en la consulta: ', error_consultaSQL.stack);
                }
                console.success(`Estudiante ${nombre}, fue actualizado`);
            })
    }
    if(funcion == 'buscaRut'){
        const buscaRut = {
            name: 'buscaRut',
            text: `SELECT rut FROM estudiantes WHERE rut = $1`,
            values: [rut],
            rowMode: 'array',
            };
            pool_client.query(buscaRut, (error_consultaSQL) => {
                release();
                if(error_consultaSQL){
                    return console.error('Error en la consulta: ', error_consultaSQL.stack);
                }
                console.success(`Rut ${rut}, encontrado`);
            })
    }
    if(funcion == 'borraRut'){
        const borraRut = {
            name: 'borraRut',
            text: `DELETE FROM estudiantes WHERE rut = $1`,
            values: [rut],
            rowMode: 'array',
            };
            pool_client.query(borraRut, (error_consultaSQL) => {
                release();
                if(error_consultaSQL){
                    return console.error('Error en la consulta: ', error_consultaSQL.stack);
                }
                console.success(`Eliminado registro para Rut, ${rut}`);
            })
    }

pool_conexion.end();
})
