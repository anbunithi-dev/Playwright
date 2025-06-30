# Playwright with TypeScript: Complete Guide

Here's a comprehensive guide to using Playwright with TypeScript, covering all the concepts you mentioned:

## 🚀 Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile device emulation
- Automatic waiting and retries
- Visual regression testing
- API request mocking
- Parallel test execution
- HTML & Allure reporting

## 📦 Prerequisites

- Node.js 16+
- npm/yarn/pnpm
- Git
  

## 1. Setup and Browser Launch

## 🛠️ Installation

```bash
npm init playwright@latest
npm install
```

Then create a basic test file:

```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  expect(await page.title()).toBe('Example Domain');
});
```

## 2. Locators

Playwright provides several ways to locate elements:

```typescript
// By text
await page.locator('text=Submit').click();

// By CSS selector
await page.locator('button#submit').click();

// By XPath
await page.locator('//button[@id="submit"]').click();

// By role
await page.getByRole('button', { name: 'Submit' }).click();

// By label
await page.getByLabel('Username').fill('user1');

// By placeholder
await page.getByPlaceholder('Enter email').fill('test@example.com');

// By test id (data-testid attribute)
await page.getByTestId('submit-button').click();
```

## 3. Working with Radio Buttons

```typescript
// Check if radio is checked
const isChecked = await page.locator('#male-radio').isChecked();

// Select radio button by value
await page.locator('input[name="gender"][value="male"]').check();

// Get selected radio value
const selectedValue = await page.locator('input[name="gender"]:checked').inputValue();
```

## 4. Dropdowns (Select Elements)

```typescript
// Select by value
await page.locator('#country-select').selectOption('us');

// Select by label
await page.locator('#country-select').selectOption({ label: 'United States' });

// Get selected value
const selectedCountry = await page.locator('#country-select').inputValue();

// Get all options
const options = await page.locator('#country-select option').all();
for (const option of options) {
  console.log(await option.textContent());
}
```

## 5. Checkboxes

```typescript
// Check a checkbox
await page.locator('#terms-checkbox').check();

// Uncheck a checkbox
await page.locator('#newsletter-checkbox').uncheck();

// Verify checkbox state
const isChecked = await page.locator('#terms-checkbox').isChecked();
```

## 6. Handling Alerts, Prompts, and Confirmations

```typescript
// Alert dialog
page.on('dialog', async (dialog) => {
  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toBe('This is an alert');
  await dialog.accept();
});
await page.locator('#alert-button').click();

// Confirmation dialog
page.on('dialog', async (dialog) => {
  expect(dialog.type()).toBe('confirm');
  await dialog.accept(); // or dialog.dismiss() to cancel
});
await page.locator('#confirm-button').click();

// Prompt dialog
page.on('dialog', async (dialog) => {
  expect(dialog.type()).toBe('prompt');
  await dialog.accept('John Doe'); // Provide input
});
await page.locator('#prompt-button').click();
```

## 7. Working with Child Windows and Tabs

```typescript
// Open a new tab/window
const [newPage] = await Promise.all([
  page.waitForEvent('popup'),
  page.locator('#open-new-tab').click()
]);

// Work with the new page
await newPage.locator('#some-element').click();
await newPage.close();

// Switch between tabs
const pages = context.pages(); // Get all open pages
await pages[1].bringToFront();
```

## 8. Working with Iframes

```typescript
// Locate iframe
const frame = page.frameLocator('#payment-iframe');

// Interact with elements inside iframe
await frame.locator('#credit-card-number').fill('4111111111111111');
await frame.locator('#exp-date').fill('12/25');
await frame.locator('#submit-payment').click();

// Alternative approach
const iframeElement = await page.$('#payment-iframe');
const iframe = await iframeElement.contentFrame();
await iframe.fill('#credit-card-number', '4111111111111111');
```

## 9. Additional Useful Methods

```typescript
// Get text content
const text = await page.locator('.message').textContent();

// Get attribute value
const href = await page.locator('a').getAttribute('href');

// Get all matching elements
const buttons = await page.locator('button').all();
for (const button of buttons) {
  console.log(await button.textContent());
}

// Wait for element
await page.locator('#dynamic-element').waitFor();

// Take screenshot
await page.screenshot({ path: 'screenshot.png' });

// Handle file uploads
await page.locator('#file-upload').setInputFiles('path/to/file.txt');
```

## 10. Configuration (playwright.config.ts)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
```

