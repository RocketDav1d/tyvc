export class Assets {
  static Logo = '/assets/logo.svg';
  static LogoDark = '/assets/logo-dark.svg';
  static LogoWithText = '/assets/logo-with-text.png';
  static FundLogoFallback = '/assets/logo.svg';
  static VerifyEmailAnimation = '/assets/signup/verify-email-animation.png';
}

export class PayloadAsset {
  public url: string;

  constructor(public id: string | null) {
    if (!id) {
      this.url = Assets.FundLogoFallback;
    }

    this.url = `${process.env.NEXT_PUBLIC_PAYLOAD_BASE_URL}/files/${id}`;
  }
}
