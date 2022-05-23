const config = require('config')

module.exports = ({ env }) => {
  let email = {}
  if (env('NODE_ENV') !== 'test') {
    email = {
      provider: 'mailgun',
      providerOptions: {
        apiKey: env('MAILGUN_API_KEY'),
        domain: env('MAILGUN_DOMAIN'),
        host: env('MAILGUN_HOST', 'api.mailgun.net'),
      },
      settings: {
        defaultFrom: env('MAILGUN_EMAIL'),
        defaultReplyTo: env('MAILGUN_EMAIL'),
      },
    }
  }

  return {
    email,
    upload: {
      provider: 'climate',
      providerOptions: {
        sizeLimit: config.fileSize.max * 1024 * 1024,
      },
    },
    sentry: {
      enabled: true,
      config: {
        dsn: env('https://c6decc5c8f7f458a848e801d71113ec9@o1258931.ingest.sentry.io/6433300'),
      },
    },
  }
}
