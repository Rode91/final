pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo "Clonando repositorio..."
            }
        }

        stage('Build') {
            steps {
                echo "Construyendo contenedores..."
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                echo "Levantando servicios..."
                sh 'docker compose up -d'
            }
        }

    }
}