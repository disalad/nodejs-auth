# Authentication App With Node.js and Passport.js

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

-   [Node.js](https://nodejs.org/)
-   [Mongodb](https://mongodb.com/)
-   [Bootstrap](https://getbootstrap.com)

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-   nodejs >= 14.x
-   npm >= 8.x

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/disaladamsas/node-passport-auth.git
    ```

2. Install 3rd party packages.

    ```sh
    npm install
    ```

3. Enter your mongodb URI, Google clientId, clientSecret and a sessionkey inside an `.env` file in the root directory.

    ```env
    GOOGLE_CLIENT_ID = <Google Client ID>
    GOOGLE_CLIENT_SECRET = <Google Client Secret>

    MONGODB_URI = <Mongodb Atlas URI>

    COOKIE_SESSION_KEY = <Random Strong String>

    NODEMAILER_EMAIL = <Your Email>
    NODEMAILER_PASSWORD = <Your Password>
    NODEMAILER_HOST = <Email SMTP Host>
    NODEMAILER_PORT = <Host's Port>
    NODEMAILER_DISPLAYNAME = <Display Name For Your Emails>

    PORT = <Port That Starts The App>
    ```

4. Create a folder named `uploads` to store profile pictures.

5. Start app in a development server.

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
