function SistemaCarro(){
  codCarro = 0;
  idSimulacao = 0; 
  
  function Carro(mar, mod, ano, cor, pla, valDi, valKm){
    codCarro++;
    this.codigo += codCarro;
    this.marca = mar;
    this.modelo = mod;
    this.ano = ano;
    this.cor = cor;
    this.valorDiaria = valDi || 150.00;
    this.valorKm = valKm || 2.5;
    
    this.placa = (function(str){
        return str.toUpperCase();
    })(pla);
    
    this.toString = function(){
      return this.codigo + ' ' 
      + this.marca + ' ' 
      + this.modelo + ' ' 
      + this.ano + ' ' 
      + this.cor 
      + ' (' + this.placa + ')'
      + this.valorDiaria + ' '
      + this.valorKm + ' ';
    }
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
    this.toString = function(){
      return this.nomeCliente + ' ' + this.opcao;
    }
  }

  function novoCarro(event){
    var carro = new Carro(
      document.getElementById('codigo').value,
      document.getElementById('marca').value,
      document.getElementById('modelo').value,
      document.getElementById('ano').value,
      document.getElementById('cor').value,
      document.getElementById('placa').value,
      document.getElementById('valorDiaria').value,
      document.getElementById('valorKm').value
    );
    carros.push(carro);

    // Salvando em Local Storage
    localStorage.setItem('carroList', JSON.stringify(carros));

    (isEmpty(carro)) ?  alert('Não há carros adicionados') : imprimeListaCarros();
  }

  function novaSimulacao(){
    var simulacao = new Simulacao(
        1,
        document.getElementById('nomeCliente').value,
        document.querySelector('.opcaoSimulacao:checked').value,
        document.getElementById('dateInicio').value,
        document.getElementById('dateFim').value,
        document.getElementById('origem').value,
        document.getElementById('destino').value
    );
    console.log(simulacao);
    adicionaSimulacaoALista(simulacao);

  }

  function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  } 

  function imprimeListaCarros() {
    var lista = document.getElementById('listaCarros');
    lista.textContent = '';
    for (var i=0; i < carros.length; i++) {
      var carro = carros[i];
      var modelo = document.getElementById('listaCarros');
      var copia = modelo.content.firstElementChild.cloneNode(true);
      // copia.querySelector('.marca').textContent.cloneNode(true);
      // copia.querySelector('.modelo').textContent.cloneNode(true);
      // copia.querySelector('.ano').textContent.cloneNode(true);
      // copia.querySelector('.placa').textContent.cloneNode(true);
      // copia.querySelector('.cor').textContent.cloneNode(true);
      // TPC.replaceWithData(copia, carro);
      lista.appendChild(copia);
    }
  }

  function validaCharsPlaca(event){
    var inputPlaca = document.getElementById('placa');
    inputPlaca.value = inputPlaca.value.replace(/[^a-z0-9]/gmi,'');
  }

  function desativarValidacaoDaPlaca() {
    var inputPlaca = document.getElementById('placa');
    inputPlaca.removeEventListener('keyup', function(){
      var inputPlaca = document.getElementById('placa');
      inputPlaca.value = inputPlaca.value.replace(/[^a-z0-9]/gmi,'');
    }, false);
  }

  var carros = [];

  var btnAdicionar = document.getElementById('btnAdicionar');
  btnAdicionar.addEventListener('click', novoCarro, false);

  var inputPlaca = document.getElementById('placa');
  
  inputPlaca.addEventListener('keyup', function(){
    var inputPlaca = document.getElementById('placa');
    inputPlaca.value = inputPlaca.value.replace(/[^a-z0-9]/gmi,'');
  }, false);

  var inputDesativar = document.getElementById('desativaValPlaca');
  inputDesativar.addEventListener('click', desativarValidacaoDaPlaca, false);

  
  // Geolocalização
  function getLocation()
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else
    {
      x.innerHTML="Geolocation is not supported by this browser.";
    }
  }
 
  function showPosition(position)
  {
    var latlon=position.coords.latitude+","+position.coords.longitude;
   
    var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    
    document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";
  }
 
  function showError(error)
  {
    switch(error.code)
    {
      case error.PERMISSION_DENIED:
        x.innerHTML="Usuário rejeitou a solicitação de Geolocalização."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML="Localização indisponível."
        break;
      case error.TIMEOUT:
        x.innerHTML="O tempo da requisição expirou."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML="Algum erro desconhecido aconteceu."
        break;
    }
  }
}
