pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                git 'https://your-repo-url.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t threat-dashboard .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 threat-dashboard'
            }
        }
    }
}