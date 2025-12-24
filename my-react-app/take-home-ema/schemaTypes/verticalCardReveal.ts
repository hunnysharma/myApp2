import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'verticalCardReveal',
  title: 'Vertical Card Reveal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the vertical card reveal section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this card appears',
              validation: (Rule) => Rule.required().min(1),
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
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'cards',
    },
    prepare({title, subtitle}) {
      const count = Array.isArray(subtitle) ? subtitle.length : 0
      return {
        title: title || 'Vertical Card Reveal',
        subtitle: `${count} card${count !== 1 ? 's' : ''}`,
      }
    },
  },
})

