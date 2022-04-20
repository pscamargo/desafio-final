const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
class Tela {
    static obterCodigoHtml(item){
        return `
        <div class="col-md-3">
            <div class="card" style="width: 50%" onclick="window.verificarSelecao('${item.id}','${item.nome}')">
                <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
            </div>
            <br />
        </div>
        `
    }

    static alterarConteudoHTML(codigoHtml){
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    static gerarStringHTMLPelaImagem(itens){
        //para cada item da lista, vai executar a funcao obterCodigoHtml 
        // ao final, vai concatenar tudo em uma unica string
        // muda de Arraay para String
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens) {
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }

    static configurarBotaoVerificarSelecao(funcaoOnClick){
        window.verificarSelecao = funcaoOnClick
    }

}