/**
 * event controller
 */

import { factories } from "@strapi/strapi";
const SELECT_FIELDS = [
  "isUpcoming",
  "title",
  "slug",
  "location",
  "date",
  "thumbnail",
  "presentedTitle",
  "presentedSubtitle",
  "speech",
  "learned",
  "text",
  "createdAt",
  "updatedAt",
  "publishedAt",
];
export default factories.createCoreController(
  "api::event.event",
  ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      const query = strapi.db.query("api::event.event");
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
      const query = strapi.db.query("api::event.event");

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
