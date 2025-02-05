import { createRouteHandler, createUploadthing } from 'uploadthing/next';

import { type AnyFileRoute, type FileRouter } from 'uploadthing/types';

const f = createUploadthing();

const ourFileRouter = {
  editorUploader: f(['image', 'text', 'blob', 'pdf', 'video', 'audio'])
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      return {
        file: {
          key: file.key,
          name: file.name,
          size: file.size,
          type: file.type,
          customId: file.customId,
          lastModified: file.lastModified,
        },
      };
    }),
};

export type OurFileRouter = AnyFileRoute & FileRouter & typeof ourFileRouter;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
