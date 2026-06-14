pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t cyberlog-system .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker stop cyberlog || true'
                sh 'docker rm cyberlog || true'
                sh 'docker run -d -p 3000:3000 --name cyberlog cyberlog-system'
            }
        }
    }
}