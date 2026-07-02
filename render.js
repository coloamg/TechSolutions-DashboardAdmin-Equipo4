// Helper: badge de estado de solicitud/reclamo
function badgeEstado(estado) {
  const map = ESTADO_SOLICITUD_MAP[estado] || ESTADO_SOLICITUD_MAP.nueva;
  return `<span class="status-badge ${map.cls}">${map.label}</span>`;
}

// Helper: iniciales a partir de un nombre completo
function initsFromNombre(nombre) {
  const parts = nombre.trim().split(' ');
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

// ── Dashboard: Solicitudes recientes ──
function renderSolicitudesRecientes() {
  const cont = document.getElementById('solicitudes-recientes');
  if (!cont) return;
  cont.innerHTML = SOLICITUDES_RECIENTES.map(s => `
    <div class="solicitud-row" onclick="openSolicitud('${s._key}')">
      <div class="sol-info">
        <div class="sol-name">${s.cliente}</div>
        <div class="sol-service">${s.servicio}</div>
        <div class="sol-date">${s.fecha}</div>
      </div>
      ${badgeEstado(s.estado)}
    </div>
  `).join('');
}

// ── Dashboard: Gestión operativa ──
function renderOperativa() {
  const cont = document.getElementById('operativa-list');
  if (!cont) return;
  cont.innerHTML = OPERATIVA.map(o => `
    <div class="operativa-row" onclick="openSolicitud('${o._key}')">
      <div class="operativa-avatar" style="background:${o.color}">${o.init}</div>
      <div class="operativa-info">
        <div class="op-name">${o.nombre}</div>
        <div class="op-preview">${o.preview}</div>
      </div>
      <button class="btn-ver" onclick="event.stopPropagation(); openSolicitud('${o._key}')">Ver</button>
    </div>
  `).join('');
}

// ── Dashboard: Notificaciones (widget resumido) ──
function renderNotifDashboard() {
  const cont = document.getElementById('notif-dashboard');
  if (!cont) return;
  cont.innerHTML = NOTIF_DASHBOARD.map(n => `
    <div class="notif-row">
      <div class="notif-dot-icon" style="background:${n.color}"></div>
      <div>
        <div class="notif-text">${n.texto}</div>
        <div class="notif-time">${n.tiempo}</div>
      </div>
    </div>
  `).join('');
}

// ── Dashboard: WhatsApp widget ──
function renderWADashboard() {
  const cont = document.getElementById('wa-dashboard-list');
  if (!cont) return;
  const top3 = WA_CONVERSACIONES.slice(0, 3);
  cont.innerHTML = top3.map(c => `
    <div class="wa-row" onclick="showSection('whatsapp')">
      <div class="wa-avatar" style="background:${c.color}">${c.init}</div>
      <div class="wa-info">
        <div class="wa-name">${c.nombre}</div>
        <div class="wa-preview">${c.preview}</div>
      </div>
      <div class="wa-meta">
        <div class="wa-time">${c.hora}</div>
        ${c.online ? '<div class="wa-online"></div>' : ''}
      </div>
    </div>
  `).join('');
}

// ── Offcanvas de notificaciones (panel campana, siempre disponible) ──
function renderOffcanvasNotif() {
  const cont = document.getElementById('notif-offcanvas-list');
  if (!cont) return;
  cont.innerHTML = NOTIFICACIONES.map(n => `
    <div class="notif-row">
      <div class="notif-dot-icon" style="background:${n.color}"></div>
      <div>
        <div class="notif-text">${n.texto}</div>
        <div class="notif-time">${n.tiempo}</div>
      </div>
    </div>
  `).join('');
}

// ── Consultores: grid de tarjetas ──
function renderConsultores() {
  const cont = document.getElementById('consultores-grid');
  if (!cont) return;
  cont.innerHTML = CONSULTORES.map(c => `
    <div class="col-md-6 col-lg-4">
      <div class="section-card p-3 h-100">
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="operativa-avatar" style="background:${c.color}">${c.init}</div>
          <div>
            <div class="fw-bold" style="font-size:13.5px">${c.nombre}</div>
            <div class="text-secondary" style="font-size:12px">${c.esp}</div>
          </div>
          <span class="status-badge ms-auto ${c.estado === 'Activo' ? 'badge-realizado' : 'badge-proceso'}">${c.estado}</span>
        </div>
        <div class="d-flex gap-2 mt-2">
          <button class="btn-ver flex-fill">Editar</button>
          <button class="btn-ver flex-fill">Ver solicitudes</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Tabla de Solicitudes (sección completa) ──
function renderTablaSolicitudes() {
  const tbody = document.getElementById('solicitudes-tbody');
  if (!tbody) return;
  tbody.innerHTML = SOLICITUDES.map(s => `
    <tr style="cursor:pointer" onclick="openSolicitud('${s._key}')">
      <td class="ps-3 fw-semibold">${s.id}</td>
      <td>${s.cliente}</td>
      <td>${s.servicio}</td>
      <td>${s.tipo}</td>
      <td>${s.prioridad}</td>
      <td>${badgeEstado(s.estado)}</td>
      <td class="text-secondary">${s.fecha}</td>
      <td>
        <button class="btn-ver" onclick="event.stopPropagation(); openSolicitud('${s._key}')">Ver</button>
      </td>
    </tr>
  `).join('');
}

// ── Tabla de Clientes ──
function renderTablaClientes() {
  const tbody = document.getElementById('clientes-tbody');
  if (!tbody) return;
  tbody.innerHTML = CLIENTES.map(c => `
    <tr>
      <td class="ps-3 fw-semibold">${c.id}</td>
      <td>${c.nombre}</td>
      <td>${c.empresa}</td>
      <td class="text-secondary">${c.email}</td>
      <td>${c.plan}</td>
      <td><span class="status-badge ${c.estado === 'Activo' ? 'badge-realizado' : 'badge-proceso'}">${c.estado}</span></td>
      <td class="text-secondary">${c.ingreso}</td>
      <td><button class="btn-ver">Ver</button></td>
    </tr>
  `).join('');
}

// ── Tabla de Servicios ──
function renderTablaServicios() {
  const tbody = document.getElementById('servicios-tbody');
  if (!tbody) return;
  tbody.innerHTML = SERVICIOS.map(s => `
    <tr>
      <td class="ps-3 fw-semibold">${s.id}</td>
      <td>${s.nombre}</td>
      <td>${s.categoria}</td>
      <td class="text-secondary">${s.descripcion}</td>
      <td><span class="status-badge ${s.estado === 'Activo' ? 'badge-realizado' : 'badge-proceso'}">${s.estado}</span></td>
      <td><button class="btn-ver">Editar</button></td>
    </tr>
  `).join('');
}

// ── Panel WhatsApp: lista de conversaciones ──
function renderWAConversaciones() {
  const cont = document.getElementById('wa-conversaciones');
  if (!cont) return;
  cont.innerHTML = WA_CONVERSACIONES.map((c, i) => `
    <div class="wa-row${i === 0 ? ' active-conv' : ''}" onclick="selectConv(this, '${c.nombre}', '${c.init}', '${c.color}', '${c.mensaje.replace(/'/g, "\\'")}')">
      <div class="wa-avatar" style="background:${c.color}">${c.init}</div>
      <div class="wa-info">
        <div class="wa-name">${c.nombre}</div>
        <div class="wa-preview">${c.preview}</div>
      </div>
      <div class="wa-meta">
        <div class="wa-time">${c.hora}</div>
        ${c.online ? '<div class="wa-online"></div>' : ''}
      </div>
    </div>
  `).join('');
}

// ── Tabla de Reclamos ──
function renderTablaReclamos() {
  const tbody = document.getElementById('reclamos-tbody');
  if (!tbody) return;
  const map = { pendiente:'badge-pendiente', proceso:'badge-proceso', realizado:'badge-realizado' };
  const label = { pendiente:'Pendiente', proceso:'En proceso', realizado:'Realizado' };
  tbody.innerHTML = RECLAMOS.map(r => `
    <tr>
      <td class="ps-3 fw-semibold">${r.id}</td>
      <td>${r.cliente}</td>
      <td>${r.categoria}</td>
      <td class="text-secondary">${r.desc}</td>
      <td class="text-secondary">${r.tiempo}</td>
      <td><span class="status-badge ${map[r.estado]}">${label[r.estado]}</span></td>
      <td><button class="btn-ver">Atender</button></td>
    </tr>
  `).join('');
}

// ── Tabla de Reportes: planes contratados ──
function renderTablaReportes() {
  const tbody = document.getElementById('reportes-tbody');
  if (!tbody) return;
  tbody.innerHTML = REPORTES_PLANES.map(r => `
    <tr>
      <td class="ps-3 fw-semibold">${r.cliente}</td>
      <td>${r.plan}</td>
      <td class="text-secondary">${r.fecha}</td>
      <td><span class="status-badge ${r.estado === 'Activo' ? 'badge-realizado' : 'badge-proceso'}">${r.estado}</span></td>
      <td>${r.creditos}</td>
    </tr>
  `).join('');
}