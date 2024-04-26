// Variables para almacenar el progreso del juego y el índice de la pregunta actual
let currentQuestionIndex = 0;
let progress = 0;

function showQuestion(question) {
  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('options');

  // Limpiamos cualquier contenido previo en el contenedor de opciones
  optionsContainer.innerHTML = '';

  // Mostramos la pregunta
  questionElement.textContent = question.question;

  // Mostramos las opciones
  question.options.forEach((option, index) => {
      const optionElement = document.createElement('button');
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => checkAnswer(index));
      optionsContainer.appendChild(optionElement);
  });
}

// Función para verificar la respuesta del jugador
function checkAnswer(selectedOptionIndex) {
  const userAnswer = questions[currentQuestionIndex].options[selectedOptionIndex].toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

  // Verificamos si la respuesta seleccionada es correcta
  if (userAnswer === correctAnswer) {
      // Respuesta correcta
      alert('¡Respuesta correcta!');
      progress++; // Incrementamos el progreso del jugador
      console.log(questions[currentQuestionIndex].comment); // Mostramos un comentario (si lo hay)
  } else {
      // Respuesta incorrecta
      alert('Respuesta incorrecta. Inténtalo de nuevo.');
  }
  
  // Mostramos la siguiente pregunta o finalizamos el juego
  if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++; // Pasamos a la siguiente pregunta
      showQuestion(questions[currentQuestionIndex]); // Mostramos la siguiente pregunta
  } else {
      finishGame(); // Finalizamos el juego si no hay más preguntas
  }
}

// Función para finalizar el juego
function finishGame() {
  alert('¡Felicidades! Has completado todas las preguntas.');
}

// Función para registrar al usuario
function registrarUsuario(event) {
  event.preventDefault(); // Evita que el formulario se envíe por defecto

  // Obtener los datos del formulario de registro
  const nombreUsuario = document.getElementById('nombreUsuario').value;
  const contraseña = document.getElementById('contraseña').value;
  const confirmarContraseña = document.getElementById('confirmarContraseña').value;

  // Validar que las contraseñas coincidan
  if (contraseña !== confirmarContraseña) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return; // Detener la ejecución de la función si las contraseñas no coinciden
  }

  // Datos del usuario a enviar al servidor
  const userData = {
      username: nombreUsuario,
      password: contraseña
  };

  // URL del servidor donde se almacenarán los datos del usuario
  const url = 'URL_DEL_SERVIDOR';

  // Opciones para la solicitud fetch (método POST, cuerpo de la solicitud)
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
  };

  // Enviar la solicitud fetch al servidor
  fetch(url, options)
      .then(response => {
          if (response.ok) {
              // Si la solicitud es exitosa, mostrar un mensaje de éxito y ocultar los formularios
              alert('¡Registro exitoso!');
              ocultarFormularios();
          } else {
              // Si la solicitud falla, mostrar un mensaje de error
              throw new Error('Error en la solicitud');
          }
      })
      .catch(error => {
          console.error('Error al registrar al usuario:', error);
          alert('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
      });
}

// Función para ocultar los formularios de registro e inicio de sesión después del registro exitoso
function ocultarFormularios() {
  const formularioRegistro = document.getElementById('registroForm');
  const formularioInicioSesion = document.getElementById('inicioSesionForm');
  
  formularioRegistro.style.display = 'none';
  formularioInicioSesion.style.display = 'none';
}

// Función para mostrar la página inicial del juego
function mostrarPaginaInicial() {
  const paginaInicio = document.getElementById('inicio');
  const paginaJuego = document.getElementById('juego');
  
  paginaInicio.style.display = 'none'; // Oculta la página de inicio
  paginaJuego.style.display = 'block'; // Muestra la página del juego
}

// Event listener para el evento "DOMContentLoaded" que se dispara cuando el HTML ha sido completamente cargado y analizado
document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos a los botones de registro e inicio de sesión
    const mostrarRegistro = document.getElementById('mostrarRegistro');
    const mostrarInicioSesion = document.getElementById('mostrarInicioSesion');
    const formularioRegistro = document.getElementById('registroForm');
    const formularioInicioSesion = document.getElementById('inicioSesionForm');
    
    mostrarRegistro.addEventListener('click', function() {
        formularioRegistro.style.display = 'block';
        formularioInicioSesion.style.display = 'none';
    });
    
    mostrarInicioSesion.addEventListener('click', function() {
        formularioInicioSesion.style.display = 'block';
        formularioRegistro.style.display = 'none';
    });
    
    // Asignar eventos a los formularios de registro e inicio de sesión
    formularioRegistro.addEventListener('submit', registrarUsuario);
    formularioInicioSesion.addEventListener('submit', iniciarSesion);
});
