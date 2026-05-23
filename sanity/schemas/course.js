export default {
  name: 'course',
  title: 'Courses & Pricing',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Course Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Monthly Fee / Price',
      type: 'string', // String to allow for "Price on Request" or currency symbols
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'color',
      title: 'Accent Color (Hex)',
      type: 'string',
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}
