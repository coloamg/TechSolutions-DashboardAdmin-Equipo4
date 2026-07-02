document.addEventListener('DOMContentLoaded', () => {

  // Sidebar
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
  });

  // Whatsapp imput
  const waInput = document.getElementById('wa-input');
  if (waInput) {
    waInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendWAMessage();
    });
  }

  // Filtro de busqueda
  const opSearch = document.getElementById('op-search');
  if (opSearch) {
    opSearch.addEventListener('input', e => filterOperativa(e.target.value));
  }

  // Boton nuevo cliente
  const btnCrearCliente = document.getElementById('btn-crear-cliente');
  if (btnCrearCliente) {
    btnCrearCliente.addEventListener('click', () => {
      showToast('Cliente creado correctamente', 'success');
      bootstrap.Modal.getInstance(document.getElementById('modalNuevoCliente')).hide();
    });
  }

  // Boton generar
  const btnGenerarReporte = document.getElementById('btn-generar-reporte');
  if (btnGenerarReporte) {
    btnGenerarReporte.addEventListener('click', () => {
      showToast('Reporte generado correctamente', 'success');
    });
  }

  // Boton descargar
  const btnDescargarReporte = document.getElementById('btn-descargar-reporte');
  if (btnDescargarReporte) {
    btnDescargarReporte.addEventListener('click', () => {
      showToast('Descargando reporte...', 'info');
    });
  }

  // Boton nueva solicitud
  const btnNuevaSolicitud = document.getElementById('btn-nueva-solicitud');
  if (btnNuevaSolicitud) {
    btnNuevaSolicitud.addEventListener('click', () => {
      showToast('Funcionalidad disponible en la versión completa', 'info');
    });
  }

});