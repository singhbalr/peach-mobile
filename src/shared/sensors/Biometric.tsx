import FingerprintScanner from "react-native-fingerprint-scanner";

export const authBiometrics = async () => {
  try {
    await FingerprintScanner.authenticate({
      title: "Log in with Biometrics",
    });

    FingerprintScanner.release();

    return true;
  } catch (error) {
    FingerprintScanner.release();
    return false;
  }
};
