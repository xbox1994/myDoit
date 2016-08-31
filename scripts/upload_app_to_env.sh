#!/bin/bash
rm -rf dist
mkdir dist
tar -cvf dist/myDoit.tar Gemfile Gemfile.lock views config.yml web.rb

domain1=192.168.56.101
domain2=192.168.56.102
domain2=192.168.56.103
scp -o StrictHostKeychecking=no dist/myDoit.tar vagrant@$domain1:/tmp
scp -o StrictHostKeychecking=no scripts/deploy.sh vagrant@$domain1:/tmp
ssh -o StrictHostKeychecking=no vagrant@$domain1 'sudo sh /tmp/deploy.sh'
scp -o StrictHostKeychecking=no dist/myDoit.tar vagrant@$domain2:/tmp
scp -o StrictHostKeychecking=no scripts/deploy.sh vagrant@$domain2:/tmp
ssh -o StrictHostKeychecking=no vagrant@$domain2 'sudo sh /tmp/deploy.sh'
scp -o StrictHostKeychecking=no dist/myDoit.tar vagrant@$domain3:/tmp
scp -o StrictHostKeychecking=no scripts/deploy.sh vagrant@$domain3:/tmp
ssh -o StrictHostKeychecking=no vagrant@$domain3 'sudo sh /tmp/deploy.sh'