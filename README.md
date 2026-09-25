#  Guía de Acceso a Roles: Administrador y Vendedor

Este proyecto utiliza `localStorage` para gestionar la base de datos de usuarios en el navegador. El sistema cuenta con tres perfiles de acceso (Administrador, Vendedor y Cliente). 

Existen dos métodos para crear y acceder a estas cuentas con privilegios.

## Método 1: Auto-registro público (Palabras clave)
El sistema escanea automáticamente el correo ingresado durante el registro en la página pública. Si detecta palabras clave específicas, asigna el rol de forma automática.

###  Cómo acceder como Administrador
1. En la página principal de la tienda, haz clic en **Registrar usuario**.
2. Completa los datos obligatorios (Nombre, RUN sin puntos ni guion de 7-9 caracteres, Región, Comuna, y una Contraseña de 4 a 10 caracteres).
3. En el campo **CORREO**, ingresa un email que contenga la palabra **`admin`** y que termine en uno de los dominios permitidos (`@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`).
   * *Ejemplos válidos:* `admin@duoc.cl` o `juan.admin@gmail.com`
4. Haz clic en **Registrar** e inicia sesión con estas nuevas credenciales.
5. En el menú superior de la tienda aparecerá un botón verde llamado **"⚙️ Panel Admin"** que te dará acceso total al CRUD de Productos y Usuarios.

### 📋 Cómo acceder como Vendedor
1. Ve a la sección **Registrar usuario**.
2. Completa los datos personales requeridos en el formulario.
3. En el campo **CORREO**, ingresa un email que contenga la palabra **`vendedor`** y que termine en un dominio permitido.
   * *Ejemplos válidos:* `vendedor@duoc.cl` o `ventas.vendedor@gmail.com`
4. Haz clic en **Registrar** e inicia sesión.
5. En el menú superior de la tienda aparecerá un botón verde llamado **"📋 Panel Vendedor"**. Este rol solo tiene acceso a la gestión del catálogo de productos y tiene bloqueada la vista de usuarios.

---

## Método 2: Creación directa desde el Panel de Control
Una vez que hayas creado tu primera cuenta de Administrador mediante el Método 1, puedes crear cuentas para tu equipo de trabajo sin depender de las palabras clave en el correo.

1. Inicia sesión como **Administrador** y entra al **⚙️ Panel Admin**.
2. En el menú superior del panel, haz clic en la pestaña **Usuarios**.
3. Presiona el botón azul **+ Agregar Nuevo Usuario**.
4. Completa el formulario administrativo. En el menú desplegable **ROL DEL SISTEMA**, selecciona directamente la opción `Administrador` o `Vendedor`.
5. Haz clic en **Guardar Usuario**. El nuevo miembro podrá iniciar sesión de inmediato con los privilegios exactos que le asignaste.
