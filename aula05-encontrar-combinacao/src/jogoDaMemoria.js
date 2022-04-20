class JogoDaMemoria{
    // se mandar um obj = { tela: 1, idade: 2, etc: 3}
    // vai ignorar o resto das propriedades e pegar somente a propriedade tela
    constructor ({ tela }){
        this.tela = tela
        // Caminho do arquivo é sempre relativo ao index.html
        this.heroisIniciais = [
            { img: './arquivos/batman.png', nome: 'batman' },
            { img: './arquivos/flash.png', nome: 'flash' },
            { img: './arquivos/mulher.png', nome: 'mulher' },
            { img: './arquivos/spider.png', nome: 'spider' }
        ]
        this.iconePadrao = './arquivos/padrao.png'
        this.heroisEscondidos = []
        this.heroiSelecionados = []
    }
    // para usar o this, não podemos usar static
    inicializar() {
        // vai pegar todas as funcoes da classe tela!
        // coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        // forca a tela a usar o THIS de Jogo da memoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))

    }

    embaralhar() {
        const copias = this.heroisIniciais
        //duplicar os itens
        .concat(this.heroisIniciais)
        // entrar em cada item e criar um id aleatorio
        .map(item => {
            return Object.assign({}, item, { id: Math.random() / 0.5 })
        })
        .sort(() => Math.random() - 0.5)
        this.tela.atualizarImagens(copias)

        // vamos esperar 1 segundo para atualiar a tela
        setTimeout(() => {
            this.esconderHerois(copias)
        }, 1000);


    }

    esconderHerois(herois){
        // vamos trocar a imagem de todos os herois existentes pelo icone padrao
        // como fizemos no contrutor, vamos extrair somente o necessário

        /* usando a sintaxe ({ chave: 1 }) estamos falando que vamos retornar o que tiver dentro dos parenteses 
           quando nao usamos: (exemplo do id), o JS entende que o nome é o mesmo do valor. Ex. id: id, vira id
        */
        const heroisOcultos = herois.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao

        }))
        //atualizar a tela com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)
        // guardamos os herois para trabalhar com eles depois
        this.heroisOcultos = heroisOcultos

    }

    verificarSelecao(id, nome){
        const item = { id, nome }
        //vamos verificar a quantidade de herois selecionados e tomar acao se escolheu certo ou errado
        const heroiSelecionados = this.heroiSelecionados.length
        switch (heroiSelecionados){
            case 0:
                //adiciona a escolha na lista, esperando pela proxima clicada
                this.heroiSelecionados.push(item)
                break;
            case 1:
                // se a quantidade de escolhidos for 1, significa que o usuario só pode escolher mais um 
                // vamosobter o primeir item da lista
                const [ opcao1 ] = this.heroiSelecionados
                //zerar itens para nao selecionar mais de dois
                this.heroiSelecionados = []
                //conferir se o nome e o id batem conforme o esperado e se sao ids diferentes para o usuario nao clicar duas vezes no mesmo
                if(opcao1.nome === item.nome && opcao1.id !== item.id){
                  alert('combinação correta!' + item.nome)  
                  // para a execução
                  return;
                }
                alert('combinação incorreta!')
                // fim do case
                break;
        }
    }

    jogar(){
        this.embaralhar()
    }
}