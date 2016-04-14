var AppCarro = (function SistemaCarro(){

  var app = {};
  var codCarro = 0;
  var carros = [];
  var Storage = window.localStorage;

  function Carro(fab, mod, ano, cor, pla, vlrdia, vlrkm){
    codCarro++;
    this.codigo = codCarro;
    this.fabricante = fab;
    this.modelo = mod;
    this.ano = ano;
    this.cor = cor;
    this.valorDiari = vlrdia || 150.00;
    this.valorKm = vlrkm || 2.5;
    this.placa = (function(str){
      return str.toUpperCase();
    })(pla);
  }

  function novoCarro(event){
    var carro = new Carro(
        document.getElementById('fabricante').value,
        document.getElementById('modelo').value,
        document.getElementById('ano').value,
        document.getElementById('cor').value,
        document.getElementById('placa').value,
        document.getElementById('valorDiaria').value,
        document.getElementById('valorKm').value
    );
    carros.push(carro);
    Storage.setItem('carrosList', JSON.stringify(carros));
    imprimeListaCarros();
    event.preventDefault();
  }

  function imprimeListaCarros() {
    var lista = document.getElementById('tblistaCarros');
    lista.textContent = '';
    for (var i = 0; i < carros.length; i++) {
      var carro = carros[i];
      var modelo = document.getElementById('listaCarros');
      var copia = modelo.content.firstElementChild.cloneNode(true);
      TPC.replaceWithData(copia, carro);
      lista.appendChild(copia);
    }
  }

  function validaCharsPlaca(){
    var inputPlaca = document.getElementById('placa');
    inputPlaca.value = inputPlaca.value.replace(/[^a-z0-9]/gmi,'');
  }

  function desativarValidacaoDaPlaca() {
    var inputPlaca = document.getElementById('placa');
    inputPlaca.removeEventListener('keyup', validaCharsPlaca, false);
  }

  function init(){
    var carrosList = Storage.getItem('carrosList');
    if (carrosList!==null) {
      carros = JSON.parse(carrosList);
      imprimeListaCarros();
    } else {
      carros = [];
    }
    var btnAdicionar = document.getElementById('btnAdicionar');
    btnAdicionar.addEventListener('click', novoCarro);
    var inputPlaca = document.getElementById('placa');
    inputPlaca.addEventListener('keyup', validaCharsPlaca, false);
  }

  app.init = function(){
    console.log('AppCarro.init');
    init();
  };
  app.getCarros = function(){
    console.log('AppCarro.getCarros');
    return carros;
  };

  return app;

})();
