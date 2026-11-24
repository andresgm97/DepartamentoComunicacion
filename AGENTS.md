# AGENTS.md — Instrucciones para Claude Code / Codex

> **Actualización aprobada — 24/11/2026:** la prueba muestra todos los objetos durante 5 segundos, después muestra durante 3 segundos la imagen sin el sello y solo entonces presenta la pregunta y las cuatro respuestas. Sustituye la duración anterior de 8 segundos.

## Cambios autorizados por el usuario — 24/11/2026

Esta actualización prevalece sobre las restricciones originales de este documento y de SPEC/ROADMAP: se permite cambiar de identidad desde la interfaz, manteniendo los nueve personajes. Se conserva la selección en localStorage, sin bloqueo irreversible. Al confirmar otro personaje se descartan las respuestas del anterior. Se elimina el control «Sin esperas» y toda la franja superior de vista previa. El chat mantiene los mensajes ya mostrados y solo presenta progresivamente la nueva réplica; nunca vuelve a desarrollar el historial al elegir una respuesta. Se mantiene el respeto a `prefers-reduced-motion`. El resto del guion y alcance no cambia.

## Propósito

Implementar una invitación interactiva para la fiesta de la Residencia Estela. Leer **`SPEC.md` completo antes de escribir código**. `SPEC.md` es la fuente de verdad funcional y narrativa. Seguir `ROADMAP.md` para el orden de ejecución.

## Límites de contenido

- Respetar los **diálogos aprobados**. No sustituir las bromas por redacción genérica ni añadir conversaciones nuevas sin pedir aprobación.
- El producto es **Departamento de Comunicación de la Residencia Estela**, no «mayordomo telefónico». No introducir llamadas ni audios.
- Mantener la voz en plural institucional, con humor burocrático.
- No mencionar el asesinato, su solución, los objetos o lugares secretos del Cluedo, ni hacer spoilers.
- Incluir exactamente **nueve** personajes seleccionables: **Estela (Doña Estela Enigma)**, José, Clara, Noelia, Miriam, Óscar, Ana, Paula y Jimmy. Estela tiene pregunta y dos rutas de respuesta propias como los demás. No eliminar ni ocultar personajes por cuenta propia.
- No inventar hora, dirección, enlace a mapas ni instrucciones de acceso.

## Arquitectura y desarrollo

- React + TypeScript + Vite; componentes separados del contenido.
- Datos narrativos centralizados y tipados: cada elección tiene un identificador estable y sus ramas de respuesta.
- Identidad confirmada y persistida con localStorage: inmutable desde la UI. Explícitamente explicar el límite de seguridad de esta técnica en el README.
- Retroceso/reselección de opciones: obligatorio en **todas** las escenas sin posibilidad de cambiar personaje; al elegir otra opción, reconstruir el camino desde esa elección y eliminar las respuestas descendientes de la rama anterior.
- Mantener `invitationUnlocked` independiente de las elecciones para permitir explorar rutas alternativas tras completar.
- Transiciones fluidas pero breves; acceso por teclado y `prefers-reduced-motion`.
- Modo demostración con placeholders para hora y dirección sin fingir que están confirmadas.
- Preparar `base: '/DepartamentoComunicacion/'` para GitHub Pages y workflow GitHub Actions cuando proceda. No activar despliegue en producción antes de revisar los datos reales.
- No dependencias de IA ni backend ni analítica. No almacenar datos sensibles.

## Forma de trabajar

1. Examinar archivos existentes y no sobrescribir nada creado previamente sin leerlo.
2. Implementar en fases pequeñas conforme a `ROADMAP.md`.
3. Tras cada fase, arrancar la app y verificar navegación, estado y presentación; si se dispone de navegador automatizado, probar también en viewport móvil.
4. Ejecutar pruebas y `npm run build` antes de dar una fase por finalizada.
5. Explicar brevemente lo construido, lo pendiente y cualquier divergencia respecto a SPEC.
6. Si una elección de implementación altera el guion, flujo, bloqueo de identidad o exposición de la ubicación, **consultar antes de proceder**.
7. Priorizar la experiencia móvil y la facilidad de actualización de los datos de la fiesta.

## Criterios de calidad

- No son aceptables botones decorativos sin funcionalidad.
- No son aceptables mensajes obsoletos al cambiar una respuesta.
- No es aceptable que el navegador Atrás o recargar el sitio permitan cambiar identidad desde la interfaz.
- No son aceptables datos de ubicación inventados ni afirmar privacidad/seguridad que no existe en sitio estático.
- No omitir personajes ni alternativas.
