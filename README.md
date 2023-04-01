# oladipo-demo-credit
### Introduction
This is a RESTful API built using NodeJS, Redis, MySQL, KnexJS ORM and Redis. This API helps users to borrow money(receive funds), transfer funds, recieve money to other Nigeria bank accounts. 

</br>

### Setup
Clone the repository to your local machine.
```bash
git clone https://github.com/adesiyanoladipo/oladipo-demo-credit.git
```
Ensure that you have NodeJS, Redis, MySQL and Redis on your machine. You could use their cloud services.
Navigate to the root directory of the project in a terminal.
```bash
cd oladipo-demo-credit
```
Run the following command to install the necessary dependencies
```bash
npm install
```
Add a .env file following .env.example file example with the values of each variable
```.env
NODE_ENV = development
server_name = Oladipo Demo credit server
server_admin_email
port = 8000
database_client 
database_host
database_name 
database_user
database_password 
database_nullAsDefault 
databaseDebug
database_port
jwt_access_token_secret
jwt_expiry_time
email_host
email_port
admin_email
admin_password
redis_endpoint_url
redis_username
redis_password
redis_port
redis_expiration_time
access_token_secret
flw_public_key
flw_secret_key
flw_encryption_key
test_user_token
```

</br>

Run the following command run tests
```bash
npm run tests
```

### Running Server
#### Locally
Run the following command to start the server:
```bash
    nodemon
```
The server will run on http://localhost:8000 by default

</br>

## Available Endpoints
Base URL[dev]: 0.0.0.0:8000/\

### Register User
#### POST api/v1/auth/register
Adds a new user to the server.
Request Body
* `name` (string, required) - The name of the user.
* `email`(string, required) - The email of the user.
* `username`(string, required) - The username of the user.
* `password`(string, required) - The password of the user.

Example request body:
```json
    {   "name": "2 Adesiyan",
        "email": "adesiyan22oladipo@gmail.com",
        "username": "222wqs",
        "password": "test1234"
}
```
Response
* 200 Created on success
```json
    {
        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5MjM0NTQ0NC05NWRlLTQ2YzQtYmNlOS01ZTk4NmQwMmRkNTMiLCJpYXQiOjE2NzkyNjExNjgsImV4cCI6MTY4OTc3MzE2OH0._Dhpch5iLdP8mp20B4E0MA6V9Y8vRcGbQ261ry4oNOQ",
            "message": {
                "newUser": {
                    "id": "92345444-95de-46c4-bce9-5e986d02dd53",
                    "name": "2 Adesiyan",
                    "username": "222wqs",
                    "email": "adesiyan22oladipo@gmail.com",
                    "password": "$2a$10$gGyWVkCKjqFPGQcjwYHa4.GG75TSEJJsQWaF1O6C9x3EZzAp62hau",
                    "createdAt": "2023-03-19T20:26:07.000Z",
                    "updatedAt": "2023-03-19T20:26:07.000Z",
                    "deletedAt": null
                },
                "newWallet": {
                    "id": "37681fcb-007d-4378-b04e-69016e0d975d",
                    "user_id": "92345444-95de-46c4-bce9-5e986d02dd53",
                    "account_number": "3549163600",
                    "account_name": "2 Adesiyan",
                    "account_bank": "Oladipo Credit Bank",
                    "balance": 0,
                    "is_active": 0,
                    "createdAt": "2023-03-19T20:26:08.000Z",
                    "updatedAt": "2023-03-19T20:26:08.000Z",
                    "deletedAt": null
                }
            }
        }
    }
```

### Login as a User
#### POST api/v1/auth/login
Logs in a userr
Request Body
* `email`(string, required) - The email of the user.
* `password`(string, required) - The password of the user.

Example request body:
```json
    {   
        "email": "adesiyan22oladipo@gmail.com",
        "password": "test1234"
    }
```
Response
* 200 Created on success
```json
    {
        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5MjM0NTQ0NC05NWRlLTQ2YzQtYmNlOS01ZTk4NmQwMmRkNTMiLCJpYXQiOjE2NzkyNjExNjgsImV4cCI6MTY4OTc3MzE2OH0._Dhpch5iLdP8mp20B4E0MA6V9Y8vRcGbQ261ry4oNOQ",
            "message": {
                "newUser": {
                    "id": "92345444-95de-46c4-bce9-5e986d02dd53",
                    "name": "2 Adesiyan",
                    "username": "222wqs",
                    "email": "adesiyan22oladipo@gmail.com",
                    "password": "$2a$10$gGyWVkCKjqFPGQcjwYHa4.GG75TSEJJsQWaF1O6C9x3EZzAp62hau",
                    "createdAt": "2023-03-19T20:26:07.000Z",
                    "updatedAt": "2023-03-19T20:26:07.000Z",
                    "deletedAt": null
                },
                "newWallet": {
                    "id": "37681fcb-007d-4378-b04e-69016e0d975d",
                    "user_id": "92345444-95de-46c4-bce9-5e986d02dd53",
                    "account_number": "3549163600",
                    "account_name": "2 Adesiyan",
                    "account_bank": "Oladipo Credit Bank",
                    "balance": 0,
                    "is_active": 0,
                    "createdAt": "2023-03-19T20:26:08.000Z",
                    "updatedAt": "2023-03-19T20:26:08.000Z",
                    "deletedAt": null
                }
            }
        }
    }
```
The following endpoints require user authentication token which is to be passed in the user's request header.
```json
    {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTk5YWQyOS1mMjkyLTQyODktYmVjOS05ZmYxYWVjMTE3OGQiLCJpYXQiOjE2NzkyNDg5NDEsImV4cCI6MTY4OTc2MDk0MX0.fh3d1VrjvrLqeAh6zWpXxcWtzbJYAq-4fcD6WTfROe0",
    }
```
### Fund user wallet
#### POST api/v1/wallet/fundWallet
Funds a user wallet

Example request body:
```json
    {
    "card": {
        "card_number": "5399838383838381",
        "cvv": "470",
        "expiry_month": "10",
        "expiry_year": "31"
    },
    "amount": 100000,
    "currency": "NGN",
    "pin": "3310"
}
```
Response
* 200 Created on success
```json
    {
        "success": true,
        "message": "Funds topup successful. New balance is 103000.00",
        "data": {
            "id": "83195700-3402-46c4-a3a8-49dc8ea2dbd8",
            "transaction_id": "9e2141fc-00ea-4c40-b7b1-9975584c0351",
            "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
            "amount": 100000,
            "status": "successful",
            "createdAt": "2023-03-19T19:29:24.000Z",
            "updatedAt": "2023-03-19T19:29:24.000Z",
            "deletedAt": null
        }
    }
```

### Transfer Funds
#### POST api/v1/wallet/transferFund
This endpoint is used to transfer funds to a user's wallet.
Example request body:
```json
    {
        "amount": 1000,
        "account_number": "5995859746",
        "account_bank": "Oladipo Credit Bank"
    }
```
Response
* 200 OK on success

```json
    {
        "success": true,
        "message": "You have successfully sent N1000 to Dipo0x Adesiyan"
    }
```

### Withdraw Funds
#### POST api/v1/wallet/withdrawFund
This endpoint is used to withdraw funds to a user's Nigerian Bank Account.
The account bank is the code of the bank. Access bank(044) is being used as an example here.

Example request body:
```json
    {
    "amount": 1000,
    "account_number": "0690000040",
    "account_bank": "044"
    }
```
Response
* 200 OK on success

```json
    {
    "success": true,
    "message": "You have successfully transferred N1000"
    }
```

### Get user transactions
#### GET api/v1/wallet/getTransactions
Returns all transactions for the logged in user.\

Response
* 200 OK on success
```json
    {
        "success": true,
        "message": [
            {
                "id": "06e47acd-852f-45c8-a25a-b6c48e0fc910",
                "transaction_id": "cb3b3c21-34b6-45cd-8d0b-fea62f3200f6",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:23:08.000Z",
                "updatedAt": "2023-03-19T19:23:08.000Z",
                "deletedAt": null
            },
            {
                "id": "0db2906d-1502-40c6-9ff1-aa7b97907e2d",
                "transaction_id": "578f9ea5-18a5-4126-9477-38e0b2adeacb",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:20:47.000Z",
                "updatedAt": "2023-03-19T19:20:47.000Z",
                "deletedAt": null
            },
            {
                "id": "169e9185-7c6a-45bb-b4bc-6826f50a7ffc",
                "transaction_id": "1fa89358-0004-4f15-a384-76c46293760c",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:18:49.000Z",
                "updatedAt": "2023-03-19T19:18:49.000Z",
                "deletedAt": null
            },
            {
                "id": "3106652d-6c20-45c0-84e5-26274414b42d",
                "transaction_id": "ab5fa8fd-fd09-4eb2-a0bc-0d170f78b923",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T17:09:44.000Z",
                "updatedAt": "2023-03-19T17:09:44.000Z",
                "deletedAt": null
            },
            {
                "id": "31b633f4-9b9b-4834-a906-ccb4a9bc46cf",
                "transaction_id": "80be225c-da77-45d0-9444-d5d66285bf53",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:32:46.000Z",
                "updatedAt": "2023-03-19T19:32:46.000Z",
                "deletedAt": null
            },
            {
                "id": "50f70fe6-1192-443b-977d-90ab10440a91",
                "transaction_id": "b0cca084-2a5c-41a5-a26f-7e8e5abd9924",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T17:04:40.000Z",
                "updatedAt": "2023-03-19T17:04:40.000Z",
                "deletedAt": null
            },
            {
                "id": "58325bc5-486f-4cd7-a6ff-cb4f4a9b0320",
                "transaction_id": "a51d086d-bde1-447c-9222-3ee2d9cf9704",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:20:51.000Z",
                "updatedAt": "2023-03-19T19:20:51.000Z",
                "deletedAt": null
            },
            {
                "id": "5aee714b-ba88-4696-9e60-a8a61571ae55",
                "transaction_id": "13bfb030-665a-4f7f-a812-0002e1ec8510",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:32:11.000Z",
                "updatedAt": "2023-03-19T19:32:11.000Z",
                "deletedAt": null
            },
            {
                "id": "63aca7c9-84f7-4907-974c-c57ae2133005",
                "transaction_id": "4a0d8fd9-d199-4556-8c14-3d134edc45b0",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:32:13.000Z",
                "updatedAt": "2023-03-19T19:32:13.000Z",
                "deletedAt": null
            },
            {
                "id": "6756d681-9390-44da-b9f3-52e93f2a5413",
                "transaction_id": "41760c3f-3a12-41e5-b61a-fa3bb4d6e27c",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:31:20.000Z",
                "updatedAt": "2023-03-19T19:31:20.000Z",
                "deletedAt": null
            },
            {
                "id": "6ebd6ef3-db44-48ad-a0f0-9d05febb44c7",
                "transaction_id": "953dd0f0-9f81-443b-aed7-bb537a803764",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:31:16.000Z",
                "updatedAt": "2023-03-19T19:31:16.000Z",
                "deletedAt": null
            },
            {
                "id": "83195700-3402-46c4-a3a8-49dc8ea2dbd8",
                "transaction_id": "9e2141fc-00ea-4c40-b7b1-9975584c0351",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 100000,
                "status": "successful",
                "createdAt": "2023-03-19T19:29:24.000Z",
                "updatedAt": "2023-03-19T19:29:24.000Z",
                "deletedAt": null
            },
            {
                "id": "8b904fbf-6a83-47d7-86f2-1182a633314e",
                "transaction_id": "4afbce8a-84ee-4998-8f98-235037b52e3a",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:23:04.000Z",
                "updatedAt": "2023-03-19T19:23:04.000Z",
                "deletedAt": null
            },
            {
                "id": "9a7e8e3d-1fce-434d-b0a2-377c8b8f7abf",
                "transaction_id": "d633451e-24fc-444a-9fb5-dc7341d01f24",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T17:09:46.000Z",
                "updatedAt": "2023-03-19T17:09:46.000Z",
                "deletedAt": null
            },
            {
                "id": "9d71f798-db41-4b00-9e8c-b04ac486e79e",
                "transaction_id": "c02cb875-0878-4582-9647-887903f8f806",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:32:48.000Z",
                "updatedAt": "2023-03-19T19:32:48.000Z",
                "deletedAt": null
            },
            {
                "id": "a49dde6e-eb18-4740-a8f6-bbb2db4eb476",
                "transaction_id": "120bb5df-b324-450d-928e-0b2dda54081d",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:31:24.000Z",
                "updatedAt": "2023-03-19T19:31:24.000Z",
                "deletedAt": null
            },
            {
                "id": "aed87834-5581-409f-a7d0-b5675f550966",
                "transaction_id": "ef7d9858-8443-4978-a2fd-a7438e7eb898",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:20:49.000Z",
                "updatedAt": "2023-03-19T19:20:49.000Z",
                "deletedAt": null
            },
            {
                "id": "b9b4933a-d355-431c-9812-17a5160f51cc",
                "transaction_id": "4500699e-1b67-47db-8f6f-14e75307efcd",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:18:54.000Z",
                "updatedAt": "2023-03-19T19:18:54.000Z",
                "deletedAt": null
            },
            {
                "id": "c3888ff5-2f2a-41ce-9277-d339adb2b3dd",
                "transaction_id": "94bb172c-39e1-4f93-90d8-1560c3237e7a",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T17:05:08.000Z",
                "updatedAt": "2023-03-19T17:05:08.000Z",
                "deletedAt": null
            },
            {
                "id": "cf438b99-b4d0-480d-b56a-b9de3144de6a",
                "transaction_id": "b8829826-382e-4363-9ae8-02ae73e7d62a",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:32:09.000Z",
                "updatedAt": "2023-03-19T19:32:09.000Z",
                "deletedAt": null
            },
            {
                "id": "d258cd2e-7a04-43dc-9a84-6eee437ff5ed",
                "transaction_id": "b4b0f113-51fb-436c-a833-4dc324ff105d",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:23:10.000Z",
                "updatedAt": "2023-03-19T19:23:10.000Z",
                "deletedAt": null
            },
            {
                "id": "d670edd3-c8ee-49ce-8405-3c7cadd77f8f",
                "transaction_id": "2618dd54-d539-44f4-9620-90c3f6cc1da4",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:18:51.000Z",
                "updatedAt": "2023-03-19T19:18:51.000Z",
                "deletedAt": null
            },
            {
                "id": "d9972859-99b7-4896-a928-208559e6e558",
                "transaction_id": "aab94d4a-67c1-424e-915d-790ac5a8bc7d",
                "user_id": "5a99ad29-f292-4289-bec9-9ff1aec1178d",
                "amount": 1000,
                "status": "successful",
                "createdAt": "2023-03-19T19:32:50.000Z",
                "updatedAt": "2023-03-19T19:32:50.000Z",
                "deletedAt": null
            }
        ]
    }
```

### Errors
The response for request failures or any other error are rather simple.
```json
{
	"success": "false",
	"message": "The error message"
}
```

</br>

Here is the schema of the API models:

![download](https://user-images.githubusercontent.com/63419117/226215012-ea6d1d60-8547-4363-ac86-56402aa42f98.png)

### Conclusion
You can find additional documentation for this API, including request and response signatures, by visiting https://elements.getpostman.com/redirect?entityId=24812037-30ef9f53-ac29-475f-9c07-9668f0ed5bc9&entityType=collection in your web browser.
