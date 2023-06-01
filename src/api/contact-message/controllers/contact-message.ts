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

      await strapi.plugin("email").service("email").send({
        to: "", // todo need to update email here
        from: email,
        subject: "Product",
        text: "Request",
        html: `<h4>Hello world</h4>`,
      });
      return { data };
    },
  })
);
