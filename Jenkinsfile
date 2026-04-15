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
                sh 'cd /var/jenkins_home/workspace/final && docker-compose up -d --no-deps v1 v2 nginx prometheus grafana'
            }
        }

        stage('Check Metrics') {
            steps {
                script {
                    sh '''
                    for i in 1 2 3 4 5 6 7 8 9 10; do
                      curl -s http://prometheus:9090/-/ready && break
                      echo "Esperando a Prometheus..."
                      sleep 3
                    done
                    '''

                    def response = sh(
                        script: 'curl -s http://prometheus:9090/api/v1/query?query=app_errors_total',
                        returnStdout: true
                    ).trim()

                    echo "Respuesta de Prometheus:"
                    echo response
                }
            }
        }

    }
}