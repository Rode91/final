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

        stage('Check Metrics') {
            steps {
                script {
                    def response = sh(
                        script: "curl -s http://prometheus:9090/api/v1/query?query=app_errors_total",
                        returnStdout: true
                    ).trim()

                    echo "Respuesta de Prometheus:"
                    echo response
            }
        }
    }
}