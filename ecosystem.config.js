// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "iman_v",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: "/home/ubuntu/iman_v",
      env: {
        NODE_ENV: "production"
      },
      watch: false,
      autorestart: true,
      max_restarts: 10
    }
  ]
}
