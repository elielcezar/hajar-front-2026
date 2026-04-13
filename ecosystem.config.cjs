module.exports = {
  apps: [{
    name: 'hajar-front',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3012',
    cwd: '/home/hajar/htdocs/hajar.com.br',
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3012
    },
    error_file: '/home/hajar/logs/hajar-front-error.log',
    out_file: '/home/hajar/logs/hajar-front-out.log',
    log_file: '/home/hajar/logs/hajar-front-combined.log',
    time: true
  }]
};

