pipeline {
  agent any

  tools {
    nodejs 'NodeJS'
  }

  environment {
    CI = 'true'
  }

  options {
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm ci'
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

    stage('Run Tests') {
      steps {
        bat 'npm run test:dev'
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