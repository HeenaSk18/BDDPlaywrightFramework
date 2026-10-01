pipeline {
  agent any

  tools {
    nodejs 'NodeJS'
  }

  environment {
    CI = 'true'
    PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\pw-browsers"
  }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/HeenaSk18/BDDPlaywrightFramework.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'node -v && npm -v'
        bat 'npm ci'
      }
    }

    stage('Install Browser') {
      steps {
        bat 'npx playwright install chromium'
      }
    }

    stage('Prepare Env File') {
      steps {
        bat '''
          if not exist env mkdir env
          echo BASE_URL=https://www.saucedemo.com> env\\.env.dev
        '''
      }
    }

    stage('Clean Old Results') {
      steps {
        bat '''
          if exist allure-results rmdir /s /q allure-results
          if exist allure-report rmdir /s /q allure-report
        '''
      }
    }

    stage('Run Tests') {
      steps {
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
          bat 'npm run test:dev'
        }
      }
    }
  }

  post {
    always {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
    }
    success {
      echo 'Build successful: all tests passed.'
    }
    unstable {
      echo 'Build finished, but some tests failed. Check the Allure report.'
    }
  }
}