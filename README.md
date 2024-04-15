# complete-bookstore-mern-project


- Clone or tải `the project folder` và unzip  

### Đối với Frontend

- run cd bookstore-client

```sh
$ npm install
```

```sh
$ npm run dev
```

```sh
$ ở server thêm file .env.local sau đó copy 4 dòng code và điền thông tin của bạn vào

```
```
VITE_APIKEY= from firebase
VITE_AUTHDOMAIN= from firebase
VITE_PROJECTID= from firebase
VITE_STORAGEBUCKET= from firebase
VITE_MESSAGINGSENDERID= from firebase
VITE_APPID= from firebase
VITE_IMAGE_HOSTING_KEY= from imgbb api
VITE_Stripe_PK= stripe key
```

### Đối với Backend

- Run cd bookstore-server

```sh
$ npm install
```

```sh
$ npm start
```

```sh
$ ở server thêm file .env sau đó copy 4 dòng code và điền thông tin của bạn vào
```
```
DB_USER = mongodb_username
DB_PASS = mongodb_password
ACCESS_TOKEN_SECRET = jwt_secret_token
PAYMENT_SECRET_KEY = stripe_secret_key
```

```sh
#Link figma thiết kế UI cho website

https://www.figma.com/file/fbULvrHFPQaXp6RbWI77Dt/pnqbookstore_website?type=design&node-id=0-1&mode=design&t=BdTmNwwLHPO1w6AJ-0
```
```sh


