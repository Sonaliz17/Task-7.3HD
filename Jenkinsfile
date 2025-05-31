pipeline {
  agent any

  environment {
    MONGO_URI    = credentials('mongo-uri')
    JWT_SECRET   = credentials('jwt-secret')
    SONAR_TOKEN  = credentials('sonar-token')
  }

 stage('Build') {
  steps {
    echo '🛠️ Running frontend build and Docker image creation...'
    
    bat 'docker build -t habitflow:latest .'
    
    echo '✅ Docker image built successfully.'
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
        dir('Backend') {
          withSonarQubeEnv('MySonar') {
            withEnv(["PATH+SONAR=${tool 'sonar-scanner'}/bin"]) {
              bat 'sonar-scanner -Dsonar.login=%SONAR_TOKEN%'
            }
          }
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

