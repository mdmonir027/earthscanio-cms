/**
 * contact-message controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::contact-message.contact-message",
  ({ strapi }) => ({
    async create(ctx) {
      // Calling the default core action
      const { firstname, lastname, email, phone, message } = ctx.request.body;
      const data = await strapi.db
        .query("api::contact-message.contact-message")
        .create({
          data: { firstname, lastname, email, phone, message },
        });

      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: "mmislam027@gmail.com", // todo need to update email here
          from: email,
          subject: "Product",
          text: "Request",
          html: `<div>
                <p>Name: ${firstname} ${lastname}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Text: ${message}</p>
          </div>`,
        });
      return { data };
    },
  })
);
