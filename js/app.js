var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'+contadorId+/responses'
};

var $respuestas = $("#responsesContainer");

var cargarPagina = function() {
    cargarTema();
    $("#add-response").submit(agregarRespuesta);
    $('.modal').modal();
};

var cargarTema= function () {
    $.getJSON(api.url, function(temas){
    temas.forEach(crearRespuesta);
  });
}

var contadorId = 1;

var crearRespuesta = function (tema) {
    var mensaje = tema.content;
    var autor = tema.author_name;

  // creando el div
  var $div = $("<div />");
  // creamos el mensaje
  var $mensaje = $("<p />"); 
  $mensaje.text(mensaje);
    
  // creando el autor
  var $autor = $("<p />");
  $autor.text(autor);
    
  // agregando a los p
  $div.append($mensaje);
  $div.append($autor);

  // agregando info
  $respuestas.append($div);
};

var agregarRespuesta = function (e) {
  e.preventDefault();
  var autor = $("#author_name").val();
  var mensaje = $("#respuesta").val();
  $.post(api.url, {
    author_name: autor,
    respuesta: mensaje
  }, function (tema) {
    crearRespuesta(tema);
    $("#modalTopicNuevo").modal("hide");
  });
};

$(document).ready(cargarPagina);





