pipeline {
  agent any

  environment {
    MONGO_URI = credentials('mongo-uri')
    JWT_SECRET = credentials('jwt-secret')
  }

  stages {
    stage('Build') {
      steps {
        bat 'echo Building (replace with docker build command if needed)'
      }
    }

    stage('Test') {
      steps {
        bat 'npm install'
        bat 'npm test || exit /b 0'
      }
    }

    stage('Code Quality') {
      environment {
        SONAR_TOKEN = credentials('sonar-token')
      }
      steps {
        withSonarQubeEnv('MySonar') {
          bat 'sonar-scanner -Dsonar.login=%SONAR_TOKEN%'
        }
      }
    }

    stage('Deploy') {
      steps {
        bat 'echo Simulating deployment (replace with real deploy)'
      }
    }

    stage('Monitoring') {
      steps {
        bat 'echo Simulated alert >> alert.log'
      }
    }
  }
}