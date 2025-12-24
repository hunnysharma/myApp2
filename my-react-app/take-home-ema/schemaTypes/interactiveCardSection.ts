import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'interactiveCardSection',
  title: 'Interactive Card Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the interactive card section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      description: 'Description text for the section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'beforeCard',
      title: 'Before Card',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          default: 'BEFORE',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'svgImage',
          title: 'SVG Image',
          type: 'image',
          description: 'SVG image for the "Before" card',
          options: {
            accept: 'image/svg+xml',
          },
        }),
      ],
    }),
    defineField({
      name: 'afterCard',
      title: 'After Card',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          default: 'AFTER',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'svgImage',
          title: 'SVG Image',
          type: 'image',
          description: 'SVG image for the "After" card',
          options: {
            accept: 'image/svg+xml',
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

