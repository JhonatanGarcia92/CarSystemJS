// Autor: Carlos Nantes
var SIMULACAO = (function(){
    var modulo = {};
  
    var Storage  = window.localStorage;

    modulo._carros = [];
    modulo._simulacoes = [];
    modulo._idSimulacao = 0;

    modulo.simulacaoFactory = function (codCarro, cliNome, op, dtInicio, dtFim, ori, dst){
        modulo._idSimulacao++;
        simulacao = {}
        simulacao.id = modulo._idSimulacao;
        simulacao.carroEscolhido = codCarro;
        simulacao.nomeCliente = cliNome;
        simulacao.opcao = op;
        simulacao.dateInicio = dtInicio;
        simulacao.dateFim = dtFim;
        simulacao.origem = ori;
        simulacao.destino = dst;
        simulacao.toString = function(){
          return this.nomeCliente + ' ' + this.opcao;
        };
        return simulacao;
    };
    
    modulo.carregaDoLocalStorage = function(){
        var simulacoesList = Storage.getItem('simulacoes');
        if (simulacoesList!=null) {
          modulo._simulacoes = JSON.parse(simulacoesList);
        }
        var idSimulacao = Storage.getItem('idSimulacao');
        if(idSimulacao !== null){
            modulo._idSimulacao = idSimulacao;
        }
    };

    modulo.init = function(carros){
        modulo._carros = carros;
        modulo.carregaDoLocalStorage();

        var abaSimulacao = document.getElementById('abaSimulacao');
        abaSimulacao.addEventListener('click', modulo.carregaTelaSimulacao);
    };

    modulo.carregaTelaSimulacao = function(){
        modulo.limpaFormSimulacao();
        modulo.mostraCarrosNaTela();
        modulo.mostraSimulacoesNatela();
        modulo.carregaEventos();
        document.getElementById('btnAdicionarSimulacao').classList.remove('hide');
        document.getElementById('btnSalvarSimulacao').classList.add('hide');
        document.getElementById('btnCancelarSimulacao').classList.add('hide');
    };
    
    modulo.mostraCarrosNaTela = function(){
        console.log('mostraCarrosNaTela');
        var lista = document.getElementById('carroEscolhido');
        lista.textContent = '';
        for (var i = 0; i < modulo._carros.length; i++) {
            var carro = modulo._carros[i];
            var modelo = document.getElementById('opcoesCarro');
            var copia = modelo.content.firstElementChild.cloneNode(true);
            copia.value = carro.codigo;
            TPC.replaceWithData(copia, carro);
            lista.appendChild(copia);
        }
    };

    modulo.carregaEventos = function(){
        var btnAdicionarSimulacao = document.getElementById('btnAdicionarSimulacao');
        btnAdicionarSimulacao.addEventListener('click', modulo.clickAdicionarSimulacao);

        var btnSalvarSimulacao = document.getElementById('btnSalvarSimulacao');
        btnSalvarSimulacao.addEventListener('click', modulo.clickSalvarSimulacao);

        var btnCancelarSimulacao = document.getElementById('btnCancelarSimulacao');
        btnCancelarSimulacao.addEventListener('click', modulo.clickCancelarSimulacao);
    };

    modulo.clickAdicionarSimulacao = function(evento){
        console.log('clickAdicionarSimulacao');
        evento.preventDefault();
        var simulacao = modulo.novaSimulacao();
        modulo.adicionarSimulacao(simulacao);
        modulo.limpaFormSimulacao();
        modulo.mostraSimulacoesNatela();
    };

    modulo.clickExcluirSimulacao = function(evento){
        console.log('clickExcluirSimulacao');
        evento.preventDefault();
        idDaLista = modulo._descobreIdNoArrayDeSimulacoes(evento);
        modulo.excluirSimulacao(idDaLista);
        modulo.mostraSimulacoesNatela();
    };

    modulo.clickEditarSimulacao = function(evento){
        console.log('clickEditarSimulacao');
        evento.preventDefault();
        idDaLista = modulo._descobreIdNoArrayDeSimulacoes(evento);
        simulacaoEscolhida = modulo._simulacoes[idDaLista];
        modulo.carregarSimulacaoNoForm(simulacaoEscolhida);
        modulo._idListaDaSimulacaoEscolhida = idDaLista;
        document.getElementById('btnAdicionarSimulacao').classList.add('hide');
        document.getElementById('btnSalvarSimulacao').classList.remove('hide');
        document.getElementById('btnCancelarSimulacao').classList.remove('hide');
    };

    modulo.clickCancelarSimulacao = function(evento){
        console.log('clickCancelarSimulacao');
        evento.preventDefault();
        modulo.limpaFormSimulacao();
        document.getElementById('btnAdicionarSimulacao').classList.remove('hide');
        document.getElementById('btnSalvarSimulacao').classList.add('hide');
        document.getElementById('btnCancelarSimulacao').classList.add('hide');
    };  

    modulo.clickSalvarSimulacao = function(evento){
        console.log('clickSalvarSimulacao');
        evento.preventDefault();
        modulo.salvarEdicao();
        modulo.limpaFormSimulacao();
        modulo.mostraSimulacoesNatela();
        document.getElementById('btnAdicionarSimulacao').classList.remove('hide');
        document.getElementById('btnSalvarSimulacao').classList.add('hide');
        document.getElementById('btnCancelarSimulacao').classList.add('hide');
    };

    modulo.salvarEdicao = function(){
        idDaLista = modulo._idListaDaSimulacaoEscolhida;
        simulacao = modulo._simulacoes[idDaLista];
        simulacao.carroEscolhido =document.getElementById('carroEscolhido').value;
        simulacao.nomeCliente = document.getElementById('nomeCliente').value;
        simulacao.opcao = document.querySelector('.opcaoSimulacao:checked').value;
        simulacao.dateInicio = document.getElementById('dateInicio').value;
        simulacao.dateFim = document.getElementById('dateFim').value;
        simulacao.origem = document.getElementById('origem').value;
        simulacao.destino = document.getElementById('destino').value;
    };

    modulo._descobreIdNoArrayDeSimulacoes = function(evento){
        tdRow = evento.target.parentNode.parentNode.querySelector('.row');
        idDaLista = parseInt( tdRow.innerText ) - 1;
        return idDaLista;
    };

    modulo.mostraSimulacoesNatela = function(){
        var lista = document.getElementById('tblistaSimulacao');
        lista.textContent = '';
        for (var i = 0; i < modulo._simulacoes.length; i++) {
            var simulacao = modulo._simulacoes[i];
            var modelo = document.getElementById('listaSimulacao');
            var copia = modelo.content.firstElementChild.cloneNode(true);
            TPC.replaceWithData(copia, simulacao);
            copia.querySelector('.row').innerText = i + 1;
            copia.querySelector('.btnEditarSimulacao').addEventListener('click', modulo.clickEditarSimulacao);
            copia.querySelector('.btnExcluirSimulacao').addEventListener('click', modulo.clickExcluirSimulacao);
            lista.appendChild(copia);
        }
    };

    modulo.limpaFormSimulacao = function(){
        document.getElementById('nomeCliente').value = '';
        document.getElementById('carroEscolhido').selectedIndex = 0;
        document.getElementById('opcoes').checked = true;
        document.getElementById('opcoesKm').checked = false;
        document.getElementById('dateInicio').value = '';
        document.getElementById('dateFim').value = '';
        document.getElementById('origem').value = '';
        document.getElementById('destino').value = '';
    };

    modulo.novaSimulacao = function() {
        var simulacao = modulo.simulacaoFactory(
            document.getElementById('carroEscolhido').value,
            document.getElementById('nomeCliente').value,
            document.querySelector('.opcaoSimulacao:checked').value,
            document.getElementById('dateInicio').value,
            document.getElementById('dateFim').value,
            document.getElementById('origem').value,
            document.getElementById('destino').value
        );
        return simulacao;
    };

    modulo.carregarSimulacaoNoForm = function(simulacao){        
        document.getElementById('carroEscolhido').value = simulacao.carroEscolhido;
        document.getElementById('nomeCliente').value = simulacao.nomeCliente;
        if( simulacao.opcao == 'dias' ){
            document.getElementById('opcao').checked = true;
        }
        if( simulacao.opcao == 'km' ){
            document.getElementById('opcaoKm').checked = true;
        }
        document.getElementById('dateInicio').value = simulacao.dateInicio;
        document.getElementById('dateFim').value = simulacao.dateFim
        document.getElementById('origem').value = simulacao.origem ;
        document.getElementById('destino').value = simulacao.destino;
    };

    modulo.excluirSimulacao = function(idDaLista){
        modulo._simulacoes.splice(idDaLista, 1);
        Storage.setItem('simulacoes', JSON.stringify(modulo._simulacoes));
    };

    modulo.adicionarSimulacao = function(simulacao){
        modulo._simulacoes.push(simulacao);
        Storage.setItem('simulacoes', JSON.stringify(modulo._simulacoes));
        Storage.setItem('idSimulacao', JSON.stringify(modulo._idSimulacao));
    };


    return modulo;
})();