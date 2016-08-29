#!/bin/bash
rm -rf dist
mkdir dist
tar -cvf dist/myDoit.tar Gemfile Gemfile.lock views config.yml web.rb

domain=192.168.56.102
scp -o StrictHostKeychecking=no dist/myDoit.tar vagrant@$domain:/tmp
scp -o StrictHostKeychecking=no scripts/deploy.sh vagrant@$domain:/tmp
ssh -o StrictHostKeychecking=no vagrant@$domain 'sudo sh /tmp/deploy.sh'