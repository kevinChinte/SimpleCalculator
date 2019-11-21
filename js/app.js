

var Calculadora = {
  init: function(){
    this.asignarFuncionesTecla();
    this.asignarAnimacionTecla(".tecla");
  },
  display:'0',
  resultado: 0,
  memoria: '',
  primerNumero: '',
  segundoNumero: '',
  tecla: 0,
  operacion:'',
  asignarFuncionesTecla: function(){
    var buttom = document.getElementsByClassName('tecla');
    console.log(buttom.length);
    for (var i = 0; i < buttom.length; i++) {
        buttom[i].addEventListener("click", function(){
        Calculadora.tecla = this.alt;
        if (Calculadora.tecla == 'On' || Calculadora.tecla == 'punto' || Calculadora.tecla == 'igual' || Calculadora.tecla == 'signo' || Calculadora.tecla == 'raiz') {
            Calculadora.ejecutar_operacion_directa();
        } else {
          if (!isNaN(Calculadora.tecla ) ) {
            Calculadora.presionar_tecla_es_numero();
          } else {
            Calculadora.presionar_tecla_es_operacion();
          }
        }
      });
    }
  },
  asignarAnimacionTecla: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onclick = this.eventoAchicaBoton;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},
  eventoAchicaBoton: function(event){
		Calculadora.AchicarTamañoBoton(event.target);
	},

	eventoVuelveBoton: function(event){
		Calculadora.AumentarTamañoBotones(event.target);
	},
  AchicarTamañoBoton: function(elemento){
    elemento.style.transform  = "scale(0.95)";

	},
	AumentarTamañoBotones: function(elemento){
		elemento.style.transform  = "scale(1)";
	},
  presionar_tecla_es_numero: function(){
      Calculadora.memoria = parseFloat(String(Calculadora.memoria) + String(Calculadora.tecla) );
      Calculadora.display = Calculadora.memoria;
      Calculadora.actualizar_display();
      if (Calculadora.primerNumero && Calculadora.segundoNumero && Calculadora.operacion) {
          Calculadora.segundoNumero = Calculadora.display;
      }
      Calculadora.formatearLongitudNumero();
  },
  presionar_tecla_es_operacion: function(){
      if (Calculadora.display== '0') {
          Calculadora.display== '0';
          Calculadora.resetear_operacion();
      }
      Calculadora.tecla == 'igual'?Calculadora.igual():Calculadora.actualizar_operacion();
      if (Calculadora.display && (!Calculadora.primerNumero) ) {
          Calculadora.primerNumero = Calculadora.display;
          Calculadora.resetear_none();
          Calculadora.resetear_memoria();
      }
      if (Calculadora.display && Calculadora.primerNumero && (!Calculadora.segundoNumero) ) {
          Calculadora.segundoNumero = Calculadora.display;
      }
      if (Calculadora.primerNumero && Calculadora.segundoNumero && Calculadora.operacion) {
          Calculadora.ejecutarOperacion();
      }
  },
  actualizar_display: function(){
    var display = document.getElementById('display');
    display.innerHTML = Calculadora.display;
  },
  resetear_none: function(){
    Calculadora.display = '';
    Calculadora.actualizar_display();
  },
  resetear_display: function(){
    Calculadora.display = '';
    var display = document.getElementById('display');
    display.innerHTML = '0';
  },
  resetear_memoria: function(){
    Calculadora.memoria = '';
  },
  actualizar_operacion: function(){
    Calculadora.operacion = Calculadora.tecla;
  },
  resetear_operacion: function(){
    Calculadora.operacion = '';
  },
  resetear_primerNumero: function(){
    Calculadora.primerNumero = '';
  },
  resetear_segundoNumero: function(){
    Calculadora.segundoNumero = '';
  },
  resetearCalculadora: function(){
    Calculadora.resetear_display();
    Calculadora.resetear_memoria();
    Calculadora.resetear_primerNumero();
    Calculadora.resetear_segundoNumero();
    Calculadora.resetear_operacion();
  },
  operacionPunto: function() {
    if(!(String(Calculadora.display)).includes('.')){
      Calculadora.memoria = Calculadora.memoria + '.';
      Calculadora.display = Calculadora.memoria;
      Calculadora.actualizar_display();
    }
  },
  formatearLongitudNumero: function() {
    Calculadora.display = parseFloat((String(Calculadora.display)).substring(8,0));
    Calculadora.memoria = Calculadora.display;
    Calculadora.actualizar_display();
  },
  ejecutar_operacion_directa: function(){
    switch (Calculadora.tecla) {
      case 'raiz':
        Calculadora.raizCuadrada();
        break;
      case 'signo':
        Calculadora.signo();
        break;
      case 'igual':
        Calculadora.igual();
        break;
      case 'punto':
        Calculadora.punto();
        break;
      case 'On':
        Calculadora.On();
        break;
      default:
        Calculadora.sinAccion();
    }
  },
  ejecutarOperacion: function() {

    switch (Calculadora.operacion) {
      case 'mas':
        Calculadora.sumar();
        break;
      case 'menos':
        Calculadora.resta();
        break;
      case 'por':
        Calculadora.multiplicar();
        break;
      case 'dividido':
        Calculadora.dividir();
        break;
      default:
        Calculadora.sinAccion();
    }
  },
  sumar: function(){
      Calculadora.display = parseFloat(parseFloat(Calculadora.primerNumero) + parseFloat(Calculadora.segundoNumero));
      Calculadora.primerNumero = Calculadora.display;
      Calculadora.resetear_memoria();
      Calculadora.actualizar_display();
      Calculadora.formatearLongitudNumero();
  },
  resta: function(){
    Calculadora.display = parseFloat(parseFloat(Calculadora.primerNumero) - parseFloat(Calculadora.segundoNumero));
    Calculadora.primerNumero = Calculadora.display;
    Calculadora.resetear_memoria();
    Calculadora.actualizar_display();
    Calculadora.formatearLongitudNumero();
  },
  multiplicar: function(){
    Calculadora.display = parseFloat(parseFloat(Calculadora.primerNumero) * parseFloat(Calculadora.segundoNumero));
    Calculadora.primerNumero = Calculadora.display;
    Calculadora.resetear_memoria();
    Calculadora.actualizar_display();
    Calculadora.formatearLongitudNumero();
  },
  dividir: function(){
    Calculadora.display = parseFloat(parseFloat(Calculadora.primerNumero) / parseFloat(Calculadora.segundoNumero));
    Calculadora.primerNumero = Calculadora.display;
    Calculadora.resetear_memoria();
    Calculadora.actualizar_display();
    Calculadora.formatearLongitudNumero();
  },
  raizCuadrada: function(){

  },
  signo: function(){
    Calculadora.display = parseFloat(Calculadora.display) * -1;
    Calculadora.memoria = parseFloat(Calculadora.display);
    Calculadora.actualizar_display();
  },
  punto: function(){
    Calculadora.operacionPunto();
  },
  On: function(){
    Calculadora.resetearCalculadora();
  },
  igual: function(){
    Calculadora.segundoNumero = Calculadora.display;
    Calculadora.resetear_display();
    Calculadora.ejecutarOperacion();
  },
  sinAccion: function(){
  },
}

Calculadora.init();
