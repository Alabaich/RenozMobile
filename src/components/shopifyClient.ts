// shopifyClient.ts
import {createStorefrontApiClient} from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: 'http://renozcentre.myshopify.com',
  apiVersion: '2023-10',
  publicAccessToken: '9e2b15437b50c2e5ea05d717f72b129b',
});

export default client;
