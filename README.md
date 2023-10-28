# GMAIL-Auto-Responder
The Gmail Autoresponder is a Node.js application that utilizes the Gmail API to automatically respond to new unread emails and organize them with a specified label. This is particularly useful for setting up an out-of-office automatic reply.
Certainly! Below is a more detailed README for your Gmail Autoresponder project.

---
## Description

The Gmail Autoresponder is a Node.js application that utilizes the Gmail API to automatically respond to new unread emails and organize them with a specified label. This is particularly useful for setting up an out-of-office automatic reply.

## Features

- Auto-reply to new unread emails.
- Label and organize processed emails.
- Configurable reply message.
- Secure handling of OAuth 2.0 credentials.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a Google account with Gmail enabled.
- You have created a project on the Google Cloud Platform, enabled the Gmail API, and set up OAuth 2.0 credentials (Client ID and Client Secret).

## Setting Up

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/gmail-autoresponder.git
    cd gmail-autoresponder
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Configure OAuth 2.0:**
    - Visit the [Google Cloud Console](https://console.cloud.google.com/), navigate to your project and get your OAuth 2.0 credentials (`CLIENT_ID`, `CLIENT_SECRET`).
    - Use the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) to obtain a `REFRESH_TOKEN` with the `https://mail.google.com/` scope.

4. **Setup Environment Variables:**
    - Create a `.env` file in the project root directory.
    - Add your credentials and configurations:
        ```plaintext
        CLIENT_ID=your-client-id
        CLIENT_SECRET=your-client-secret
        REDIRECT_URI=https://developers.google.com/oauthplayground
        REFRESH_TOKEN=your-refresh-token
        ```

## Running the Application

1. **Start the Server:**
    ```bash
    node src/app.js
    ```

2. The server will start, and the email processing will begin automatically. The application will check for new unread emails at random intervals between 45 to 120 seconds, send replies, and organize them with the `AutoResponse` label.

## Customizing the Reply Message

- To customize the auto-reply message, modify the `createReply` function in `src/controllers/emailController.js`.

## Contributing

If you want to contribute to this project, feel free to fork the repository, create a new branch for your work, and open a pull request.

## License

This project uses the following license: [MIT License](LICENSE).

---

Make sure to replace placeholder values like "your-username" with actual values. This README provides a good overview of the project, how to set it up, run it, and how others can contribute.
