/* ============================================================
   MÓDULO: storage.js — Capa de persistencia (localStorage API)
   SRP: única responsabilidad = leer y escribir en localStorage
   ============================================================ */

const Storage = (() => {

  const KEYS = {
    INTEGRANTES: 'aseo_integrantes',
    ASIGNACIONES: 'aseo_asignaciones',
  };

  const ESTUDIANTES_INICIALES = [
    'Alisson Paola Jaramillo Echeverry',
    'Carlos Andrés Zuluaga Atehortua',
    'Daniela Zapata López',
    'David Antonio Pescador Durán',
    'David Buendia Ruiz',
    'Eric Daniel Barreto Chavez',
    'Jhoan Steven Murillo García',
    'Jhon Alejandro Patiño Agudelo',
    'Juan Camilo Valencia Rey',
    'Juan Carlos Combita Sandoval',
    'Juan David Ferrer Castillo',
    'Juan José Santamaria Muñoz',
    'Julián David Flórez Vera',
    'Maria Fernanda Huertas Montes',
    'Nelson Fabián Gallego Sánchez',
    'Santiago Moreno Piedrahita',
    'Santiago Palacio Tovar',
    'Santiago Tovar Zambrano',
    'Sebastian Ortega Barrero',
    'Stiven Andrés Robles Galán',
    'Valeria Arcila Hernández',
    'Valeria Becerra Giraldo',
  ].map((nombre, i) => ({
    id: (1000 + i).toString(),
    nombre,
    activo: true,
  }));

  const cargarIntegrantes = () => {
    const raw = localStorage.getItem(KEYS.INTEGRANTES);
    if (!raw) return ESTUDIANTES_INICIALES;
    try { return JSON.parse(raw); }
    catch { return ESTUDIANTES_INICIALES; }
  };

  const guardarIntegrantes = (lista) => {
    localStorage.setItem(KEYS.INTEGRANTES, JSON.stringify(lista));
  };

  const cargarAsignaciones = () => {
    const raw = localStorage.getItem(KEYS.ASIGNACIONES);
    if (!raw) return {};
    try { return JSON.parse(raw); }
    catch { return {}; }
  };

  const guardarAsignaciones = (mapa) => {
    localStorage.setItem(KEYS.ASIGNACIONES, JSON.stringify(mapa));
  };

  return { cargarIntegrantes, guardarIntegrantes, cargarAsignaciones, guardarAsignaciones };

})();