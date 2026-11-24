# ROADMAP.md — DepartamentoComunicacion

> **Actualización aprobada — 24/11/2026:** la prueba muestra todos los objetos durante 5 segundos, después muestra durante 3 segundos la imagen sin el sello y solo entonces presenta la pregunta y las cuatro respuestas. Sustituye la duración anterior de 8 segundos.

> **Actualización del usuario — 24/11/2026:** identidad modificable y persistente, sin bloqueo irreversible. El chat conserva el historial y anima solo la nueva réplica. Se eliminan «Sin esperas» y la franja superior de vista previa. Las tareas originales de bloqueo de identidad y control manual de esperas quedan sustituidas por estos criterios; el resto de fases sigue pendiente según su alcance.

## Fase 0 — Preparación
- [x] Confirmar proyecto GitHub `andresgm97/DepartamentoComunicacion` o usar repositorio local.
- [x] Crear proyecto Vite + React + TypeScript.
- [x] Añadir scripts de desarrollo, build y pruebas; documentar comandos en README.
- [x] Configurar base `/DepartamentoComunicacion/` para GitHub Pages.

## Fase 1 — Diseño / demo móvil
- [x] Portada de correspondencia privada con sello, cabecera institucional y botón de acceso.
- [x] Pantalla de chat con burbujas, botones, indicator «está escribiendo» y botón Atrás.
- [x] Estética verde oscuro + pergamino + dorado, responsive y accesible.
- [x] Animaciones discretas, respeto automático de movimiento reducido (sin control «Sin esperas», por petición del usuario).
- [x] Revisar visualmente en móvil antes de construir las demás escenas.

## Fase 2 — Motor de diálogo y personajes
- [x] Convertir el guion de `SPEC.md` en datos estructurados.
- [x] Implementar escena inicial, identificación y confirmación modificable en la interfaz.
- [x] Implementar **nueve conversaciones personalizadas completas**, incluida Doña Estela Enigma.
- [x] Implementar elección/respuesta/réplica y navegación hacia atrás sin mezclar ramas.
- [x] Persistir `characterId` confirmado y estado de conversación.
- [x] Pruebas automatizadas: **nueve personajes**, dos ramas de cada uno, retroceso sin modificar personaje.

## Fase 3 — Minijuego y burocracia
- [x] Ilustración del escritorio con cinco objetos; 5 segundos de observación y 3 segundos de revisión.
- [x] Segunda vista sin sello de lacre; pregunta y 4 alternativas.
- [x] Reintentos ilimitados y mensaje sarcástico en caso de fallo.
- [x] Escena de tres departamentos, animación de aprobación y últimas alternativas.
- [x] Verificar retroceso y coherencia de estados de juego.

## Fase 4 — Invitación y persistencia
- [x] Tarjeta final personalizada según nombre aristocrático.
- [x] Config editable de fecha, hora, texto de dirección, acceso y link a mapas.
- [x] Modo demostración con placeholders claramente marcados; no inventar información.
- [x] Mantener invitación desbloqueada tras cerrar/abrir y permitir revisar conversaciones.
- [x] Pruebas manuales y automáticas con rutas, recargas y opción Atrás.

## Fase 5 — QA / despliegue
- [ ] Ejecutar comprobación de tipos, pruebas y build de producción.
- [ ] Verificar render bajo subruta `/DepartamentoComunicacion/`.
- [ ] Probar en Safari iOS, Chrome Android y escritorio si están disponibles.
- [ ] Revisar **todos** los mensajes contra `SPEC.md`.
- [x] Introducir hora e indicaciones confirmadas; eliminar Dirección por petición del organizador.
- [ ] Revisar que la información incluida en los archivos estáticos sea apta para exposición pública.
- [ ] Configurar GitHub Pages con Actions y publicar cuando el usuario lo autorice.
- [ ] Enviar enlace de prueba al organizador antes de difundir por WhatsApp.

## Decisiones pendientes
1. Hora confirmada: A partir de 21:30.
2. Campo Dirección eliminado; indicaciones confirmadas: Se recomienda transporte compartido.
3. Escritorio implementado con SVG; diseño revisable.
4. Validación final de los textos y estética.

**Nota:** El alcance de la versión inicial es una invitación privada en el sentido narrativo, pero GitHub Pages/cliente web no oculta la dirección a alguien que inspeccione el código. No tratar el juego como mecanismo de confidencialidad real.
