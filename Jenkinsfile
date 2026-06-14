pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t cyberlogsystem .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop cyberapp || true'
                sh 'docker rm cyberapp || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d -p 5001:5000 --name cyberapp cyberlogsystem'
            }
        }

    }
}