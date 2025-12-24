import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stickyHorizontalScroll',
  title: 'Sticky Horizontal Scroll',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      description: 'Small text above the main title (e.g., "Choose Ema\'s role to start")',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the sticky horizontal scroll section',
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
              name: 'image',
              title: 'Card Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Image for the card',
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
              media: 'image',
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
        title: title || 'Sticky Horizontal Scroll',
        subtitle: `${count} card${count !== 1 ? 's' : ''}`,
      }
    },
  },
})

