import type { CapacitorConfig } from '@capacitor/cli';

// Configuração pronta para empacotar o build web (dist/) como app nativo.
// As plataformas ainda NÃO foram adicionadas nesta fase. Quando for a hora:
//   npm run build && npx cap add ios && npx cap add android && npx cap sync
// Regra herdada do Aerogestor: mudou JS? `npm run build && npx cap sync`
// é obrigatório, pois o WebView é embedado no binário.
const config: CapacitorConfig = {
  appId: 'br.com.educare.app',
  appName: 'Educare',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
    backgroundColor: '#FFFFFF',
  },
  android: {
    backgroundColor: '#FFFFFF',
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#FFFFFF',
      showSpinner: false,
    },
  },
};

export default config;
