module.exports = {
    apps: [
        {
            name: 'api-rest1',
            script: './bin/www',
            watch: true,
            ignore_watch: ["node_modules"],
            // new feature; increase restart delay each time after every crash or non reachable db per example
            exp_backoff_restart_delay: 100,
            //combine multiple err/out logs in one file for each
            combine_logs: true,
            //calls combine logs
            merge_logs: true,
            //error log file path
            error_file: "pm2-logs/err.log", // better be /var/log
            //out log file path
            out_file: "pm2-logs/out.log",
            // use time in logs
            time: true,
            //무중단 셋팅 https://engineering.linecorp.com/ko/blog/pm2-nodejs/
            wait_ready: true,
            exec_mode: "cluster",
            instances: 2, // can be max or any number of processes the cpu can handle
            env: {
                "PORT": 8080,
                "NODE_ENV": "production"
            },
        },
    ]
}  