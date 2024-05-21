import type { NextApiRequest, NextApiResponse } from 'next';
import { maildiver } from './maildiver';
import EmailTemplate from '../../components/sample-email-template';

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const maildiverRes = await sendEmailWithDynamicHtmlVariables();
    const maildiverRes = await sendEmailWithReactEmailTemplate();

    return res.status(200).json(maildiverRes);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const sendEmailWithReactEmailTemplate = async () => {
  const firstName = 'Developer Name';
  const reactEmailTemplate = EmailTemplate(firstName);
  const maildiverRes = await maildiver.email.send({
    to: 'sudo@example.com',
    from: 'you@example.com',
    subject: 'Email from the Maildiver Node.js SDK',
    react: reactEmailTemplate,
  });

  return maildiverRes;
};

const sendEmailWithDynamicHtmlVariables = async () => {
  const maildiverRes = await maildiver.email.send({
    to: 'sudo@example.com',
    from: 'you@example.com',
    subject: 'Email from the Maildiver Node.js SDK',
    html: '<p>Hi {{ firstName }}! Maildiver Node.js SDK is awesome!</p>',
    variables: {
      values: {
        firstName: 'Developer Name',
      },
      default_values: {
        fistName: 'there',
      },
    },
  });

  return maildiverRes;
};

export default sendEmail;
