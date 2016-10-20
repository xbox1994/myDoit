#!/usr/bin/env bash

ec2_host=ec2-52-37-99-80.us-west-2.compute.amazonaws.com
pem_file=wty.pem

access_name=access.log
account_service_name=accounts_service.log
error_name=error.log
unicorn_stderr_name=unicorn.stderr.log
access_path=/Users/tywang/WuhanWork/"$access_name"
account_service_path=/Users/tywang/WuhanWork/"$account_service_name"
error_path=/Users/tywang/WuhanWork/"$error_name"
unicorn_stderr_path=/Users/tywang/WuhanWork/"$unicorn_stderr_name"

function upload(){
    last_time_last_line=""
    while [ 1 ]
    do
        this_time_last_line="$(tail -n 1 ""$1"")"
        #first time run | too much log in 1 minute
    #    echo "access_this_time_last_line: ""$access_this_time_last_line"
    #    echo "access_last_time_last_line: ""$access_last_time_last_line"
        if [ -z "$last_time_last_line" ] || ! tail -r "$1" | grep -Fxq "$last_time_last_line"
        then
            cat "$1" | ssh -i "$pem_file" ubuntu@"$ec2_host" 'cat >> ~/'$2
            echo "$1" uploaded - all
        elif [ "$last_time_last_line" == "$this_time_last_line" ]
        then
            echo "$1" uploaded - nothing
        else
            grep -Fx -A1000000 "$last_time_last_line" $1 | awk '{if(NR>1)print}' | ssh -i "$pem_file" ubuntu@"$ec2_host" 'cat >> ~/'$2
            echo "$1" uploaded - part
        fi
        last_time_last_line="$this_time_last_line"
        sleep 1
    done
}

upload "$access_path" "$access_name" >/dev/null &
upload "$account_service_path" "$account_service_name" >/dev/null &
upload "$error_path" "$error_name" >/dev/null &
upload "$unicorn_stderr_path" "$unicorn_stderr_name" >/dev/null &

#问题1:1分钟内多条重复如何处理,现在是不处理 问题2:搜索效率,从底部开始搜索,现在是顶部开始