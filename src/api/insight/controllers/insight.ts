/**
 * insight controller
 */
const { sanitize } = require("@strapi/utils");
const SELECT_FIELDS = [
  "title",
  "slug",
  "content",
  "sourceText",
  "sourceUrl",
  "type",
  "publishedAt",
  "subtext",
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
            populate: ["createdBy", "thumbnail"],
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
      const query = strapi.db.query("api::insight.insight");

      const data = await query.findOne({
        where: {
          slug: ctx.params.id,
        },
        populate: ["createdBy"],
        select: SELECT_FIELDS,
      });

      data.content = data.content
        .replaceAll("../", ``)
        .replaceAll('src="', `src="${strapi.config.get("server.url")}/`); // Here we modify the 'Content' and add your website "url" to it

      data.createdBy = {
        name: `${data.createdBy.firstname} ${data.createdBy.lastname}`,
        username: data.createdBy.username,
      };
      const sanitizedEntity = await sanitize.contentAPI.output(data);

      return { data: sanitizedEntity };
    },
  })
);
