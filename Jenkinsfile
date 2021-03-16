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
                withCredentials([sshUserPrivateKey(credentialsId: 'c57af166-995f-4872-a291-0115eb44f665', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
                    script {
                        def remote = [:]
                        remote.name = 'web server'
                        remote.host = 'ec2-3-141-196-176.us-east-2.compute.amazonaws.com'
                        remote.user = userName
                        remote.identityFile = identity
                        remote.allowAnyHosts = true
                        sshCommand remote: remote, command: "rm -rf /var/www/html/*"
                        sh 'rm -rf ./html; mkdir html; mv ./ghost-cat-app/dist/ghost-cat-app/* ./html'
                        sshPut remote: remote, from: './html', into: '/var/www'
                    }
                }
                
            }
        }
    }
}
