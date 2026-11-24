// Guion aprobado: SPEC.md, escenas 3–5.
export const protocol = {
  "messages": [
    "Muy bien.",
    "Hemos confirmado su identidad y actualizado su expediente.",
    "Ahora debemos proceder con el protocolo de autorización de invitados.",
    "Por normativa interna, debemos informarle de que el siguiente trámite es obligatorio.",
    "Aunque, para ser completamente sinceros, nadie recuerda quién aprobó esa normativa.",
    "¿Desea continuar?"
  ],
  "choices": [
    {
      "id": "protocol-1",
      "label": "Sí, continuemos.",
      "reply": "Agradecemos su colaboración. Es agradable tratar con personas que respetan nuestros procedimientos sin hacer demasiadas preguntas"
    },
    {
      "id": "protocol-2",
      "label": "¿No podéis decirme ya dónde es?",
      "reply": "Por supuesto que podemos. Pero entonces todo el trabajo de crear este departamento habría sido completamente innecesario. Y comprenderá que eso no podemos permitirlo"
    }
  ]
};
export const observation = {
  "intro": [
    "Procederemos ahora a evaluar una habilidad fundamental para cualquier persona que pretenda asistir a una celebración privada.",
    "La capacidad de observar una mesa.",
    "Sabemos que parece una prueba sencilla.",
    "Precisamente por eso nos preocupa que alguien pueda fallarla."
  ],
  "question": [
    "Hemos detectado una irregularidad.",
    "Uno de los objetos ha desaparecido.",
    "¿Qué elemento falta?"
  ],
  "success": [
    "Correcto.",
    "Nos complace comunicarle que dispone usted de una capacidad visual perfectamente compatible con la asistencia a un cumpleaños.",
    "Procederemos a certificarlo."
  ],
  "failure": [
    "Respuesta incorrecta.",
    "No se alarme.",
    "El Departamento de Comunicación considera que todo el mundo merece una segunda oportunidad.",
    "Especialmente cuando no hemos preparado una prueba alternativa."
  ],
  "choices": [
    {
      "id": "bell",
      "label": "La campanilla."
    },
    {
      "id": "seal",
      "label": "El sello de lacre."
    },
    {
      "id": "cup",
      "label": "La taza."
    },
    {
      "id": "key",
      "label": "La llave."
    }
  ],
  "correctId": "seal",
  "durationMs": 5000,
  "revealDurationMs": 3000
};
export const authorization = {
  "intro": [
    "Enhorabuena.",
    "Su expediente ha superado las comprobaciones iniciales.",
    "Solo queda obtener la autorización definitiva de tres departamentos."
  ],
  "review": [
    "Un momento, por favor.",
    "Estamos consultando con el responsable correspondiente."
  ],
  "approved": [
    "Tenemos una actualización.",
    "El responsable del Departamento de Comunicación ha aprobado personalmente su solicitud.",
    "Por suerte, se encontraba disponible.",
    "Somos nosotros mismos."
  ],
  "choices": [
    {
      "id": "authorization-1",
      "label": "Qué organización tan eficiente.",
      "reply": "Agradecemos su reconocimiento. Haremos llegar sus felicitaciones a la Dirección. En cuanto tengamos ocasión de reunirnos con nosotros mismos"
    },
    {
      "id": "authorization-2",
      "label": "Esto es un cachondeo.",
      "reply": "Lamentamos que nuestro procedimiento le haya causado esa impresión. No obstante, su valoración será trasladada al Departamento de Quejas y Sugerencias. Que también somos nosotros"
    }
  ]
};
