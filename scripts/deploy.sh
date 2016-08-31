#!/bin/bash
echo -------------------------"$HOSTNAME"------------------------------
if [ "$HOSTNAME" = "nginx" ]; then
    nginx -s stop
    nginx
else
    rm -rf ~/myDoit
    mkdir -p ~/myDoit
    /bin/tar -xvf /tmp/myDoit.tar -C ~/myDoit
    cd ~/myDoit
    killall ruby
    bundle install
    ruby web.rb >/dev/null 2>&1 &
fi