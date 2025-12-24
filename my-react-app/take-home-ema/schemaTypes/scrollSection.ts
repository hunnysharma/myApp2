import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'scrollSection',
  title: 'Scroll Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading Text',
      type: 'string',
      description: 'Main heading for the scroll section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Scroll Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'lottieAnimation',
              title: 'Lottie Animation',
              type: 'file',
              description: 'Lottie animation JSON file for this section',
              options: {
                accept: '.json',
              },
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Display order (1, 2, 3, 4)',
              validation: (Rule) => Rule.required().min(1).max(4),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'policyAppsImage',
      title: 'Policy Apps Image',
      type: 'image',
      description: 'AVIF image displayed at the bottom of scroll sections',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'sections',
    },
    prepare({title, subtitle}) {
      const count = Array.isArray(subtitle) ? subtitle.length : 0
      return {
        title: title || 'Scroll Section',
        subtitle: `${count} section${count !== 1 ? 's' : ''}`,
      }
    },
  },
})

