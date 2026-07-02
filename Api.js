// ── Configuración de la API ──
const API_BASE_URL = 'http://localhost:5000';

// Wrapper simple sobre fetch. Devuelve directamente el JSON parseado.
// No maneja auth todavía porque los listados que consumimos son públicos
// (GET /api/servicios, /api/clientes, /api/planes no piden token).
async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'Error al consumir la API');
  }
  return json.data;
}

// ── Mapeo: servicio de la API → forma que espera render.js ──
// La API devuelve: servicio_id, nombre_servicio, area, descripcion, estado_servicio
// render.js espera: id, nombre, categoria, descripcion, estado
function mapServicioAPI(s) {
  return {
    id: 'S-' + String(s.servicio_id).padStart(2, '0'),
    nombre: s.nombre_servicio,
    categoria: formatearArea(s.area),
    descripcion: s.descripcion,
    estado: s.estado_servicio === 'activo' ? 'Activo' : 'Inactivo',
  };
}

// "cumplimiento_legal" → "Cumplimiento Legal"
function formatearArea(area) {
  if (!area) return '—';
  return area
    .split('_')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

// ── Carga de Servicios desde la API ──
async function cargarServicios() {
  try {
    const data = await apiGet('/api/servicios');
    SERVICIOS = data.map(mapServicioAPI);
  } catch (err) {
    console.error('No se pudieron cargar los servicios desde la API:', err);
    showToast('No se pudo conectar con la API de servicios', 'error');
    SERVICIOS = [];
  }

  // Si la sección de Servicios ya está visible, la volvemos a pintar
  // con los datos reales.
  renderTablaServicios();
}
