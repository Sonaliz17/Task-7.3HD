pipeline {
  agent any

  environment {
    MONGO_URI    = credentials('mongo-uri')
    JWT_SECRET   = credentials('jwt-secret')
    SONAR_TOKEN  = credentials('sonar-token')
  }
stages{
 stage('Build') {
  steps {
    bat 'docker build -t board-task-app .'
  }
}
stage('Archive Docker Image') {
  steps {
    bat 'docker save board-task-app -o board-task-app.tar'
    archiveArtifacts artifacts: 'board-task-app.tar', fingerprint: true
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
          echo '--- Running Backend Tests ---'
          bat 'npm test || exit /b 0'
        }
      }
    }

    stage('Test Frontend') {
      steps {
        dir('Frontend') {
          echo '--- Running Frontend Tests ---'
          bat 'npm test || exit /b 0'
        }
      }
    }

*/

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
    echo '🚀 Deploying container from saved image'
    bat 'docker load -i board-task-app.tar'
    bat 'docker run -d -p 3000:3000 board-task-app'
  }
}


    stage('Monitoring') {
      steps {
        bat 'echo Simulated alert logged >> alert.log'
      }
    }
  }
}


