node{
    stage('git clone'){
       git url: 'https://github.com/xbox1994/myDoit.git'
    }

    stage('test'){
        sh "echo 'test done'"
    }

    stage('build'){
        sh "./scripts/build.sh"
    }

    stage('deploy'){
        sh "./scripts/deploy.sh"
    }
}