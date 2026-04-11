/**
 * heznpc — shared brand config.
 *
 * Both apps/web and apps/gallery import from here.
 * Single source of truth for identity, links, and metadata.
 */

export default {
  name: 'heznpc',
  bio: '2차 창작 / 유머 일러스트 · AI / Software Engineer',

  links: {
    github: 'https://github.com/heznpc',
    x: 'https://x.com/heznpc',
    pixiv: 'https://www.pixiv.net/users/heznpc',
    // Gallery hasn't been deployed publicly yet — fall back to the source so
    // that consumers of this config never see an empty href. Update once the
    // Vercel deployment is live.
    gallery: 'https://github.com/newtria/gallery',
  },
};
