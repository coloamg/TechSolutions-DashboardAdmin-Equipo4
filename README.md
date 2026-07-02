TECH SOLUTIONS – Panel de Administrador
========================================
 
Frontend estático del sistema de gestión de servicios de consultoría.
Construido con HTML, CSS, JavaScript vanilla y Bootstrap 5.
No requiere instalación ni dependencias: alcanza con abrir index.html en el navegador.
 
ARCHIVOS DEL PROYECTO
----------------------
 
index.html   Estructura completa del panel: sidebar de navegación, las nueve secciones
             de contenido, modales, paneles laterales (offcanvas) y mensajes de feedback.
 
Style.css    Todos los estilos visuales: colores, tipografía, layout del sidebar,
             tarjetas, badges de estado, panel de WhatsApp y notificaciones.
 
Data.js      Fuente única de datos del prototipo. Contiene los arrays con toda la
             información que se muestra: solicitudes, clientes, consultores, servicios,
             conversaciones de WhatsApp, reclamos, reportes y notificaciones.
 
render.js    Funciones que leen los datos de Data.js y generan el HTML de cada sección
             dinámicamente. Hay una función por tabla o widget del panel.
 
UI.js        Lógica de interacción: navegación entre secciones, apertura del panel de
             detalle de solicitudes, cambio de estado, filtro de búsqueda en tiempo real
             y envío de mensajes en el chat de WhatsApp.
 
Events.js    Registra los eventos de la interfaz una vez que la página termina de cargar
             (clicks en botones, tecla Enter en el chat, input del buscador, etc.).
 
App.js       Punto de entrada de la aplicación. Inicializa el dashboard al abrir la página.
 
 
SECCIONES DEL PANEL
--------------------
 
Dashboard
  Vista principal con seis métricas en tiempo real: clientes activos, solicitudes nuevas,
  solicitudes en proceso, resueltas hoy, reclamos abiertos y mensajes de WhatsApp.
  Debajo se muestran las solicitudes recientes (clickeables), un panel de gestión operativa
  con buscador, las últimas notificaciones, accesos rápidos a reportes y un widget
  de WhatsApp con las conversaciones más recientes.
 
Solicitudes
  Tabla completa con todas las solicitudes del sistema. Muestra ID, cliente, servicio,
  tipo, prioridad, estado y fecha. Al hacer click en cualquier fila se abre un panel
  lateral con el detalle completo: descripción, archivos adjuntos descargables, selector
  para cambiar el estado (Pendiente → En Proceso → Realizado) y botón de validación
  de identidad mediante VeriCheck.
 
Clientes
  Tabla de clientes registrados con nombre, empresa, email, plan contratado, estado
  e ingreso al sistema. Incluye un botón "Nuevo cliente" que abre un formulario
  con campos de nombre, DNI, email, teléfono, empresa y plan.
 
Consultores
  Grid de tarjetas, una por consultor. Cada tarjeta muestra el avatar con iniciales
  coloreadas, el nombre completo, la especialidad y el estado (Activo / Inactivo).
 
Planes
  Tres tarjetas visuales con los planes disponibles: Básico ($99), Profesional ($249)
  y Premium ($499). Cada una detalla los beneficios incluidos y los no disponibles.
  El plan Premium tiene diseño diferenciado.
 
Servicios
  Tabla del catálogo de servicios de consultoría con nombre, categoría, descripción
  y estado de cada servicio.
 
WhatsApp
  Panel dividido en dos columnas. A la izquierda la lista de conversaciones activas
  con indicador de conexión y vista previa del último mensaje. A la derecha el chat
  seleccionado con historial de mensajes, input para responder (enviable con Enter)
  y selector para asignar la conversación a un consultor.
 
Reclamos
  Tres métricas por categoría (Técnico, Atención al cliente, Servicio) y una tabla
  con el detalle de cada reclamo: ID, cliente, categoría, descripción, tiempo de
  respuesta y estado.
 
Reportes
  Filtros para generar reportes por tipo, rango de fechas y plan. Visualizaciones
  de métricas: distribución de solicitudes por estado, clientes por plan y tiempo
  promedio de resolución. Tabla de planes contratados por cliente con opción de descarga.
