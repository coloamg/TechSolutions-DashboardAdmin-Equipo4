document.addEventListener('DOMContentLoaded', () => {

  // Notificaciones del offcanvas (siempre disponibles, sin importar la sección activa)
  renderOffcanvasNotif();

  // Renderiza el dashboard desde data.js (fuente única de verdad).
  // Esto evita inconsistencias entre el HTML precargado y los datos reales.
  renderDashboard();

  // Muestra la sección inicial
  showSection('dashboard');

  // Trae los servicios reales desde la API (async, no bloquea el resto del render)
  cargarServicios();
  cargarClientes();

});