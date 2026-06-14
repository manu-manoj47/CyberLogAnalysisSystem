pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t cyberlogsystem .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop cyberapp || exit 0'
                bat 'docker rm cyberapp || exit 0'
            }
        }

        stage('Run New Container') {
            steps {
                bat 'docker run -d -p 5001:5000 --name cyberapp cyberlogsystem'
            }
        }

    }
}