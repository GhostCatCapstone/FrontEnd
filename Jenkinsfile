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
                sh 'echo "Eventually we want this to run tests: cd ghost-cat-app; npm run ng test;"'
            }
        }
        
        stage('deploy') {
            steps {
                sh 'sudo rm -rf /var/www/html/*; sudo mv ghost-cat-app/dist/ghost-cat-app/* /var/www/html/; sudo service httpd start;'
            }
        }
    }
}
