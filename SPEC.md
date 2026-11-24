# SPEC.md — Departamento de Comunicación de la Residencia Estela

> **Datos confirmados por el usuario — 24/11/2026:** eliminar el campo Dirección de la tarjeta y de la configuración; hora «A partir de 21:30» e indicaciones de acceso «Se recomienda transporte compartido». Se conserva «Parte de abajo de la casa de Estela». Ya no se muestra aviso de datos pendientes. Sin enlace de mapas ni publicación. Esta actualización sustituye las referencias anteriores a esos campos pendientes.

> **Actualización aprobada — 24/11/2026:** la prueba muestra todos los objetos durante 5 segundos, después muestra durante 3 segundos la imagen sin el sello y solo entonces presenta la pregunta y las cuatro respuestas. Sustituye la duración anterior de 8 segundos.

> **Actualización aprobada por el usuario — 24/11/2026:** las cláusulas de identidad inmutable quedan sustituidas por selección persistente y modificable mediante «Cambiar identidad». Al confirmar otro personaje se descarta la rama personalizada anterior. Se retira el control «Sin esperas» y la franja superior de vista previa; continúa el soporte automático de movimiento reducido. Las elecciones añaden solo mensajes nuevos, conservando visible el historial sin reproducirlo otra vez. Esta actualización prevalece sobre las disposiciones originales incompatibles que se conservan debajo como referencia.

**Versión:** 1.1 — corrección de la lista completa de personajes (Estela incluida)  
**Estado:** guion y mecánicas aprobados; diseño exacto y datos de la invitación pendientes  
**Proyecto / repositorio:** `DepartamentoComunicacion`  
**Idioma:** español de España

## 1. Objetivo

Crear una **aplicación web, mobile-first**, accesible desde un enlace de WhatsApp, que funcione como una invitación interactiva para la celebración del 27 de noviembre de 2026. La dirección se comunica **al finalizar** un intercambio con el ficticio **Departamento de Comunicación de la Residencia Estela**.

El usuario interpreta a un invitado; el Departamento de Comunicación habla **siempre en plural institucional**, es educadísimo, exageradamente burocrático, sarcástico sin ser hiriente y presume de una organización que, en el fondo, depende de un único empleado. El contraste es la fuente del humor.

**No es un chatbot de IA.** Es un chat *guiado* por elecciones con botones y rutas programadas, sin API ni costes por conversación. Tampoco es una llamada: **no mostrar interfaz telefónica ni reproducir voz**. La entrada se hace mediante una notificación de correspondencia y se desarrolla en un servicio de mensajería privado de estética británica.

**Duración objetivo:** unos 3 minutos en el primer recorrido normal, sin contar el tiempo que dediquen a retroceder y ver otras opciones. Priorizar mensajes breves y un ritmo natural: no forzar esperas para alargar artificialmente la experiencia.

## 2. Reglas no negociables

1. La identidad se selecciona **una vez y se confirma**. Tras confirmar, se almacena localmente en el navegador (`localStorage`) y **no hay controles para cambiarla**, ni navegando atrás, ni al recargar, ni al volver a abrir la web en el mismo navegador. Antes de confirmar, puede corregirse.
2. Los invitados pueden **retroceder libremente para volver a elegir cualquier otra respuesta**, ver la réplica alternativa del Departamento y continuar. El límite de retroceso es la primera pantalla **posterior a la confirmación del personaje**. Las ramas de conversación nunca deben quedar mezcladas en el historial tras cambiar una elección.
3. Volver atrás y cambiar respuestas **no cambia la identidad**, ni debe eliminar una invitación que ya se haya desbloqueado. Tras terminar, se puede volver a leer la conversación y explorar opciones; además, hay acceso directo a «Ver mi invitación».
4. El desbloqueo de la invitación se conserva localmente al cerrar/recargar la pestaña. Un fallo en una prueba permite reintentar sin bloqueo permanente.
5. **Hay exactamente nueve personajes seleccionables**, incluida **Doña Estela Enigma**: Estela, José, Clara, Noelia, Miriam, Óscar, Ana, Paula y Jimmy. Estela debe tener el mismo flujo, personalización y alternativas que los demás. No excluirla por su condición de cumpleañera. No revelar ningún secreto del Cluedo.
6. **No revelar ni insinuar explícitamente** el asesinato, la solución del Cluedo, el culpable, el objeto, el lugar del crimen ni los documentos secretos. El objetivo es invitar, no anticipar el juego. El nombre del Cluedo tampoco debe figurar en la invitación pública.
7. Los acertijos y pruebas son **los mismos para todo el mundo**; solo cambia la escena personalizada del personaje.
8. No pedir registro, correo, contraseña, ubicación del dispositivo ni permisos. No incorporar analítica de terceros.
9. La aplicación debe funcionar completamente sin servidor y sin IA. No incluir claves API, servicios pagos ni dependencias de backend.
10. La dirección y la hora aún no se han facilitado. Dejarlas en una configuración fácil de editar y mostrar **textos de ejemplo claramente señalados solo durante desarrollo**. No inventar datos reales.

**Límite técnico conocido:** el bloqueo de identidad en `localStorage` es un bloqueo de interfaz, no una medida de seguridad antifraude. Al borrar datos del sitio o abrir otro navegador/dispositivo podría elegirse de nuevo. Asimismo, en una web estática **la dirección incluida en los archivos publicados no es secreta técnicamente**, aunque se revele narrativamente al terminar. No prometer ocultación real de datos en GitHub Pages.

## 3. Tecnologías y organización

- React + TypeScript + Vite.
- CSS moderno o Tailwind CSS si aporta claridad, priorizando ligereza, accesibilidad y diseño cuidado.
- Hosting final previsto: GitHub Pages, ruta de proyecto `/DepartamentoComunicacion/`.
- Usar `import.meta.env.BASE_URL` o equivalente para rutas y assets; configurar correctamente `base: '/DepartamentoComunicacion/'` para producción.
- Preferir una sola pantalla tipo SPA sin dependencia de rutas servidor.
- Contenido separado de los componentes UI: `src/content/dialogue.ts` o archivos JSON/TS equivalentes; configuración de evento en `src/config/event.ts`.
- Persistencia local con clave versionada, por ejemplo `residencia-estela:v1:session` y estructura tipada; prever migración o restablecimiento de contenido no crítico sin deshacer la identidad.
- No instalar SDKs de IA.

## 4. Dirección de arte y experiencia

Concepto: **servicio de mensajería privada de una mansión británica**, no una copia directa de WhatsApp. Paleta: verde bosque oscuro (`#1D2C26` o similar), verde apagado, crema pergamino y dorado envejecido (`#E0BE80` o similar). Tipografía sobria, sello/escudo pequeño (por ejemplo corona) y expedientes archivísticos.

Elementos previstos:
- Pantalla inicial con escudo «RESIDENCIA ESTELA», «DEPARTAMENTO DE COMUNICACIÓN», notificación «Tiene usted correspondencia pendiente» y botón «Consultar correspondencia».
- Cabecera fija del chat: «Departamento de Comunicación», «Residencia Estela», estado «Servicio oficial de atención a invitados».
- Mensajes del Departamento en burbujas cortas, con pausas breves entre mensajes y un indicador «El Departamento está escribiendo…». Debe existir modo de **omitir animaciones/esperas**, y respetarse `prefers-reduced-motion`.
- Respuestas del usuario solo mediante botones, presentadas como burbujas o acciones elegibles.
- Botón **Atrás** durante las escenas, visible y accesible; deshabilitado al intentar traspasar el límite de identidad confirmado.
- Anotaciones documentales y sellos animados: «EXPEDIENTE LOCALIZADO», «CAPACIDAD DE OBSERVACIÓN: VALIDADA», «AUTORIZACIÓN CONCEDIDA», «EXPEDIENTE DC-2711: CERRADO».
- Nada de audio obligatorio. No hacer llamadas telefónicas.
- En la pantalla final, tarjeta elegante con nombre aristocrático, fecha, hora (si se define), ubicación «PARTE DE ABAJO DE LA CASA DE ESTELA» y, cuando haya dirección real, enlace externo a mapas. Guardar invitación en el navegador; descarga de imagen/PDF solo si se implementa sin complicaciones y se aprueba más adelante.

Accesibilidad: botones grandes para móvil, contraste, navegación por teclado, textos reales en DOM, etiquetas accesibles, no depender solo de colores, respetar movimiento reducido. Funcionar también en escritorio.

## 5. Máquina de estados / comportamiento

Escenas en orden:

1. **Portada y correspondencia** → botón «Consultar correspondencia».
2. **Apertura del expediente** → elección A/B con réplica.
3. **Identificación** → seleccionar uno de los nueve nombres; pantalla de revisión y botón «Confirmar identidad»; a partir de aquí `characterId` inmutable en la interfaz.
4. **Conversación personalizada** → pregunta y dos respuestas para ese personaje, con dos réplicas distintas.
5. **Protocolo de comunicación** → elección entre continuar o pedir directamente dirección, con dos réplicas.
6. **Comprobación de observación** → observar mesa 8 segundos, cambio visual (desaparece sello de lacre), cuatro opciones, retry tras error, sello validado tras acierto.
7. **Autorización administrativa** → tres departamentos; último «en revisión»; réplica sobre que el responsable del Departamento son ellos mismos; dos respuestas y reacciones.
8. **Invitación final** → mostrar la ubicación y la tarjeta personalizada; acceso a «Ver mi invitación» y, cuando se configure, «Consultar ubicación».

Retroceso: no simularlo simplemente con `window.history.back()`. Se necesita historial explícito de decisiones/escenas y renderizado determinista. Al modificar una respuesta previa, descartar visualmente las ramas posteriores que dependían de ella y permitir seguir desde allí. Mantener aparte identidad inmutable y `invitationUnlocked` persistente. Una vez concedida autorización, explorar otros diálogos no revoca autorización.

Al recargar: restaurar el último punto razonable, siempre respetando identidad confirmada. Los usuarios que ya completaron pueden ir directamente a su invitación o retomar conversación.

En la elección de personaje, evitar confirmar por un solo toque accidental: mostrar «Ha seleccionado [nombre aristocrático]. ¿Confirmamos su identidad?», botones «Confirmar identidad» / «Corregir selección». Tras confirmar, no incluir ningún enlace, botón o ruta interna a esta pantalla.

## 6. Guion definitivo de partida (texto de referencia)

El guion siguiente es la **fuente de verdad para los mensajes**. Mantener el sentido, las bromas y las alternativas; pequeñas divisiones en burbujas y ajustes de puntuación por espacio son aceptables, pero no reescribir los chistes ni improvisar otras pruebas sin consultar.

### ESCENA 1 — Apertura del expediente (0:00–0:20)

**Pantalla:** escudo de Residencia Estela; notificación «Tiene usted correspondencia pendiente». Remitente «Departamento de Comunicación — Residencia Estela». Botón **Consultar correspondencia**.

**DEPARTAMENTO:**

> Buenas tardes.
>
> Le damos la bienvenida al Departamento de Comunicación de la Residencia Estela.
>
> El motivo de este contacto es informarle de una celebración privada prevista para el próximo 27 de noviembre.
>
> Su nombre podría figurar en nuestra lista de invitados.
>
> Decimos *podría* porque todavía no hemos conseguido identificarle.

**Botones:**
- «Soy una persona invitada.» → «Excelente. Empezamos con buen pie. Procederemos a verificar su identidad».
- «Creo que se han equivocado.» → «Resultaría preocupante. Nuestro departamento no suele cometer errores. Al menos, no errores que reconozcamos oficialmente. Comprobaremos su identidad de todas formas».

### ESCENA 2 — Identificación (0:20–0:55)

**DEPARTAMENTO:** «Por favor, indique su nombre para que podamos localizar su expediente».

Opciones: **Estela, José, Clara, Noelia, Miriam, Óscar, Ana, Paula, Jimmy**.

Tras seleccionar: «CONSULTANDO ARCHIVOS…» / «EXPEDIENTE LOCALIZADO». Mostrar el nombre aristocrático y exigir confirmación única antes de bloquearlo.

#### Estela — Doña Estela Enigma

**DEPARTAMENTO:**

> ¿Doña Estela Enigma?
>
> Un momento, por favor.
>
> Tenemos una pequeña incidencia administrativa.
>
> Según nuestros registros, usted es la titular de esta residencia.
>
> ¿Nos está solicitando autorización para acceder a su propia casa?

- «Pues parece que sí.» → «Agradecemos su confirmación. Su solicitud seguirá los cauces habituales. La titularidad de la vivienda no constituye, por sí sola, una exención administrativa».
- «¡Pero si la casa es mía!» → «Efectivamente. Nuestros registros coinciden con su observación. No obstante, el protocolo exige que toda persona invitada, incluida la titular, tramite su acceso. Le rogamos que no lo interprete como una desconfianza hacia usted».

**Nota de producción:** Estela participa en las mismas escenas, pruebas y condiciones de navegación que los demás personajes. No incluir revelaciones sobre el asesinato ni la solución del Cluedo en su diálogo.

#### José — Don José Contrarreloj

**DEPARTAMENTO:**

> Ah, don José Contrarreloj.
>
> Un momento, por favor.
>
> Nuestros registros indican cierta dificultad recurrente para cumplir los horarios establecidos.
>
> ¿Debemos preocuparnos por su puntualidad el próximo día 27?

- «Esta vez llegaré puntual.» → «Nos alegra conocer su intención. Hemos archivado su promesa en la sección de declaraciones pendientes de verificación».
- «No prometo absolutamente nada.» → «Agradecemos su sinceridad. Procederemos a recomendar al personal que no espere su llegada para comenzar la celebración».

#### Clara — Lady Clara Wine

**DEPARTAMENTO:**

> Lady Clara Wine.
>
> Qué agradable tener noticias suyas.
>
> Según consta en nuestros archivos, durante un viaje a Islandia se produjo cierta confusión lingüística entre el viento y el vino.
>
> Nos gustaría confirmar una cuestión.
>
> Si le ofrecemos una copa de vino, ¿sabrá distinguirla de una corriente de aire?

- «Creo que sí.» → «Nos tranquiliza saberlo. Autorizaremos el servicio de bebidas sin necesidad de intérprete».
- «Depende de cómo lo pronuncien.» → «Comprensible. Avisaremos al personal de que vocalice correctamente antes de servir cualquier consumición».

#### Noelia — Doña Noelia Verbena

**DEPARTAMENTO:**

> Doña Noelia Verbena.
>
> Hemos comprobado su historial de asistencia a celebraciones.
>
> Nos consta un entusiasmo considerable por las fiestas populares.
>
> ¿Debemos entender que acudirá a esta celebración con la misma disposición?

- «¡Por supuesto!» → «Excelente. Informaremos al departamento de mantenimiento por si el suelo necesita una revisión posterior».
- «¿Habrá orquesta?» → «La contratación de una orquesta no consta en nuestro presupuesto. Aunque tampoco consta que tengamos presupuesto».

#### Miriam — Lady Miriam Festival

**DEPARTAMENTO:**

> Lady Miriam Festival.
>
> Nos complace confirmar su identidad.
>
> Antes de continuar, debemos aclarar que este departamento no tiene ninguna información sobre una posible actuación de Quevedo durante la celebración.
>
> Preferimos evitar futuras reclamaciones.

- «Qué decepción.» → «Lamentamos profundamente las expectativas que nunca llegamos a crear».
- «Todavía puede aparecer.» → «Admiramos su optimismo. Procederemos a no confirmar ni desmentir nada, por pura prudencia administrativa».

#### Óscar — Sir Óscar Sosiego

**DEPARTAMENTO:**

> Sir Óscar Sosiego.
>
> Por fin, una persona que, según nuestros informes, conserva la tranquilidad incluso en circunstancias complicadas.
>
> Nos gustaría realizarle una consulta.
>
> Si durante la celebración surge algún pequeño contratiempo, ¿cómo reaccionará?

- «Con tranquilidad.» → «Magnífico. Queda usted provisionalmente nombrado responsable honorífico de mantener la calma».
- «Me serviré otra copa.» → «Una respuesta igualmente razonable. La incluiremos en nuestro protocolo de resolución de incidencias».

#### Ana — Doña Ana Natal

**DEPARTAMENTO:**

> Doña Ana Natal.
>
> Un placer.
>
> Nos consta que está acostumbrada a atender situaciones de bastante responsabilidad.
>
> Por ello, queremos aclarar que esta invitación es exclusivamente para disfrutar de una celebración.
>
> ¿Nos confirma que acudirá como invitada y no en calidad de personal sanitario?

- «Voy a disfrutar.» → «Excelente. Queda oficialmente exenta de cualquier obligación profesional durante el evento».
- «Nunca se sabe.» → «Comprendemos su prudencia. Aun así, nuestro deseo es que esta vez su única preocupación sea elegir qué comer».

#### Paula — Profesora Paula Fitness

**DEPARTAMENTO:**

> Profesora Paula Fitness.
>
> Hemos revisado sus preferencias de desplazamiento y actividad física.
>
> Le adelantamos una información importante: para asistir a esta celebración no será necesario embarcar en ningún avión.
>
> ¿Le parece aceptable?

- «¡Mucho mejor así!» → «Nos alegra haber reducido considerablemente las dificultades logísticas de su asistencia».
- «¿Y puedo ir andando?» → «Por supuesto. El Departamento de Comunicación apoya los desplazamientos activos. Siempre que terminen en la dirección correcta».

#### Jimmy — Lord Jimmy Descalzo

**DEPARTAMENTO:**

> Lord Jimmy Descalzo.
>
> Le damos la bienvenida.
>
> Nuestros registros reflejan una intensa actividad relacionada con la montaña, el pádel y determinadas aventuras personales.
>
> Antes de continuar, necesitamos aclarar el código de vestimenta.
>
> ¿Tiene previsto acudir con calzado?

- «Sí, iré presentable.» → «Perfecto. Agradecemos su colaboración con las normas básicas de convivencia».
- «El apellido no es casualidad.» → «Entendemos. Dejaremos la cuestión en manos del Departamento de Suelos y Superficies. Si conseguimos localizarlo».

### ESCENA 3 — Protocolo de comunicación (0:55–1:30)

**DEPARTAMENTO:**

> Muy bien.
>
> Hemos confirmado su identidad y actualizado su expediente.
>
> Ahora debemos proceder con el protocolo de autorización de invitados.

Documento **PROTOCOLO DC-2711**:

1. Identidad del solicitante: VERIFICADA.
2. Capacidad de observación: PENDIENTE.
3. Autorización de acceso: PENDIENTE.

**DEPARTAMENTO:**

> Por normativa interna, debemos informarle de que el siguiente trámite es obligatorio.
>
> Aunque, para ser completamente sinceros, nadie recuerda quién aprobó esa normativa.
>
> ¿Desea continuar?

- «Sí, continuemos.» → «Agradecemos su colaboración. Es agradable tratar con personas que respetan nuestros procedimientos sin hacer demasiadas preguntas».
- «¿No podéis decirme ya dónde es?» → «Por supuesto que podemos. Pero entonces todo el trabajo de crear este departamento habría sido completamente innecesario. Y comprenderá que eso no podemos permitirlo».

### ESCENA 4 — Comprobación de observación (1:30–2:05)

**DEPARTAMENTO:**

> Procederemos ahora a evaluar una habilidad fundamental para cualquier persona que pretenda asistir a una celebración privada.
>
> La capacidad de observar una mesa.
>
> Sabemos que parece una prueba sencilla.
>
> Precisamente por eso nos preocupa que alguien pueda fallarla.

Botón **Comenzar comprobación**.

Se muestra **durante 8 segundos** una ilustración del escritorio con: campanilla, reloj de bolsillo, taza, llave y sello de lacre. Se oscurece y vuelve a aparecer sin el **sello de lacre**.

**DEPARTAMENTO:**

> Hemos detectado una irregularidad.
>
> Uno de los objetos ha desaparecido.
>
> ¿Qué elemento falta?

Botones: «La campanilla.» / «El sello de lacre.» (**correcta**) / «La taza.» / «La llave.»

**Acierto:**

> Correcto.
>
> Nos complace comunicarle que dispone usted de una capacidad visual perfectamente compatible con la asistencia a un cumpleaños.
>
> Procederemos a certificarlo.

**Error:**

> Respuesta incorrecta.
>
> No se alarme.
>
> El Departamento de Comunicación considera que todo el mundo merece una segunda oportunidad.
>
> Especialmente cuando no hemos preparado una prueba alternativa.

Tras fallar, volver a mostrar mesa y permitir reintentar; nunca bloquear el progreso. Tras acertar sello «CAPACIDAD DE OBSERVACIÓN: VALIDADA».

### ESCENA 5 — Autorización administrativa (2:05–2:35)

**DEPARTAMENTO:**

> Enhorabuena.
>
> Su expediente ha superado las comprobaciones iniciales.
>
> Solo queda obtener la autorización definitiva de tres departamentos.

Mostrar progresivamente:
- Departamento de Identificación: **APROBADO**.
- Departamento de Seguridad: **APROBADO**.
- Departamento de Comunicación: **EN REVISIÓN**.

**DEPARTAMENTO:**

> Un momento, por favor.
>
> Estamos consultando con el responsable correspondiente.

Indicador «El Departamento está escribiendo…».

**DEPARTAMENTO:**

> Tenemos una actualización.
>
> El responsable del Departamento de Comunicación ha aprobado personalmente su solicitud.
>
> Por suerte, se encontraba disponible.
>
> Somos nosotros mismos.

- «Qué organización tan eficiente.» → «Agradecemos su reconocimiento. Haremos llegar sus felicitaciones a la Dirección. En cuanto tengamos ocasión de reunirnos con nosotros mismos».
- «Esto es un cachondeo.» → «Lamentamos que nuestro procedimiento le haya causado esa impresión. No obstante, su valoración será trasladada al Departamento de Quejas y Sugerencias. Que también somos nosotros».

Sello: **AUTORIZACIÓN CONCEDIDA**.

### ESCENA 6 — Revelación (2:35–3:05)

**DEPARTAMENTO:**

> Nos complace informarle de que su solicitud ha sido aprobada.
>
> Ha demostrado paciencia, capacidad de observación y una tolerancia administrativa superior a la media.
>
> En consecuencia, estamos autorizados a facilitarle la información solicitada.
>
> Le rogamos que preste especial atención a la indicación de acceso.
>
> No queremos incidencias en la entrada.

Botón **Consultar invitación oficial**.

Tarjeta:

> **RESIDENCIA ESTELA**  
> **INVITACIÓN OFICIAL**  
> Se autoriza la asistencia de: **[NOMBRE ARISTOCRÁTICO]**  
> A la celebración del próximo: **27 DE NOVIEMBRE DE 2026**  
> **UBICACIÓN AUTORIZADA**  
> **PARTE DE ABAJO DE LA CASA DE ESTELA**  
> Hora: **[PENDIENTE — NO INVENTAR]**  
> Indicaciones de acceso: **[PENDIENTES — NO INVENTAR]**

**DEPARTAMENTO:**

> Su invitación ha sido emitida correctamente.
>
> Le recomendamos conservarla para futuras consultas.
>
> No será necesario repetir los trámites.
>
> El Departamento de Comunicación le agradece su colaboración y le desea una agradable celebración.
>
> Atentamente,
>
> Departamento de Comunicación  
> Residencia Estela
>
> P. D.: Le rogamos que no responda a este mensaje. Bastante trabajo tenemos ya.

Botones: **Ver mi invitación** / **Consultar ubicación** (este último, solo activo cuando se haya configurado un enlace real). Mensaje «Expediente DC-2711: CERRADO».

## 7. Datos configurables

Crear un único archivo de configuración con:

- `eventDate`: `2026-11-27`.
- `eventDisplayDate`: `27 de noviembre de 2026`.
- `eventTime`: `null` (no conocida aún).
- `venueLabel`: `Parte de abajo de la casa de Estela`.
- `addressText`: `null` (no conocida aún).
- `accessInstructions`: `null` (no conocidas aún).
- `mapsUrl`: `null` (no conocida aún).
- `demoMode`: `true` durante desarrollo, con aviso visible «Datos de acceso pendientes de configurar».

No publicar la aplicación como invitación definitiva hasta contar con los datos necesarios y comprobar el texto de acceso. No usar un mapa ni un enlace inventado.

## 8. Criterios de aceptación

- [ ] La app se ve bien en móviles estrechos y escritorio.
- [ ] La primera pantalla es **correspondencia**, nunca un teléfono.
- [ ] El Departamento mantiene tono institucional en plural, con los textos de referencia.
- [ ] Los nueve personajes, **incluida Doña Estela Enigma**, tienen nombre aristocrático, pregunta y dos respuestas diferenciadas.
- [ ] Estela aparece en el selector, su conversación está implementada y no incluye spoilers del Cluedo.
- [ ] Confirmar un personaje lo fija; Atrás jamás permite volver al selector.
- [ ] Todas las respuestas de todas las escenas pueden revisitarse y alternarse.
- [ ] Al cambiar una respuesta, no quedan mensajes de la alternativa anterior mezclados.
- [ ] La prueba de observación dura 8 s; desaparece sello de lacre; permite reintentar.
- [ ] Tras completar, la invitación se conserva tras recargar y existe acceso directo.
- [ ] La identidad persiste tras recargar/cerrar/abrir en el mismo navegador.
- [ ] Dirección y hora nunca se inventan; si faltan, el modo desarrollo lo deja claro.
- [ ] No hay API de IA, pagos por mensaje, registro ni analítica.
- [ ] `npm run build` termina sin errores; los assets cargan bajo `/DepartamentoComunicacion/`.
- [ ] README explica instalación, desarrollo, despliegue y límites del bloqueo local.

## 9. Fuera de alcance de la primera versión

Chat abierto con IA, personajes aleatorios, reconocimiento de voz, llamadas, backend, sistema de cuentas, bloqueos antifraude reales, recopilación de datos personales, seguimiento de invitados, solución o pistas reales del Cluedo, imagen/PDF de invitación descargable, y cambios de personaje una vez confirmado.
