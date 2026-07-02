// ── Navegación ──
const SECTIONS = ['dashboard','solicitudes','clientes','consultores','planes','servicios','whatsapp','reclamos','reportes'];

const TITLES = {
  dashboard:    'Panel de Administrador',
  solicitudes:  'Gestión de Solicitudes',
  clientes:     'Gestión de Clientes',
  consultores:  'Gestión de Consultores',
  planes:       'Planes',
  servicios:    'Catálogo de Servicios',
  whatsapp:     'WhatsApp Business',
  reclamos:     'Reclamos y Quejas',
  reportes:     'Reportes y Métricas'
};

// ── Consultores ──
const CONSULTORES = [
  { init:'MM', color:'#6366f1', nombre:'Martino Mendoza',   esp:'Finanzas',          estado:'Activo'   },
  { init:'CL', color:'#ec4899', nombre:'Carlos López',      esp:'Tecnología',        estado:'Activo'   },
  { init:'MP', color:'#22c55e', nombre:'María Pérez',       esp:'RRHH',              estado:'Activo'   },
  { init:'TM', color:'#f59e0b', nombre:'Ticiano Malvessi',  esp:'Marketing',         estado:'Inactivo' },
  { init:'SB', color:'#3b82f6', nombre:'Solana Bruzera',    esp:'Proyectos Ágiles',  estado:'Activo'   },
  { init:'LP', color:'#ef4444', nombre:'Luciano Panunzio',  esp:'IA / ML',           estado:'Activo'   },
];

// ── Solicitudes ──
const SOLICITUDES = [
  { id:'#1042', cliente:'Martino Mendoza',  servicio:'Finanzas y Contabilidad',     tipo:'Consulta',     prioridad:'Alta',  estado:'nueva',     fecha:'Hoy, 09:14',
    descripcion:'El cliente solicita una revisión de los estados financieros del Q2 e incorporar los últimos ajustes de cierre.',
    tiempoEstimado:'24 hs',
    adjuntos:[{ icon:'bi-file-earmark-pdf-fill text-danger',   nombre:'estados_financieros_q2.pdf'   },
              { icon:'bi-file-earmark-image-fill text-success', nombre:'captura_ajuste_cierre.png'   }] },
  { id:'#1041', cliente:'Ticiano Malvessi', servicio:'Marketing Digital',           tipo:'Modificación', prioridad:'Media', estado:'proceso',   fecha:'Hoy, 08:30',
    descripcion:'El cliente pide modificar el cronograma de publicaciones de la campaña de Marketing Digital del mes en curso.',
    tiempoEstimado:'12 hs',
    adjuntos:[{ icon:'bi-file-earmark-spreadsheet-fill text-success', nombre:'cronograma_campania.xlsx' }] },
  { id:'#1040', cliente:'Solana Bruzera',   servicio:'Gestión de Proyectos Ágiles', tipo:'Upgrade',      prioridad:'Baja',  estado:'realizado', fecha:'Ayer, 15:20',
    descripcion:'Solicitud de upgrade de plan para sumar más tableros y usuarios en la gestión de Proyectos Ágiles.',
    tiempoEstimado:'48 hs',
    adjuntos:[] },
  { id:'#1039', cliente:'Luciano Panunzio', servicio:'IA y Machine Learning',       tipo:'Reclamo',       prioridad:'Alta',  estado:'pendiente', fecha:'Ayer, 11:05',
    descripcion:'El cliente reporta resultados inconsistentes del modelo de IA entregado y solicita una revisión urgente.',
    tiempoEstimado:'6 hs',
    adjuntos:[{ icon:'bi-file-earmark-text-fill text-secondary', nombre:'log_errores_modelo.txt' }] },
  { id:'#1038', cliente:'María Pérez',      servicio:'Recursos Humanos',            tipo:'Consulta',     prioridad:'Media', estado:'nueva',     fecha:'Ayer, 09:00',
    descripcion:'Consulta general sobre el proceso de selección activo y los próximos pasos para el área de RRHH.',
    tiempoEstimado:'24 hs',
    adjuntos:[] },
  { id:'#1037', cliente:'Carlos López',     servicio:'Tecnología e IT',             tipo:'Modificación', prioridad:'Baja',  estado:'proceso',   fecha:'Hace 3 días',
    descripcion:'Solicita modificar permisos de acceso al panel interno de Tecnología e IT para dos usuarios nuevos.',
    tiempoEstimado:'24 hs',
    adjuntos:[] },
];

// ── Clientes ──
const CLIENTES = [
  { id:'C-001', nombre:'Martino Mendoza',  empresa:'FinTech SA',        email:'m.mendoza@fintech.com',   plan:'Premium',     estado:'Activo',   ingreso:'12/01/2025' },
  { id:'C-002', nombre:'Ticiano Malvessi', empresa:'MktGroup',          email:'t.malvessi@mktgroup.com', plan:'Profesional', estado:'Activo',   ingreso:'03/03/2025' },
  { id:'C-003', nombre:'Solana Bruzera',   empresa:'Ágiles Consultora', email:'s.bruzera@agiles.com',    plan:'Básico',      estado:'Activo',   ingreso:'20/04/2025' },
  { id:'C-004', nombre:'Luciano Panunzio', empresa:'IALab',             email:'l.panunzio@ialab.io',     plan:'Premium',     estado:'Inactivo', ingreso:'07/02/2025' },
];

// ── Servicios ──
const SERVICIOS = [
  { id:'S-01', nombre:'Consultoría Financiera', categoria:'Finanzas',   descripcion:'Asesoramiento contable y fiscal',      estado:'Activo'   },
  { id:'S-02', nombre:'Marketing Digital',      categoria:'Marketing',  descripcion:'Estrategia y gestión de canales',      estado:'Activo'   },
  { id:'S-03', nombre:'Gestión de RRHH',        categoria:'RRHH',       descripcion:'Procesos de selección y retención',    estado:'Activo'   },
  { id:'S-04', nombre:'IA y Machine Learning',  categoria:'Tecnología', descripcion:'Implementación de modelos de IA',      estado:'Inactivo' },
  { id:'S-05', nombre:'Proyectos Ágiles',       categoria:'Tecnología', descripcion:'Scrum, Kanban y metodologías ágiles',  estado:'Activo'   },
];

// ── Conversaciones de WhatsApp ──
const WA_CONVERSACIONES = [
  { init:'LA', color:'#6366f1', nombre:'Lucas Aguirre',    preview:'Necesito cambiar la fecha de...', hora:'08:55', online:true,  mensaje:'Necesito cambiar la fecha de la reunión de consultoría del próximo lunes.' },
  { init:'SB', color:'#ec4899', nombre:'Solana Bruzera',   preview:'Adjunté el documento de la...',   hora:'08:55', online:true,  mensaje:'Adjunté el documento de la propuesta actualizada.' },
  { init:'LP', color:'#f59e0b', nombre:'Luciano Panunzio', preview:'Consulta sobre el plan...',       hora:'Ayer',  online:false, mensaje:'Consulta sobre el plan Premium y sus beneficios.' },
  { init:'MP', color:'#22c55e', nombre:'María Pérez',      preview:'¿Podría enviarme el resumen...',  hora:'Lun',   online:false, mensaje:'¿Podría enviarme el resumen del mes?' },
  { init:'TM', color:'#ef4444', nombre:'Ticiano Malvessi', preview:'Hay un error en mi factura...',   hora:'Dom',   online:false, mensaje:'Hay un error en mi factura del mes pasado.' },
];

// ── Reclamos ──
const RECLAMOS = [
  { id:'R-031', cliente:'Solana Bruzera',   categoria:'Técnico',  desc:'Error al subir documentos adjuntos',        tiempo:'2 horas',  estado:'pendiente' },
  { id:'R-030', cliente:'Luciano Panunzio', categoria:'Atención', desc:'No recibí respuesta a mi última consulta',  tiempo:'18 horas', estado:'proceso'   },
  { id:'R-029', cliente:'Ticiano Malvessi', categoria:'Técnico',  desc:'El panel no carga correctamente en mobile', tiempo:'6 horas',  estado:'pendiente' },
];

// ── Reportes: planes contratados por cliente ──
const REPORTES_PLANES = [
  { cliente:'Martino Mendoza',  plan:'Premium',     fecha:'12/01/2025', estado:'Activo',   creditos:'Ilimitados' },
  { cliente:'Ticiano Malvessi', plan:'Profesional', fecha:'03/03/2025', estado:'Activo',   creditos:'9 / 15'     },
  { cliente:'Solana Bruzera',   plan:'Básico',      fecha:'20/04/2025', estado:'Activo',   creditos:'2 / 5'      },
  { cliente:'Luciano Panunzio', plan:'Premium',     fecha:'07/02/2025', estado:'Inactivo', creditos:'Ilimitados' },
];

// ── Notificaciones (offcanvas completo) ──
const NOTIFICACIONES = [
  { color:'var(--accent-blue)',   texto:'Nueva solicitud de <strong>Ticiano Malvessi</strong> – Marketing Digital', tiempo:'Hace 10 min.' },
  { color:'var(--accent-yellow)', texto:'Reclamo sin respuesta – <strong>Solana Bruzera</strong>',                   tiempo:'Hace 2 h.'    },
  { color:'var(--accent-green)',  texto:'Cambio de plan aprobado – enviado a PagoNet correctamente',                 tiempo:'Ayer'         },
  { color:'var(--accent-blue)',   texto:'Validación VeriCheck completada – <strong>Martino Mendoza</strong>',       tiempo:'Ayer'         },
  { color:'var(--accent-green)',  texto:'Métricas enviadas a AnalytixPro correctamente',                            tiempo:'Hace 2 días'  },
];

// ── Notificaciones (widget resumido del dashboard) ──
const NOTIF_DASHBOARD = [
  { color:'var(--accent-blue)',   texto:'Nueva solicitud de <strong>Ticiano Malvessi</strong>',              tiempo:'Hace 10 min.' },
  { color:'var(--accent-yellow)', texto:'Reclamo sin respuesta – <strong>Solana Bruzera</strong>',           tiempo:'Hace 2 h.'    },
  { color:'var(--accent-green)',  texto:'Cambio de plan aprobado – enviado a PagoNet',                       tiempo:'Ayer'         },
  { color:'var(--accent-blue)',   texto:'Validación VeriCheck completada – <strong>Martino Mend.</strong>',  tiempo:'Ayer'         },
];

// ── Solicitudes recientes (top del dashboard) ──
// Se generan a partir de SOLICITUDES, tomando los primeros 4 registros.
const SOLICITUDES_RECIENTES = SOLICITUDES.slice(0, 4);

// ── Gestión operativa (panel lateral del dashboard) ──
const OPERATIVA = [
  { init:'LA', color:'#6366f1', nombre:'Lucas Aguirre',    preview:'Necesito cambiar la fecha de...', servicio:'Cambio de fecha de consultoría',        tipo:'Consulta',     estado:'proceso',   prioridad:'Alta', fecha:'Hoy',
    descripcion:'El cliente necesita reprogramar la reunión de consultoría del próximo lunes por un conflicto de agenda.',
    tiempoEstimado:'4 hs',
    adjuntos:[] },
  { init:'SB', color:'#ec4899', nombre:'Solana Bruzera',   preview:'Adjunté el documento de la...',   servicio:'Documentación de contrato actualizada', tipo:'Modificación', estado:'realizado', prioridad:'Baja', fecha:'Ayer',
    descripcion:'Envió la versión actualizada de la propuesta de contrato para su revisión y aprobación final.',
    tiempoEstimado:'48 hs',
    adjuntos:[{ icon:'bi-file-earmark-pdf-fill text-danger', nombre:'propuesta_contrato_v2.pdf' }] },
  { init:'LP', color:'#f59e0b', nombre:'Luciano Panunzio', preview:'Consulta sobre el plan de la...', servicio:'Consulta sobre plan Premium',           tipo:'Consulta',     estado:'pendiente', prioridad:'Alta', fecha:'Ayer',
    descripcion:'Quiere conocer los beneficios adicionales del plan Premium antes de decidir si hace el upgrade.',
    tiempoEstimado:'24 hs',
    adjuntos:[] },
];

// ── Colores de avatar por iniciales (fallback genérico para openSolicitud) ──
const AVATAR_COLORS = {
  'MM':'#6366f1','CL':'#ec4899','MP':'#22c55e','TM':'#f59e0b',
  'SB':'#3b82f6','LP':'#ef4444','LA':'#6366f1'
};

// ── Índice combinado de "solicitudes abribles" (Solicitudes + Operativa) ──
// Cada item lleva un _key único para poder ser referenciado desde onclick="openSolicitud('_key')"
SOLICITUDES.forEach(s => s._key = 'sol-' + s.id.replace('#', ''));
OPERATIVA.forEach((o, i) => o._key = 'op-' + i);

const SOLICITUDES_INDEX = {};
[...SOLICITUDES, ...OPERATIVA].forEach(item => { SOLICITUDES_INDEX[item._key] = item; });

// ── Mapas de estado reutilizados por las distintas tablas/badges ──
const ESTADO_SOLICITUD_MAP = {
  nueva:     { cls:'badge-nueva',     label:'Nueva'      },
  proceso:   { cls:'badge-proceso',   label:'En proceso' },
  realizado: { cls:'badge-realizado', label:'Realizado'  },
  pendiente: { cls:'badge-pendiente', label:'Pendiente'  },
};