require('dotenv').config();
const { google } = require('googleapis');
const { gmail, oauth2Client } = require('../config/googleAuth');

async function fetchUnrepliedEmails() {
    try {
      const response = await gmail.users.messages.list({
        userId: 'me',
        q: 'is:unread -from:me -label:Replied',  // Exclude emails that have been labeled as 'Replied'
      });
      const messages = response.data.messages || [];
      return messages;
    } catch (error) {
      console.error('Error fetching emails:', error);
      return [];
    }
  }

async function replyToEmails(messageIds) {
    try {
        for (let messageId of messageIds) {
            const message = await gmail.users.messages.get({
                userId: 'me',
                id: messageId,
            });
            const emailData = {
                userId: 'me',
                requestBody: {
                    raw: createReply(message.data),
                },
            };
            await gmail.users.messages.send(emailData);
        }
    } catch (error) {
        console.error('Error sending replies:', error);
    }
}

function createReply(email) {
    const subject = 'Re: ' + email.payload.headers.find(header => header.name === 'Subject').value;
    const to = email.payload.headers.find(header => header.name === 'From').value;
    const messageParts = [
        'From: <your-email@gmail.com>',
        'To: ' + to,
        'Subject: ' + subject,
        '',
        'I am currently out of the office and will get back to you as soon as possible.',
    ];
    const message = messageParts.join('\n');
    const encodedMessage = Buffer.from(message).toString('base64');  // Corrected line
    return encodedMessage;
}

async function labelAndOrganizeEmails(messageIds) {
    try {
        const label = await createOrGetLabel();
        for (let messageId of messageIds) {
            await gmail.users.messages.modify({
                userId: 'me',
                id: messageId,
                requestBody: {
                    addLabelIds: [label.id],
                },
            });
        }
    } catch (error) {
        console.error('Error labeling emails:', error);
    }
}

async function createOrGetLabel() {
    try {
      const { data } = await gmail.users.labels.list({ userId: 'me' });
      let label = data.labels.find(label => label.name === 'Replied');  // Look for a 'Replied' label
      if (!label) {
        const { data: newLabel } = await gmail.users.labels.create({
          userId: 'me',
          requestBody: {
            name: 'Replied',
            labelListVisibility: 'labelShow',
            messageListVisibility: 'show',
          },
        });
        label = newLabel;
      }
      return label;
    } catch (error) {
      console.error('Error creating/getting label:', error);
    }
}

async function emailProcessing() {
    setInterval(async () => {
        const unrepliedEmails = await fetchUnrepliedEmails();
        const messageIds = unrepliedEmails.map(email => email.id);
        await replyToEmails(messageIds);
        await labelAndOrganizeEmails(messageIds);
    }, getRandomInterval());
}

function getRandomInterval() {
    return Math.random() * (120000 - 45000) + 45000;  // Random interval between 45 to 120 seconds
}

module.exports = { emailProcessing };
