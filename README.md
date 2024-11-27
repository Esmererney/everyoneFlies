# EveryoneFlies - Sistema de Reservas de Vuelos

Un sistema robusto y escalable para gestionar vuelos, reservas y tickets, diseñado para ofrecer una experiencia fluida y eficiente tanto a los pasajeros como al personal de la aerolínea.

---

## Funcionalidades Clave  

### Gestión de Vuelos  
- **Datos del vuelo:**  
  - ID, código, aerolínea, origen/destino, horarios, duración, asientos disponibles, categorías (economía, business, etc.), y precios ajustables según demanda/temporada.  
- **Operaciones:**  
  - **Crear:** Nuevos vuelos con todos los detalles requeridos.  
  - **Actualizar:** Modificar horarios o precios.  
  - **Buscar:** Filtrar vuelos por origen, destino y horarios.  

### Gestión de Reservas  
- **Datos de reserva:**  
  - ID, vuelo asociado, pasajero(s), estado, categoría del asiento.  
- **Operaciones:**  
  - **Crear:** Selección de vuelos y categorías de asiento.  
  - **Actualizar:** Cambios en categoría o detalles de la reserva.  
  - **Visualizar:** Consultar reservas activas y pasadas.

### Gestión de Tickets  
- **Generación automática:** Tickets electrónicos tras confirmación y pago.  
- **Estado dinámico:** Cambia según el progreso del vuelo (check-in, abordado, finalizado).  
- **Pase de abordar en PDF:** Generado y enviado al correo del pasajero tras completar el check-in.

### Check-in  
- **Ventana:** Abierto 24 horas antes del vuelo, cierre 1 hora antes.  
- **Validaciones:**  
  - Reserva confirmada y pagada.  
  - Sin cambios pendientes o vuelos cancelados.  
- **Resultado:** Generación del pase de abordar y cambio de estado a "Check-in".

---

## Tecnologías Utilizadas  
- **Lenguaje:** TypeScript  
- **Base de Datos:** MYSQL  
- **Documentación API:** Swagger  
- **Gestión de Dependencias:** `npm install`  
- **Inicio del Sistema:** `npm run dev`  

---

## Instalación  
1. Clona el repositorio:  
   ```bash
   git clone https://github.com/Esmererney/everyoneFlies

2. Accede a la carpeta del proyecto:
   ```bash
   cd everyoneflies
   
3. Instala dependencias:
   ```bash
   npm install

4. Crea una base de datos MYSQL (El sistema utiliza una base de datos **MySQL** alojada en Railway. Asegúrate de configurar las variables de entorno correctamente para conectar la aplicación con la base de datos.)

5. Configura base de datos de desarrollo y producción en archivos "development.json" y "production.json":
```env
DB_HOST=junction.proxy.rlwy.net
DB_PORT=51520
DB_USER=root
DB_PASSWORD=qhRywzTZfelJHbzHgorSDzIZZOFSwFbS
DB_DATABASE=railway
DB_TYPE=mysql
DB_SSL=true

6. Ejecuta las migraciones para inicializar la base de datos:
    ```bash
    npm run migration:run

7. Inicia el sistema:
   ```bash
   npm run dev

8. Accede a Swagger a través de la URL:
   ```bash
   http://localhost:3000/api/docs



