export default {
  name: 'achievement',
  title: 'Achievements',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Student Name',
      type: 'string',
    },
    {
      name: 'instrument',
      title: 'Instrument / Art Form',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Testimonial / Quote',
      type: 'text',
    },
    {
      name: 'achievement',
      title: 'Achievement Details',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
