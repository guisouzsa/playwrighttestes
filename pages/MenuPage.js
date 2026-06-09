export class MenuPage {
  constructor(page) {
    this.page = page;
  }

  async irParaAreas() {
    await this.page.goto('https://app.avaliei.com.br/areas', { waitUntil: 'domcontentloaded' });
  }

  async irParaDisciplinas() {
    await this.page.goto('https://app.avaliei.com.br/disciplinas', { waitUntil: 'domcontentloaded' });
  }

  async irParaConteudos() {
    await this.page.goto('https://app.avaliei.com.br/conteudos', { waitUntil: 'domcontentloaded' });
  }

  async irParaCursos() {
    await this.page.goto('https://app.avaliei.com.br/cursos', { waitUntil: 'domcontentloaded' });
  }

  async irParaTurmas() {
    await this.page.goto('https://app.avaliei.com.br/turmas', { waitUntil: 'domcontentloaded' });
  }

  async irParaQuestoes() {
    await this.page.goto('https://app.avaliei.com.br/questoes', { waitUntil: 'domcontentloaded' });
  }

  async irParaRedacoes() {
    await this.page.goto('https://app.avaliei.com.br/redacoes', { waitUntil: 'domcontentloaded' });
  }

  async irParaGruposDeCorrecao() {
    await this.page.goto('https://app.avaliei.com.br/grupos-de-correcao', { waitUntil: 'domcontentloaded' });
  }

  async irParaAvaliacoes() {
    await this.page.goto('https://app.avaliei.com.br/avaliacoes', { waitUntil: 'domcontentloaded' });
  }
}