export default {
  name: 'studentEnrollment',
  title: 'Student Enrollments',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'course',
      title: 'Interested Course',
      type: 'string',
    },
    {
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'status',
      title: 'Contact Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Enrolled', value: 'enrolled' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    },
  ],
}
