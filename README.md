# Departamento de Comunicación · Residencia Estela

Aplicación local: portada, chat con los nueve personajes e invitación final. React + TypeScript + Vite. Sin publicación, backend, IA, analítica ni recursos externos.

## Ejecutar

Con Node.js 22.12+ o 24 y npm, desde esta carpeta:

    npm ci
    npm run dev

Abrir http://127.0.0.1:5173/DepartamentoComunicacion/. Si Vite anuncia otro puerto, usar ese puerto manteniendo la subruta.

    npm test
    npm run build
    npm run preview

Build comprueba TypeScript y genera dist/. Preview sirve ese resultado, normalmente en http://127.0.0.1:4173/DepartamentoComunicacion/. No abrir dist/index.html con doble clic: requiere servidor HTTP. La base está preparada para GitHub Pages. El workflow .github/workflows/deploy.yml instala dependencias, ejecuta pruebas, compila y publica únicamente al lanzarlo manualmente desde Actions. No se ha ejecutado ningún despliegue remoto. Los pasos están en PUBLICAR.txt.

## Cambios solicitados el 24/11/2026

- Los mensajes ya vistos permanecen visibles. Una elección añade el mensaje del invitado y su nueva réplica; no vuelve a reproducir toda la conversación.
- Atrás permite explorar otra respuesta sin mezclar las ramas. Los mensajes ya leídos no se reproducen de nuevo.
- «Cambiar identidad» vuelve a los nueve personajes. Confirmar otro personaje elimina el diálogo personalizado anterior y guarda la nueva identidad.
- Se han eliminado «Sin esperas» y toda la franja superior de vista previa. Las pausas son breves y se respeta automáticamente prefers-reduced-motion.
- Las sesiones existentes se conservan, pero su identidad ya puede cambiarse.

Estos cambios autorizados prevalecen sobre el bloqueo original del kit; están anotados en SPEC.md, AGENTS.md y ROADMAP.md. El guion aprobado se conserva literalmente.

## Alcance

Incluye las fases 0–4: portada, identificación, los nueve diálogos personalizados, protocolo, prueba de observación, autorización e invitación final. Se conservan los cambios autorizados de identidad y tiempos. No se ha publicado nada.

## Estructura

- src/content/dialogue.ts: guion y alternativas con identificadores estables.
- src/state/session.ts: transiciones y persistencia versionada.
- src/state/transcript.ts: historial determinista e identificación de mensajes ya vistos.
- src/components/: portada, escudo y presentación progresiva del chat.
- src/config/event.ts: fecha aprobada y datos de acceso pendientes.

## Persistencia

residencia-estela:v1:session guarda la selección y el estado; residencia-estela:v1:identity permite recuperar la identidad si se corrompe el resto. Ambas admiten actualización. La sesión válida tiene prioridad sobre la clave auxiliar. Sin almacenamiento disponible se puede continuar, con aviso de que los cambios podrían perderse al recargar.

localStorage no es una medida de seguridad. Cambiar de navegador, origen o dispositivo crea una sesión independiente. La expresión «correspondencia privada» forma parte de la ambientación y no promete confidencialidad técnica. Una dirección incluida en archivos estáticos sería inspeccionable. Hora confirmada: A partir de 21:30. Indicaciones: Se recomienda transporte compartido. Se ha eliminado el campo Dirección por petición del usuario. Sin enlace de mapas. invitationUnlocked permanece independiente de las decisiones; el desbloqueo se conserva tras la autorización, al retroceder y al cambiar de identidad. La tarjeta utiliza el personaje actualmente confirmado y los datos de configuración.

## Verificación

82 pruebas automatizadas: nueve personajes, fidelidad del guion, ramas alternativas, conservación del historial visible, cambio de identidad, recarga y recuperación del estado. TypeScript y build de producción correctos. Revisión en navegador de la nueva réplica sin repetir mensajes, la sustitución de ramas y el cambio de identidad. No se ha probado en dispositivos físicos iOS/Android.

## Prueba de observación

Cinco segundos con los cinco objetos; tres segundos con la imagen sin el sello; después aparecen la pregunta y sus cuatro opciones. Reintentos ilimitados. Una recarga durante cualquiera de los dos intervalos vuelve al comienzo de la prueba. El retroceso limpia las ramas dependientes sin revocar una autorización ya concedida. Revisado en móvil el fallo, reintento, acierto y las dos respuestas administrativas.

## Invitación y datos del evento

Al finalizar, «Consultar invitación oficial» abre la tarjeta personalizada. «Ver mi invitación» queda disponible en la cabecera después de obtener autorización, incluso al explorar rutas alternativas. «Volver al chat» o Escape cierra la tarjeta sin cambiar el punto de la conversación. Se conserva el acceso al recargar.

Los datos confirmados están en src/config/event.ts: eventTime y accessInstructions. El campo addressText se ha eliminado. mapsUrl sigue sin configurar. La fecha aprobada es el 27 de noviembre de 2026. El enlace «Consultar ubicación» solo aparece con una URL HTTPS configurada. Con datos incompletos, la tarjeta muestra los campos pendientes y el aviso «Datos de acceso pendientes de configurar». No hay franja superior de demo ni control de esperas.

Revisados en el navegador la tarjeta a 320 y 390 px, apertura tras finalizar y desde otra rama, cierre con Escape, persistencia al recargar y ausencia de enlace de ubicación sin configurar. Pendientes revisión del usuario, pruebas en dispositivos físicos y autorización de publicación.
