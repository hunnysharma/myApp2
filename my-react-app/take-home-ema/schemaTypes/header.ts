import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Logo Text',
          type: 'string',
          default: 'Ema',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Logo Image',
          type: 'image',
          description: 'Optional logo image (if not using text)',
        }),
        defineField({
          name: 'link',
          title: 'Logo Link',
          type: 'url',
          default: '/',
        }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hasDropdown',
              title: 'Has Dropdown',
              type: 'boolean',
              default: false,
            }),
            defineField({
              name: 'dropdownItems',
              title: 'Dropdown Items',
              type: 'array',
              of: [{type: 'string'}],
              hidden: ({parent}) => !parent?.hasDropdown,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          default: 'Hire Ema',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'dropdownArrow',
      title: 'Dropdown Arrow SVG',
      type: 'image',
      description: 'SVG image for dropdown arrow icon (optional - will use text fallback if not provided)',
      options: {
        accept: 'image/svg+xml',
      },
    }),
  ],
  preview: {
    select: {
      title: 'logo.text',
    },
    prepare({title}) {
      return {
        title: title || 'Header',
        subtitle: 'Site Header Configuration',
      }
    },
  },
})

