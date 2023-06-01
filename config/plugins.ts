module.exports = ({ env }) => ({
  wysiwyg: {
    enabled: true,
    resolve: "./src/plugins/wysiwyg",
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("EMAIL_SMTP_HOST"),
        port: env("EMAIL_SMTP_PORT", 587),
        auth: {
          user: env("EMAIL_SMTP_USER"),
          pass: env("EMAIL_SMTP_PASS"),
        },
        // ... any custom nodemailer options
      },
      // settings: {
      //   defaultFrom: env("EMAIL_ADDRESS_FROM"),
      //   defaultReplyTo: env("EMAIL_ADDRESS_REPLY"),
      // },
    },
  },
});
