pipeline {
  agent any

  environment {
    CI = 'true'
    PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\pw-browsers"
    PATH = "C:\\Program Files\\nodejs;${env.PATH}"
  }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Check Tools') {
      steps {
        bat 'node -v'
        bat 'npm -v'
      }
    }

    stage('Install Dependencies') {
      steps {
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
  }
}