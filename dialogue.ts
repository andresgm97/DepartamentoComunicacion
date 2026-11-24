// Transcripción literal de SPEC.md §6. No añadir diálogos sin aprobación.
export interface Choice { id: string; label: string; reply: string }
export interface Character { id: string; name: string; title: string; messages: string[]; choices: Choice[] }
export const opening = {
  "messages": [
    "Buenas tardes.",
    "Le damos la bienvenida al Departamento de Comunicación de la Residencia Estela.",
    "El motivo de este contacto es informarle de una celebración privada prevista para el próximo 27 de noviembre.",
    "Su nombre podría figurar en nuestra lista de invitados.",
    "Decimos podría porque todavía no hemos conseguido identificarle."
  ],
  "choices": [
    {
      "id": "opening-1",
      "label": "Soy una persona invitada.",
      "reply": "Excelente. Empezamos con buen pie. Procederemos a verificar su identidad"
    },
    {
      "id": "opening-2",
      "label": "Creo que se han equivocado.",
      "reply": "Resultaría preocupante. Nuestro departamento no suele cometer errores. Al menos, no errores que reconozcamos oficialmente. Comprobaremos su identidad de todas formas"
    }
  ]
};
export const identification = 'Por favor, indique su nombre para que podamos localizar su expediente';
export const characters: Character[] = [
  {
    "id": "estela",
    "name": "Estela",
    "title": "Doña Estela Enigma",
    "messages": [
      "¿Doña Estela Enigma?",
      "Un momento, por favor.",
      "Tenemos una pequeña incidencia administrativa.",
      "Según nuestros registros, usted es la titular de esta residencia.",
      "¿Nos está solicitando autorización para acceder a su propia casa?"
    ],
    "choices": [
      {
        "id": "estela-1",
        "label": "Pues parece que sí.",
        "reply": "Agradecemos su confirmación. Su solicitud seguirá los cauces habituales. La titularidad de la vivienda no constituye, por sí sola, una exención administrativa"
      },
      {
        "id": "estela-2",
        "label": "¡Pero si la casa es mía!",
        "reply": "Efectivamente. Nuestros registros coinciden con su observación. No obstante, el protocolo exige que toda persona invitada, incluida la titular, tramite su acceso. Le rogamos que no lo interprete como una desconfianza hacia usted"
      }
    ]
  },
  {
    "id": "jose",
    "name": "José",
    "title": "Don José Contrarreloj",
    "messages": [
      "Ah, don José Contrarreloj.",
      "Un momento, por favor.",
      "Nuestros registros indican cierta dificultad recurrente para cumplir los horarios establecidos.",
      "¿Debemos preocuparnos por su puntualidad el próximo día 27?"
    ],
    "choices": [
      {
        "id": "jose-1",
        "label": "Esta vez llegaré puntual.",
        "reply": "Nos alegra conocer su intención. Hemos archivado su promesa en la sección de declaraciones pendientes de verificación"
      },
      {
        "id": "jose-2",
        "label": "No prometo absolutamente nada.",
        "reply": "Agradecemos su sinceridad. Procederemos a recomendar al personal que no espere su llegada para comenzar la celebración"
      }
    ]
  },
  {
    "id": "clara",
    "name": "Clara",
    "title": "Lady Clara Wine",
    "messages": [
      "Lady Clara Wine.",
      "Qué agradable tener noticias suyas.",
      "Según consta en nuestros archivos, durante un viaje a Islandia se produjo cierta confusión lingüística entre el viento y el vino.",
      "Nos gustaría confirmar una cuestión.",
      "Si le ofrecemos una copa de vino, ¿sabrá distinguirla de una corriente de aire?"
    ],
    "choices": [
      {
        "id": "clara-1",
        "label": "Creo que sí.",
        "reply": "Nos tranquiliza saberlo. Autorizaremos el servicio de bebidas sin necesidad de intérprete"
      },
      {
        "id": "clara-2",
        "label": "Depende de cómo lo pronuncien.",
        "reply": "Comprensible. Avisaremos al personal de que vocalice correctamente antes de servir cualquier consumición"
      }
    ]
  },
  {
    "id": "noelia",
    "name": "Noelia",
    "title": "Doña Noelia Verbena",
    "messages": [
      "Doña Noelia Verbena.",
      "Hemos comprobado su historial de asistencia a celebraciones.",
      "Nos consta un entusiasmo considerable por las fiestas populares.",
      "¿Debemos entender que acudirá a esta celebración con la misma disposición?"
    ],
    "choices": [
      {
        "id": "noelia-1",
        "label": "¡Por supuesto!",
        "reply": "Excelente. Informaremos al departamento de mantenimiento por si el suelo necesita una revisión posterior"
      },
      {
        "id": "noelia-2",
        "label": "¿Habrá orquesta?",
        "reply": "La contratación de una orquesta no consta en nuestro presupuesto. Aunque tampoco consta que tengamos presupuesto"
      }
    ]
  },
  {
    "id": "miriam",
    "name": "Miriam",
    "title": "Lady Miriam Festival",
    "messages": [
      "Lady Miriam Festival.",
      "Nos complace confirmar su identidad.",
      "Antes de continuar, debemos aclarar que este departamento no tiene ninguna información sobre una posible actuación de Quevedo durante la celebración.",
      "Preferimos evitar futuras reclamaciones."
    ],
    "choices": [
      {
        "id": "miriam-1",
        "label": "Qué decepción.",
        "reply": "Lamentamos profundamente las expectativas que nunca llegamos a crear"
      },
      {
        "id": "miriam-2",
        "label": "Todavía puede aparecer.",
        "reply": "Admiramos su optimismo. Procederemos a no confirmar ni desmentir nada, por pura prudencia administrativa"
      }
    ]
  },
  {
    "id": "oscar",
    "name": "Óscar",
    "title": "Sir Óscar Sosiego",
    "messages": [
      "Sir Óscar Sosiego.",
      "Por fin, una persona que, según nuestros informes, conserva la tranquilidad incluso en circunstancias complicadas.",
      "Nos gustaría realizarle una consulta.",
      "Si durante la celebración surge algún pequeño contratiempo, ¿cómo reaccionará?"
    ],
    "choices": [
      {
        "id": "oscar-1",
        "label": "Con tranquilidad.",
        "reply": "Magnífico. Queda usted provisionalmente nombrado responsable honorífico de mantener la calma"
      },
      {
        "id": "oscar-2",
        "label": "Me serviré otra copa.",
        "reply": "Una respuesta igualmente razonable. La incluiremos en nuestro protocolo de resolución de incidencias"
      }
    ]
  },
  {
    "id": "ana",
    "name": "Ana",
    "title": "Doña Ana Natal",
    "messages": [
      "Doña Ana Natal.",
      "Un placer.",
      "Nos consta que está acostumbrada a atender situaciones de bastante responsabilidad.",
      "Por ello, queremos aclarar que esta invitación es exclusivamente para disfrutar de una celebración.",
      "¿Nos confirma que acudirá como invitada y no en calidad de personal sanitario?"
    ],
    "choices": [
      {
        "id": "ana-1",
        "label": "Voy a disfrutar.",
        "reply": "Excelente. Queda oficialmente exenta de cualquier obligación profesional durante el evento"
      },
      {
        "id": "ana-2",
        "label": "Nunca se sabe.",
        "reply": "Comprendemos su prudencia. Aun así, nuestro deseo es que esta vez su única preocupación sea elegir qué comer"
      }
    ]
  },
  {
    "id": "paula",
    "name": "Paula",
    "title": "Profesora Paula Fitness",
    "messages": [
      "Profesora Paula Fitness.",
      "Hemos revisado sus preferencias de desplazamiento y actividad física.",
      "Le adelantamos una información importante: para asistir a esta celebración no será necesario embarcar en ningún avión.",
      "¿Le parece aceptable?"
    ],
    "choices": [
      {
        "id": "paula-1",
        "label": "¡Mucho mejor así!",
        "reply": "Nos alegra haber reducido considerablemente las dificultades logísticas de su asistencia"
      },
      {
        "id": "paula-2",
        "label": "¿Y puedo ir andando?",
        "reply": "Por supuesto. El Departamento de Comunicación apoya los desplazamientos activos. Siempre que terminen en la dirección correcta"
      }
    ]
  },
  {
    "id": "jimmy",
    "name": "Jimmy",
    "title": "Lord Jimmy Descalzo",
    "messages": [
      "Lord Jimmy Descalzo.",
      "Le damos la bienvenida.",
      "Nuestros registros reflejan una intensa actividad relacionada con la montaña, el pádel y determinadas aventuras personales.",
      "Antes de continuar, necesitamos aclarar el código de vestimenta.",
      "¿Tiene previsto acudir con calzado?"
    ],
    "choices": [
      {
        "id": "jimmy-1",
        "label": "Sí, iré presentable.",
        "reply": "Perfecto. Agradecemos su colaboración con las normas básicas de convivencia"
      },
      {
        "id": "jimmy-2",
        "label": "El apellido no es casualidad.",
        "reply": "Entendemos. Dejaremos la cuestión en manos del Departamento de Suelos y Superficies. Si conseguimos localizarlo"
      }
    ]
  }
];
