#!/bin/bash

rm -rf ~/myDoit
mkdir -p ~/myDoit
/bin/tar -xvf /tmp/myDoit.tar -C ~/myDoit
cd ~/myDoit
killall ruby
bundle install
ruby web.rb &