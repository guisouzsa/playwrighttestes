import { TOTP } from 'totp-generator';

export class TotpPage {
  constructor(page) {
    this.page = page;
    this.otpInput  = page.getByRole('textbox', { name: 'Código de verificação de 6 dí' });
    this.verifyBtn = page.getByRole('button',  { name: 'Verificar código de autentica' });
  }

  async generateCode(secret) {
    const epoch     = Math.floor(Date.now() / 1000);
    const remaining = 30 - (epoch % 30);
    if (remaining < 5) {
      await new Promise(resolve => setTimeout(resolve, (remaining + 1) * 1000));
    }
    const { otp } = await TOTP.generate(secret);
    return otp;
  }

  async completeTotp(secret) {
    await this.otpInput.waitFor({ state: 'visible' });
    const code = await this.generateCode(secret);
    await this.otpInput.fill(String(code));
    await this.verifyBtn.click();
  }
}