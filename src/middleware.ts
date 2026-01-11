import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const response = next();
  
  response.then((res) => {
    res.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large');
  });
  
  return response;
});