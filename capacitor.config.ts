import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.banconexion',
  appName: 'Banconexión',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  android: {
    adjustMarginsForEdgeToEdge: 'disable',
  },
  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystembars: true,
      statusBarColor: '#00FFFFFF',
      navigationBarColor: '#00FFFFFF',
    },
  },
};

export default config;
