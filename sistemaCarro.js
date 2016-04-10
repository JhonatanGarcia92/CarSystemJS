var AppCarro = (function SistemaCarro(){

  var app = {};
  var codCarro = 0;
  var idSimulacao = 0;
  var Storage = window.localStorage;

  function Carro(fab, mod, ano, cor, pla, vlrdia, vlrkm){
    codCarro++;
    this.codigo = codCarro;
    this.fabricante = fab;
    this.modelo = mod;
    this.ano = ano;
    this.cor = cor;
    this.valorDiaria = vlrdia || 150.00;
    this.valorKm = vlrkm || 2.5;
    this.placa = (function(str){
      return str.toUpperCase();
    })(pla);
    /*
     this.toString = function(){
     return this.fabricante + ' ' + this.modelo + ' ' + this.ano + ' ' + this.cor + ' (' + this.placa + ')';
     };
     */
  }

  function Simulacao(codCarro, cliNome, op, dtInicio, dtFim, ori, dst){
    idSimulacao++;
    this.id = idSimulacao;
    this.carroEscolhido = codCarro;
    this.nomeCliente = cliNome;
    this.opcao = op;
    this.dateInicio = dtInicio;
    this.dateFim = dtFim;
    this.origem = ori;
    this.destino = dst;
    // this.toString = function(){
    //   return this.nomeCliente + ' ' + this.opcao;
    // };
  }

  function novoCarro(event){
    var carro = new Carro(
        document.getElementById('codigo').value,
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
    alert("Registro adicionado.");
    imprimeListaCarros();
    event.preventDefault();
  }

  function novaSimulacao(event){
    var simulacao = new Simulacao(
        document.getElementById('carroEscolhido').value,
        document.getElementById('nomeCliente').value,
        document.querySelector('.opcaoSimulacao:checked').value,
        document.getElementById('dateInicio').value,
        document.getElementById('dateFim').value,
        document.getElementById('origem').value,
        document.getElementById('destino').value
    );
    adicionaSimulacaoALista(simulacao);
    Storage.setItem('carrosList', JSON.stringify(carros));
    event.preventDefault();
  }

  function excluirSimulacao(simulacao) {
    // body...
  }

  function editarSimulacao(simulacao) {

  }

  function editarCarro() {
    evento.preventDefault();
    for (var i=0;i<carros.length; i++) {
      var idCodCarro = parseInt(evento.target.parentNode.parentNode.firstElementChild.firstChild.nodeValue);
      if (carros[i].codigo == idCodCarro) {

        carros[i].codigo = document.getElementById('codigo').value,
            carros[i].fabricante = document.getElementById('fabricante').value,
            carros[i].modelo = document.getElementById('modelo').value,
            carros[i].ano = document.getElementById('ano').value,
            carros[i].cor = document.getElementById('cor').value,
            carros[i].placa = document.getElementById('placa').value,
            carros[i].valorDiaria = document.getElementById('valorDiaria').value,
            carros[i].valorKm = document.getElementById('valorKm').value
        break;
      }
    }
    Storage.setItem('carrosList', JSON.stringify(carros));
    imprimeListaCarros();
  }

  function excluirCarro(evento) {
    // evento.preventDefault();
    // for (var i=0;i<carros.length; i++) {
    //   var idCodCarro = parseInt(evento.target.parentNode.parentNode.firstElementChild.firstChild.nodeValue);
    //   if ( carros[i].codigo == idCodCarro){
    //     carros.pop(i);
    //     break;
    //   }
    // }
    //
    // Storage.setItem('carrosList', JSON.stringify(carros));
    // imprimeListaCarros();

    carros.splice(indice_selecionado, 1);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro excluído.");
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

  function adicionaSimulacaoALista(simulacao){
    var lista = document.getElementById('tblistaSimulacao');
    lista.textContent = '';
    for (var i = 0; i < carros.length; i++) {
      var carro = carros[i];
      var modelo = document.getElementById('listaSimulacao');
      var copia = modelo.content.firstElementChild.cloneNode(true);
      TPC.replaceWithData(copia, carro);
      lista.appendChild(copia);
    }
  }

  function validaCharsPlaca(){
    //console.log(event);
    //console.log(event.keyCode);
    var inputPlaca = document.getElementById('placa');
    inputPlaca.value = inputPlaca.value.replace(/[^a-z0-9]/gmi,'');
  }

  function desativarValidacaoDaPlaca() {
    var inputPlaca = document.getElementById('placa');
    inputPlaca.removeEventListener('keyup', validaCharsPlaca, false);
  }

  var carros = [];
  var simulacoes = [];

  function init(){
    var carrosList = Storage.getItem('carrosList');

    if (carrosList!==null) {
      carros = JSON.parse(carrosList);
      maiorId = -1;
      for (var i = 0; i < carros.length; i++) {
        if( carros[i].codigo > maiorId ) {
          maiorId = carros[i].codigo;
        }
      }
      codCarro = maiorId;
      imprimeListaCarros();
    } else {
      carros = [];
    }

    SIMULACAO.init(carros);



    var btnAdicionar = document.getElementById('btnAdicionar');
    btnAdicionar.addEventListener('click', novoCarro);


    // var btnEditar = document.getElementsByClassName('btnEditar');
    // btnEditar.addEventListener('click', editarCarro);

    var btnExcluir = document.getElementsByClassName('btnExcluir');
    for (var i=0; i<btnExcluir.length; i++) {
      btnExcluir[i].addEventListener('click', excluirCarro);
    }



    var inputPlaca = document.getElementById('placa');
    inputPlaca.addEventListener('keyup', validaCharsPlaca, false);

    // var inputDesativar = document.getElementById('desativaValPlaca');
    // inputDesativar.addEventListener('keyup', desativarValidacaoDaPlaca);
  }

  app.init = function(){
    console.log('AppCarro.init');
    init();
  };
  app.getCatalog = function(){
    console.log('AppCarro.getCatalog');
    return carros;
  };

  return app;

})();
