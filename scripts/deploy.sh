#!/bin/bash
domain2=192.168.56.102
scp -o StrictHostKeychecking=no dist/myDoit.tar scripts/run.sh vagrant@${domain2}:/tmp
ssh -o StrictHostKeychecking=no vagrant@${domain2} 'sudo bash /tmp/run.sh'