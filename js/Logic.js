/* ============================================================
   MÓDULO: logic.js — Lógica pura de negocio
   SRP: asignación, rotación y reemplazo
   OCP: agregar nuevas reglas sin tocar ui.js ni storage.js
   ============================================================ */

const Logic = (() => {

  /* Mapa de días con color asignado */
  const DIAS = [
    { nombre: 'Lunes',     color: '#5b7fad', clave: 'lunes'     },
    { nombre: 'Martes',    color: '#6b9e72', clave: 'martes'    },
    { nombre: 'Miércoles', color: '#a06b8a', clave: 'miercoles' },
    { nombre: 'Jueves',    color: '#888888', clave: 'jueves'    },
    { nombre: 'Viernes',   color: '#c9a84c', clave: 'viernes'   },
  ];

  /* Devuelve el índice del día actual (0=Lunes…4=Viernes). Fin de semana → -1 */
  const obtenerIndiceDiaHoy = () => {
    const dow = new Date().getDay(); // 0=Dom, 1=Lun…
    if (dow === 0 || dow === 6) return -1;
    return dow - 1;
  };

  /* Genera asignaciones rotando la lista de activos por los 5 días */
  const generarAsignaciones = (integrantes) => {
    const activos = integrantes.filter((p) => p.activo);
    if (activos.length === 0) return {};

    const mapa = {};
    DIAS.forEach((dia, i) => {
      const idx = i % activos.length;
      mapa[dia.clave] = activos[idx].nombre;
    });
    return mapa;
  };

  /* Algoritmo de reemplazo: selecciona aleatoriamente un activo distinto */
  const seleccionarReemplazo = (integrantes, nombreActual) => {
    const candidatos = integrantes.filter(
      (p) => p.activo && p.nombre !== nombreActual
    );
    if (candidatos.length === 0) return null;
    const idx = Math.floor(Math.random() * candidatos.length);
    return candidatos[idx].nombre;
  };

  /* Crea un nuevo integrante con ID único */
  const crearIntegrante = (nombre) => ({
    id:     Date.now().toString(),
    nombre: nombre.trim(),
    activo: true,
  });

  /* Elimina integrante por ID */
  const eliminarIntegrante = (lista, id) =>
    lista.filter((p) => p.id !== id);

  /* Alterna estado activo/inactivo */
  const toggleActivo = (lista, id) =>
    lista.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p));

  return {
    DIAS,
    obtenerIndiceDiaHoy,
    generarAsignaciones,
    seleccionarReemplazo,
    crearIntegrante,
    eliminarIntegrante,
    toggleActivo,
  };

})();

/* ============================================================
   CLEAN CODE — funciones auxiliares de validación
   Nombres descriptivos, funciones pequeñas de un solo propósito
   ============================================================ */

// Verifica si un nombre de integrante es válido
const esNombreValido = (nombre) =>
  typeof nombre === 'string' && nombre.trim().length >= 2;

// Cuenta cuántos integrantes están activos
const contarActivos = (lista) =>
  lista.filter((p) => p.activo).length;