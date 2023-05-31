/**
 * insight controller
 */

const SELECT_FIELDS = [
  "title",
  "slug",
  "content",
  "sourceText",
  "sourceUrl",
  "type",
  "publishedAt",
];

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::insight.insight",
  ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      const query = strapi.db.query("api::insight.insight");
      await Promise.all(
        data.map(async (item, index) => {
          const foundItem = await query.findOne({
            where: {
              id: item.id,
            },
            populate: ["user"],
            select: SELECT_FIELDS,
          });

          data[index] = {
            ...foundItem,
            user: {
              name: `${foundItem.user.firstname} ${foundItem.user.lastname}`,
              username: foundItem.user.username,
            },
          };
        })
      );
      return { data, meta };
    },
    async findOne(ctx) {
      // Calling the default core action
      const query = strapi.db.query("api::insight.insight");

      const data = await query.findOne({
        where: {
          slug: ctx.params.id,
        },
        populate: ["user"],
        select: SELECT_FIELDS,
      });

      data.user = {
        name: `${data.user.firstname} ${data.user.lastname}`,
        username: data.user.username,
      };

      return { data };
    },
  })
);
