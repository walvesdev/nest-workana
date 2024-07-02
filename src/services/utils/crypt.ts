export class Crypt {
  private static secret = '1q2w3E*';

  static async Encrypt(password: string): Promise<string> {
    const { createHmac } = require('node:crypto');
    return createHmac('sha256', this.secret).update(password).digest('hex');
  }
}
