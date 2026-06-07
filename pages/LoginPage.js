export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput    = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton   = page.getByRole('button', { name: 'Entrar' });
  }

  async goto() {
    await this.page.goto('https://app.avaliei.com.br/login');
    await this.emailInput.waitFor({ state: 'visible' });
  }

  async fillCredentials(email, password) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async login(email, password) {
    await this.goto();
    await this.fillCredentials(email, password);
    await this.submit();
  }
}