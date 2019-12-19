# monorepo-datapipline-template-ts
Template for a Typescript Monorepo repository with a working AWS-based data pipeline, and minimal config

## Monorepo Goals
To borrow from standardjs:
* No configuration
* Automatically format code
* Catch style issues & programmer errors early

Also:
* Shared toolking: one set of tools to build, test, and deploy
* Sane version management
* Automated testing; local testing
* Serverless microservices as default

## Features

### Language(s)
* Typescript

### Tooling
* bolt? for monorepo management
* ? for dependency management
* gts for typescript, linting, and code formatting defaults?
* Nodejs for server-side javascript execution
* NPM for package management
* AWS CDK for defining infrastructure as code
* AWS Xray for observability
* Jest? for unit testing
* Nock for mocking http
* NYC for test coverage reporting
* aws-sdk-js for interacting with AWS services
* .gitignore for node

### Developer Workflow


### Quality

#### Code Coverage

#### Unit Testing

#### Integration Testing

#### Performance Testing

#### End User Testing

## Commands Used to Create Repo
Assumes nodejs and npm are already installed
```bash
npm install -g bolt yarn
bolt init

# Add a package to the project
mkdir -p packages/module-a
cd packages/module-a
bolt init
bolt add jest typescript @types/node gts --dev
gts init
add "test" to package.json scripts section: "test": "jest"

# Run tests on all projects
bolt workspaces run test

# Watch tests on all projects
bolt workspaces run test -- --watch

```
