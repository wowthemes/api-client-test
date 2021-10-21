# api-client-test

```
git clone git@github.com:wowthemes/api-client-test.git
cd api-client-test
yarn install
node ace migration:run
node ace serve --watch
```

### Create new user 
Post: http://127.0.0.1:3333/register
email: '',
password: ''

### Login and Get API Token
Post: http://127.0.0.1:3333/login
email: ''
password: ''

### Get Users
Get: http://127.0.0.1:3333/users

### Get single user
Get : http://127.0.0.1:3333/users/1