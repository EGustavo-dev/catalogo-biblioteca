const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: '.',
  testMatch: 'mobile.spec.js',
  timeout: 45000,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4173', serviceWorkers: 'block', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: {
    command: 'python3 -m http.server 4173 --directory ../../site',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false
  },
  projects: [
    { name: 'celular-320', use: { viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true } },
    { name: 'celular-390', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'tablet-768', use: { viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true } }
  ]
});
