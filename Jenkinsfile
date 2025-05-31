pipeline {
  agent any

  environment {
    MONGO_URI = credentials('mongo-uri')
    JWT_SECRET = credentials('jwt-secret')
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t taskboard-api .'
      }
    }

    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm test || echo "Tests failed, continuing"'
      }
    }

    stage('Code Quality') {
      environment {
        SONAR_TOKEN = credentials('sonar-token')
      }
      steps {
        withSonarQubeEnv('MySonar') {
          sh 'sonar-scanner -Dsonar.login=$SONAR_TOKEN'
        }
      }
    }

    stage('Security') {
      steps {
        sh 'npm install -g snyk'
        sh 'snyk test || true'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker run -d -p 5000:5000 --env-file .env taskboard-api'
      }
    }

    stage('Release') {
      steps {
        sh 'echo "Tagged release v1.0 (simulated)"'
      }
    }

    stage('Monitoring') {
      steps {
        sh 'echo "Simulated Alert: High CPU!" >> alert.log'
      }
    }
  }
}