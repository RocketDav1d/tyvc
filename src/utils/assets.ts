export class Assets {
  static Logo = '/assets/logo.svg';
  static LogoDark = '/assets/logo-dark.svg';
  static LogoWithText = '/assets/logo-with-text.png';
  static FundLogoFallback = '/assets/logo.svg';
  static HeaderImageFallback = '/assets/header-fallback.svg';
  static VerifyEmailAnimation = '/assets/signup/verify-email-animation.png';
}

export class PayloadAsset {
  static fromFilename(filename: string | null, fallback?: string) {
    if (filename) {
      return `${process.env.NEXT_PUBLIC_PAYLOAD_BASE_URL}/files/${filename}`;


    }
    return fallback ? fallback : Assets.FundLogoFallback;

  }
}
