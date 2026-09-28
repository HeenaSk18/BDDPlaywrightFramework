# BDD Playwright Framework

A Behavior-Driven Development (BDD) automation framework built with Playwright and Gherkin feature files. It tests a demo e-commerce site (SauceDemo) using page object patterns and reusable step definitions.

## Overview

This project combines:

- Playwright for browser automation
- Cucumber-style Gherkin scenarios in `features/*.feature`
- `playwright-bdd` to generate step execution from feature files
- TypeScript for page objects and step definitions
- Allure reporting for test results

## Tech Stack

- `@playwright/test`
- `playwright-bdd`
- TypeScript
- Allure Playwright
- dotenv

## Project Structure

```text
BDDPlaywrightFramework/
├── features/
│   ├── smoke.feature
│   └── add-to-cart.feature
├── src/
│   ├── fixtures/
│   │   └── bdd-fixtures.ts
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── inventory.page.ts
│   │   └── login.page.ts
│   └── steps/
│       ├── cart.steps.ts
│       └── login.steps.ts
├── utils/
│   └── config.ts
├── env/
├── allure-results/
├── test-results/
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Prerequisites

Before running the tests, install the following:

- Node.js 18+
- npm
- Google Chrome (used by the configured project in Playwright)

## Installation

```bash
npm install
```

## Environment Configuration

The framework loads environment variables from files in the `env/` directory.

Create environment files like:

```bash
mkdir -p env
```

Then add:

- `env/.env.dev`
- `env/.env.staging`

Example:

```env
BASE_URL=https://www.saucedemo.com
```

If `BASE_URL` is not defined, the app defaults to `https://saucedemo.com`.

## Running Tests

The project includes scripts for environment-based execution:

```bash
npm run test:dev
```

```bash
npm run test:staging
```

These commands set the `ENV` variable and execute Playwright tests using the configured BDD setup.

The `pretest` script runs:

```bash
npx bddgen
```

This generates the step/test bindings from the Gherkin feature files before test execution.

## Current Test Coverage

The project currently covers:

- Login validation for locked-out users
- Add-to-cart flow for standard users
- Cart badge count verification
- Checkout completion flow

Example scenarios are defined in:

- `features/smoke.feature`
- `features/add-to-cart.feature`

## Allure Reports

Generate the HTML report:

```bash
npm run allure:generate
```

Open the report in a browser:

```bash
npm run allure:open
```

## Notes

- The test runner is configured in `playwright.config.ts`.
- The application base URL is derived from the active environment configuration in `utils/config.ts`.
- `src/pages` contains reusable page object classes, while `src/steps` holds BDD step definitions.

## Useful Commands

```bash
npx playwright test
npx playwright test --project=chrome
npx bddgen
```

## Author

This project is a sample BDD Playwright framework for automated web testing.
