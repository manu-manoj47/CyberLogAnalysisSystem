pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t cyberlog-system .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 cyberlog-system'
            }
        }
    }
}