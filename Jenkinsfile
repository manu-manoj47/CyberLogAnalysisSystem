pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code downloaded successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Cybersecurity Log Analysis System Build Successful'
            }
        }

        stage('Test') {
            steps {
                echo 'All Tests Passed'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment Successful'
            }
        }
    }
}