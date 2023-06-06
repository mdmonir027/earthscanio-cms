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
  "presentedTitle",
  "presentedSubtitle",
  "speech",
  "learned",
  "text",
  "createdAt",
  "updatedAt",
  "publishedAt",
  "subtitle",
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
            populate: ["createdBy", "thumbnail", "images"],
            select: SELECT_FIELDS,
          });

          data[index] = {
            ...foundItem,
            createdBy: {
              name: `${foundItem.createdBy.firstname} ${foundItem.createdBy.lastname}`,
              username: foundItem.createdBy.username,
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
        populate: ["createdBy", "thumbnail", "images"],
        select: SELECT_FIELDS,
      });

      data.user = {
        name: `${data.createdBy.firstname} ${data.createdBy.lastname}`,
        username: data.createdBy.username,
      };

      return { data };
    },
  })
);
