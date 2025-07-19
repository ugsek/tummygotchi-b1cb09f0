import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.229d87c9dedb4e7b81f7dbd41fcf34ea',
  appName: 'tummygotchi',
  webDir: 'dist',
  server: {
    url: 'https://229d87c9-dedb-4e7b-81f7-dbd41fcf34ea.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;