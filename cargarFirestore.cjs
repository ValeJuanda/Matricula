const admin = require('firebase-admin');
const fs = require('fs');

// Reemplaza la ruta por la de tu archivo de credenciales
const serviceAccount = {"type": import.meta.env.VITE_TYPE,
  "project_id": import.meta.env.VITE_PROJECT_ID,
  "private_key_id": import.meta.env.VITE_PRIVATE_KEY_ID,
  "private_key":  import.meta.env.VITE_PRIVATE_KEY,
  "client_email":  import.meta.env.VITE_CLIENT_EMAIL,
  "client_id": import.meta.env.VITE_CLIENT_ID,
  "auth_uri":  import.meta.env.VITE_AUTH_URI,
  "token_uri": import.meta.env.VITE_TOKEN_URI,
  "auth_provider_x509_cert_url":  import.meta.env.VITE_AUTH_PROVIDER_X509_CERT_URL ,
  "client_x509_cert_url":  import.meta.env.VITE_CLIENT_X509_CERT_URL,
  "universe_domain":  import.meta.env.VITE_UNIVERSE_DOMAIN 

}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Lee tu archivo db.json
const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

// Función para cargar una colección
async function cargarColeccion(nombre, docs) {
  for (const docu of docs) {
    const id = docu.id ? String(docu.id) : undefined;
    const ref = id ? db.collection(nombre).doc(id) : db.collection(nombre).doc();
    await ref.set(docu);
    console.log(`Agregado a ${nombre}:`, id || ref.id);
  }
}

async function main() {
  if (data.usuarios) await cargarColeccion('usuarios', data.usuarios);
  if (data.cursos) await cargarColeccion('cursos', data.cursos);
  if (data.horarios) await cargarColeccion('horarios', data.horarios);
  if (data.profesores) await cargarColeccion('profesores', data.profesores);
  if (data.salones) await cargarColeccion('salones', data.salones);
  console.log('Carga inicial completada.');
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
