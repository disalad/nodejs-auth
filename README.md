# TODO APPLICATION

<img src="https://res.cloudinary.com/df1unjmwz/image/upload/v1643536106/Screenshot_161_uohumn.png">

<!-- ABOUT THE PROJECT -->
## About The Project

### Built With

* [Node.js](https://nodejs.org/)
* [Mongodb](https://mongodb.com/)
* [Bootstrap](https://getbootstrap.com)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* nodejs >= 14.x
* npm >= 8.x

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/disaladamsas/node-passport-auth.git
   ```

2. Install 3rd party packages

   ```sh
   npm install
   ```

3. Enter your mongodb URI, Google clientId, clientSecret and a sessionkey inside `config/keys.js`

   ```js
   module.exports = {
        google: {
            clientId: '',
            clientSecret: '',
        },
        mongodb: {
            dbUri: '',
        },
        session: {
            cookieKey: '',
        },
    };
   ```

4. Start app in a development server

   ```sh
   npm run dev
   ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Disala - damsasdisala@gmail.com

Project Link - [https://github.com/disaladamsas/node-passport-auth](https://github.com/disaladamsas/node-passport-auth)