import type { Config } from 'jest'
import { defaults } from 'jest-config'

const config: Config = {
  displayName: 'google-maps-generator',
  verbose: true,
  modulePaths: ['<rootDir>/src', '<rootDir>/types'],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, '.ts', '.d.ts'],
  rootDir: '.',
  roots: ['<rootDir>'],
  forceExit: true,
  openHandlesTimeout: 1000,
  setupFiles: ['<rootDir>/test/env/set-env-vars.ts'],
  transform: {
    '^.+\\.(j|t)s$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  preset: 'jest-puppeteer',

  reporters: ['default'],

  globalSetup: './test/setup/global-setup.ts',
  globalTeardown: './test/setup/global-teardown.ts',
  testEnvironment: './test/env/puppeteer-environment.ts',
}

export default config
