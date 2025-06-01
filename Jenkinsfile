pipeline {
  agent any

  environment {
    MONGO_URI    = credentials('mongo-uri')
    JWT_SECRET   = credentials('jwt-secret')
    SONAR_TOKEN  = credentials('sonar-token')
  }
stages{
 // stage('Build') {
  //steps {
    //bat 'docker build -t habitflow-app .'
  //}
//}
//stage('Archive Docker Image') {
  //steps {
    //bat 'docker save habitflow-app -o habitflow.tar'
    //archiveArtifacts artifacts: 'habitflow.tar', fingerprint: true
  //}
//}
/*
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


