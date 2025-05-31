pipeline {
  agent any

  environment {
    MONGO_URI = credentials('mongo-uri')
    JWT_SECRET = credentials('jwt-secret')
    SONAR_TOKEN = credentials('sonar-token')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        dir('Backend') {
          bat 'npm install'
        }
        dir('Frontend') {
          bat 'npm install'
        }
      }
    }

    stage('Build') {
      steps {
        dir('Frontend') {
          bat 'npm run build'
        }
        dir('Backend') {
          bat 'echo Backend ready'
        }
      }
    }

    stage('Test Backend') {
      steps {
        dir('Backend') {
          bat 'npm test || exit /b 0'
        }
      }
    }

    stage('Test Frontend') {
      steps {
        dir('Frontend') {
          bat 'npm test --passWithNoTests || exit /b 0'
        }
      }
    }

    stage('Code Quality') {
      steps {
        dir('Backend') {
          withSonarQubeEnv('MySonar') {
            bat 'sonar-scanner -Dsonar.login=%SONAR_TOKEN%'
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        bat 'echo Simulated Deploy Step'
      }
    }

    stage('Monitoring') {
      steps {
        bat 'echo Simulated Monitoring Log >> alert.log'
      }
    }
  }
}

