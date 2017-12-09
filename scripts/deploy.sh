#!/bin/bash

echo $USER
pwd

domain2=192.168.56.102
scp -o StrictHostKeychecking=no dist/myDoit.tar scripts/deploy.sh vagrant@${domain2}:/tmp
ssh -o StrictHostKeychecking=no vagrant@${domain2} 'sudo sh /tmp/deploy.sh'