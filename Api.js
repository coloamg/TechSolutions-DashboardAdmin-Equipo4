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

// ── Cache de planes (para resolver plan_id → nombre_plan) ──
let _planesCache = null;
 
async function getPlanesMap() {
  if (_planesCache) return _planesCache;
  try {
    const data = await apiGet('/api/planes');
    _planesCache = {};
    data.forEach(p => { _planesCache[p.plan_id] = p.nombre_plan; });
  } catch (err) {
    console.error('No se pudieron cargar los planes:', err);
    _planesCache = {};
  }
  return _planesCache;
}

// "Sun, 28 Jun 2026 00:00:00 GMT" → "28/06/2026"
function formatearFecha(fechaStr) {
  if (!fechaStr) return '—';
  const d = new Date(fechaStr);
  if (isNaN(d)) return '—';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
// Arma el nombre completo ignorando los campos que vienen como "-"
function nombreCompleto(c) {
  const partes = [c.primer_nombre, c.segundo_nombre, c.apellido, c.segundo_apellido]
    .filter(p => p && p !== '-');
  return partes.join(' ');
}

// ── Mapeo: cliente de la API → forma que espera render.js ──
// render.js espera: id, nombre, empresa, email, plan, estado, ingreso
function mapClienteAPI(c, planesMap) {
  return {
    id: 'C-' + String(c.cliente_id).padStart(3, '0'),
    nombre: nombreCompleto(c),
    empresa: '—', // la API no tiene este dato
    email: c.email,
    plan: planesMap[c.plan_id] || '—',
    estado: c.estado === 'activo' ? 'Activo' : 'Inactivo',
    ingreso: formatearFecha(c.fecha_alta),
  };
}

// ── Carga de Clientes desde la API ──
async function cargarClientes() {
  try {
    const planesMap = await getPlanesMap();
    const data = await apiGet('/api/clientes');
    CLIENTES = data.map(c => mapClienteAPI(c, planesMap));
  } catch (err) {
    console.error('No se pudieron cargar los clientes desde la API:', err);
    showToast('No se pudo conectar con la API de clientes', 'error');
    CLIENTES = [];
  }
 
  renderTablaClientes();
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
