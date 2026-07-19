import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.manager',
  appName: 'Company Manager',
  webDir: 'dist',
  server: {
    cleartext: true
  }
};

export default config;
