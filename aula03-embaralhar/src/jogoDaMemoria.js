class JogoDaMemoria{
    // se mandar um obj = { tela: 1, idade: 2, etc: 3}
    // vai ignorar o resto das propriedades e pegar somente a propriedade tela
    constructor ({ tela }){
        this.tela = tela
        // Caminho do arquivo é sempre relativo ao index.html
        this.heroisIniciais = [
            { img: './arquivos/batman.png', name: 'batman' },
            { img: './arquivos/flash.png', name: 'flash' },
            { img: './arquivos/mulher.png', name: 'mulher' },
            { img: './arquivos/spider.png', name: 'spider' }
        ]
    }
    // para usar o this, não podemos usar static
    inicializar() {
        // vai pegar todas as funcoes da classe tela!
        // coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        // forca a tela a usar o THIS de Jogo da memoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
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
    }

    jogar(){
        this.embaralhar()
    }
}