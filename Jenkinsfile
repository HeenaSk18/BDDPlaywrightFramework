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
    buildDiscarder(logRotator(numToKeepStr: '20'))
    disableConcurrentBuilds()
    skipDefaultCheckout(true)   // checkout happens once, in the Checkout stage
  }

  stages {
    stage('Checkout') {
      steps {
        // Requires "Pipeline script from SCM" in the job config
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
          if exist test-results rmdir /s /q test-results
          if exist playwright-report rmdir /s /q playwright-report
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
      // Archive first so artifacts are saved even if Allure fails
      archiveArtifacts artifacts: 'test-results/**, playwright-report/**', allowEmptyArchive: true

      script {
        try {
          allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        } catch (Throwable err) {
          // Throwable is required: a missing plugin throws NoSuchMethodError (an Error, not an Exception)
          echo "Allure report step skipped: ${err.getMessage()}"
        }
      }
    }
    cleanup {
      // Optional: remove downloaded browsers/node_modules to save disk space
      // deleteDir()
      echo 'Pipeline finished.'
    }
  }
}
