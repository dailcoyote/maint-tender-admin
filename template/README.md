# MAINT ADMIN

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run the finished assembly 
```
npm install -g serve
# -s flag means serve it in Single-Page Application mode
# which deals with the routing problem below
serve -s dist
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Development environment (.env.development)
```
NODE_ENV=development
VUE_APP_MODE=development
VUE_APP_ROOT_API=http://localhost:3434    // <URL TO YOUR DEV SERVER API>
VUE_APP_ADMIN_EMAIL=admin@maint.kz    // for dev
VUE_APP_ADMIN_PASSWORD=maint1234      // for dev
```

## Production environment (.env.production)
```
NODE_ENV=development
VUE_APP_MODE=development
VUE_APP_ROOT_API=http://maint.prod.com:80  // <URL TO YOUR PRODUCTION SERVER API>
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
