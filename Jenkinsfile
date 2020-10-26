pipeline {
    agent any
    
    stages {
        stage('build') {
            steps {
                sh 'cd ghost-cat-app; npm install; npm run ng build --prod;'
            }
        }
        
        stage('test') {
            steps {
                sh 'ng test'
            }
        }
        
        stage('deploy') {
            steps {
                sh 'rm -r /var/www/html/*; mv dist/* /var/www/html/; sudo service httpd start;'
            }
        }
    }
}
