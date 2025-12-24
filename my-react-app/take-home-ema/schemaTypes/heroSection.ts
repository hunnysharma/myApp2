import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small label text above the title (e.g., "KNOWLEDGE INSIGHTS")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main hero title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Hero subtitle/description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lottieAnimation',
      title: 'Lottie Animation',
      type: 'file',
      description: 'Lottie animation JSON file for hero section',
      options: {
        accept: '.json',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
    },
  },
})

