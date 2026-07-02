// ── Navegacion entre secciones ──
function showSection(name) {
  SECTIONS.forEach(s => {
    const el = document.getElementById('sec-' + s);
    if (el) el.style.display = s === name ? '' : 'none';
  });

  document.getElementById('topbar-title').textContent = TITLES[name] || name;

  document.querySelectorAll('.sidebar-nav .nav-link').forEach(a => {
    const onclick = a.getAttribute('onclick') || '';
    a.classList.toggle('active', onclick.includes("'" + name + "'"));
  });

  // Renderizado bajo demanda al activar cada sección.
  // El dashboard ya se renderiza una vez al cargar la app (ver app.js),
  // pero se vuelve a refrescar cada vez que el usuario vuelve a él
  // para reflejar cualquier cambio (ej. estado de una solicitud).
  if (name === 'dashboard')   renderDashboard();
  if (name === 'consultores') renderConsultores();
  if (name === 'solicitudes') renderTablaSolicitudes();
  if (name === 'clientes')    renderTablaClientes();
  if (name === 'servicios')   renderTablaServicios();
  if (name === 'whatsapp')    renderWAConversaciones();
  if (name === 'reclamos')    renderTablaReclamos();
  if (name === 'reportes')    renderTablaReportes();
}

// ── Renderizado dashboard ──
function renderDashboard() {
  renderSolicitudesRecientes();
  renderOperativa();
  renderNotifDashboard();
  renderWADashboard();
}

// ── Detalle de solicitud off canvas ──
function openSolicitud(key) {
  const sol = SOLICITUDES_INDEX[key];
  if (!sol) return;

  const init  = initsFromNombre(sol.cliente || sol.nombre);
  const color = AVATAR_COLORS[init] || '#6366f1';

  document.getElementById('sol-avatar').textContent   = init;
  document.getElementById('sol-avatar').style.background = color;
  document.getElementById('sol-name').textContent     = sol.cliente || sol.nombre;
  document.getElementById('sol-service').textContent  = sol.servicio;
  document.getElementById('sol-prioridad').textContent = sol.prioridad;
  document.getElementById('sol-fecha').textContent    = sol.fecha;
  document.getElementById('sol-tipo').textContent     = sol.tipo || '—';
  document.getElementById('sol-tiempo-estimado').textContent = sol.tiempoEstimado || '—';
  document.getElementById('sol-descripcion').textContent = sol.descripcion || 'Sin descripción disponible.';

  const badge = document.getElementById('sol-badge');
  const badgeMap = {
    nueva:     'badge-nueva Nueva',
    proceso:   'badge-proceso En proceso',
    realizado: 'badge-realizado Realizado',
    pendiente: 'badge-pendiente Pendiente'
  };
  const [cls, ...txtParts] = (badgeMap[sol.estado] || 'badge-nueva Nueva').split(' ');
  badge.className   = 'status-badge ms-auto ' + cls;
  badge.textContent = txtParts.join(' ');

  // Adjuntos: se ocultan si la solicitud no tiene ninguno
  const adjuntos = sol.adjuntos || [];
  const adjuntosTitle = document.getElementById('sol-adjuntos-title');
  const adjuntosList  = document.getElementById('sol-adjuntos-list');
  if (adjuntos.length === 0) {
    adjuntosTitle.style.display = 'none';
    adjuntosList.innerHTML = '';
  } else {
    adjuntosTitle.style.display = '';
    adjuntosList.innerHTML = adjuntos.map(a => `
      <div style="background:var(--bg-main);border-radius:8px;padding:10px 14px;font-size:12.5px;display:flex;align-items:center;gap:8px">
        <i class="bi ${a.icon}"></i>
        ${a.nombre}
        <i class="bi bi-download ms-auto" style="cursor:pointer;color:var(--text-secondary)"></i>
      </div>
    `).join('');
  }

  new bootstrap.Offcanvas(document.getElementById('offcanvasSolicitud')).show();
}

// ── Actualizar estado solicitud ──
function actualizarEstado() {
  const val = document.getElementById('sol-estado-select').value;
  showToast('Estado actualizado a "' + val + '". Notificación enviada al cliente.', 'success');
  bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasSolicitud')).hide();
}

// ── Filtro de gestion operativa ──
function filterOperativa(q) {
  document.querySelectorAll('#operativa-list .operativa-row').forEach(row => {
    const name = row.querySelector('.op-name').textContent.toLowerCase();
    row.style.display = name.includes(q.toLowerCase()) ? '' : 'none';
  });
}

// ── Whataspp seleccionar conversacion ──
function selectConv(el, nombre, init, color, mensaje) {
  document.querySelectorAll('.wa-row').forEach(r => r.classList.remove('active-conv'));
  el.classList.add('active-conv');

  document.getElementById('chat-avatar').textContent         = init;
  document.getElementById('chat-avatar').style.background   = color;
  document.getElementById('chat-name').textContent          = nombre;
  document.getElementById('chat-bubble').textContent        = mensaje;
}

// ── Whatsapp enviar mensaje ──
function sendWAMessage() {
  const input = document.getElementById('wa-input');
  const msg   = input.value.trim();
  if (!msg) return;

  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'd-flex gap-2 justify-content-end';
  div.innerHTML = `
    <div>
      <div style="background:var(--accent-blue);color:#fff;padding:8px 12px;border-radius:10px 0 10px 10px;font-size:13px;max-width:340px">${msg}</div>
      <div class="small text-secondary mt-1 text-end">${new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})} ✓</div>
    </div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  input.value = '';
  showToast('Mensaje enviado', 'success');
}

// ── Toast ──
function showToast(msg, type = 'info') {
  const toast  = document.getElementById('mainToast');
  const colors = { success:'bg-success', info:'bg-primary', error:'bg-danger', warning:'bg-warning' };
  toast.className = 'toast align-items-center border-0 text-white ' + (colors[type] || 'bg-primary');
  document.getElementById('toast-msg').textContent = msg;
  new bootstrap.Toast(toast, { delay: 3000 }).show();
}