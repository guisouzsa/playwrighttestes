export class MenuPage {
    constructor(page) {
        this.page = page;
    }

    async irParaAreas() {
        await this.page.goto('https://app.avaliei.com.br/areas');
    }

    async irParaDisciplinas() {
        await this.page.goto('https://app.avaliei.com.br/disciplinas');
    }

    async irParaConteudos() {
        await this.page.goto('https://app.avaliei.com.br/conteudos');
    }

    async irParaCursos() {
        await this.page.goto('https://app.avaliei.com.br/cursos');
    }

    async irParaTurmas() {
        await this.page.goto('https://app.avaliei.com.br/turmas');
    }

    async irParaQuestoes() {
        await this.page.goto('https://app.avaliei.com.br/questoes');
    }

    async irParaRedacoes() {
        await this.page.goto('https://app.avaliei.com.br/redacoes');
    }

    async irParaGruposDeCorrecao() {
        await this.page.goto('https://app.avaliei.com.br/grupos-de-correcao');
    }

    async irParaAvaliacoes() {
        await this.page.goto('https://app.avaliei.com.br/avaliacoes');
    }
}