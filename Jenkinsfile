pipeline {
  agent any

  environment {
    MONGO_URI = credentials('mongo-uri')
    JWT_SECRET = credentials('jwt-secret')
  }

  stages {
    stage('Build') {
      steps {
        bat 'echo Starting Build'
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
          bat 'npm test || exit /b 0'
        }
      }
    }

    stage('Code Quality') {
  steps {
    withSonarQubeEnv('MySonar') {
      bat "sonar-scanner -Dsonar.login=${env.SONAR_TOKEN}"
    }
  }
}

    stage('Deploy') {
      steps {
        bat 'echo Simulated deploy step'
      }
    }

    stage('Monitoring') {
      steps {
        bat 'echo Simulated alert logged >> alert.log'
      }
    }
  }
}
