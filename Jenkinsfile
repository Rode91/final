pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                sh 'docker-compose build v1 v2'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --no-deps v1 v2 nginx prometheus grafana'
            }
        }

    }
}