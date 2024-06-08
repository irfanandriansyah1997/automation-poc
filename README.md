# Playwright Automation

This repository contains a automation UI for fithub internal and external websites.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (>= v20.x.x)
- yarn

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:irfanandriansyah1997/automation-poc.git
    ```

2. Navigate to the project directory:

    ```bash
    cd automation-poc
    ```

3. Install the dependencies & setup the prerequisite setup:

    ```bash
    yarn run setup
    ```

## How to run

Currently, we only provide automated tests for payment gateways and fhad mobile sites. You can execute the following command on your local machine:
1. **Fithub Mobile Website**

    ```bash
    yarn run test:dashboard-mobile
    ```

2) **Payment Gateway**

    ```bash
    yarn run test:payment-gateway
    ```

Feel free to add further automation tests for different websites and verify you have previously added the command on `package.json` and `.github/workflows/automation-testing-runner.yml` since we have already set up github action for enabling running manually automation using github action.