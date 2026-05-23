export default {
  name: 'post',
  title: 'Gallery Posts (Photos/Videos)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Photo Upload',
      type: 'image',
      hidden: ({ document }) => document?.mediaType !== 'photo',
    },
    {
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo/Instagram)',
      type: 'url',
      hidden: ({ document }) => document?.mediaType !== 'video',
    },
    {
      name: 'date',
      title: 'Publication Date',
      type: 'datetime',
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
    },
  ],
}
