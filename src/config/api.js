import OAuth2 from 'client-oauth2';
import JsonApi from 'devour-client';
import { kitsuConfig } from './env';

export const auth = new OAuth2({
  clientId: kitsuConfig.authConfig.CLIENT_ID,
  clientSecret: kitsuConfig.authConfig.CLIENT_SECRET,
  accessTokenUri: `${kitsuConfig.baseUrl}/oauth/token`,
});

export const Kitsu = new JsonApi({
  apiUrl: `${kitsuConfig.baseUrl}/edge`,
  logger: false,
  pluralize: false,
});

Kitsu.headers['User-Agent'] = `KitsuMobile/${kitsuConfig.version} (askar)`;

const errorMiddleware = {
  name: 'error-middleware',
  error: (payload) => {
    if (payload.status === 401) {
      return {
        request: {
          authorized: false,
        },
      };
    }
    const data = payload.data;
    if (!data.errors) {
      console.log('Unidentified error');
      console.log(payload);
      return null;
    }
    return payload.data.errors;
  },
};
Kitsu.replaceMiddleware('errors', errorMiddleware);

Kitsu.define(
  'users',
  {
    name: '',
    email: '',
    avatar: '',
    about: '',
    bio: '',
    createdAt: '',
  },
  { collectionPath: 'users' },
);

Kitsu.define(
  'user',
  {
    name: '',
    email: '',
    avatar: '',
    about: '',
    bio: '',
    createdAt: '',
  },
  { collectionPath: 'user' },
);

Kitsu.define(
  'anime',
  {
    slug: '',
    synopsis: '',
    titles: '',
    posterImage: '',
    startDate: '',
    endDate: '',
    coverImageTopOffset: '',
    canonicalTitle: '',
    abbreviatedTitles: '',
    averageRating: '',
    ratingFrequencies: '',
  },
  { collectionPath: 'anime' },
);

Kitsu.define(
  'manga',
  {
    slug: '',
    synopsis: '',
    titles: '',
    posterImage: '',
    startDate: '',
    endDate: '',
    coverImageTopOffset: '',
    canonicalTitle: '',
    abbreviatedTitles: '',
    averageRating: '',
    ratingFrequencies: '',
  },
  { collectionPath: 'manga' },
);

Kitsu.define(
  'categories',
  {
    title: '',
    nsfw: '',
    childCount: '',
    image: '',
    slug: '',
    description: '',
    totalMediaCount: '',
    parent: {
      jsonApi: 'hasMany',
    },
    anime: {
      jsonApi: 'hasMany',
    },
    drama: {
      jsonApi: 'hasMany',
    },
    manga: {
      jsonApi: 'hasMany',
    },
  },
  {
    collectionPath: 'categories',
  },
);

Kitsu.define(
  'streamers',
  {
    siteName: '',
    logo: '',
    streamingLinks: '',
  },
  {
    collectionPath: 'streamers',
  },
);

export const setToken = (token) => {
  Kitsu.headers.Authorization = `Bearer ${token}`;
};