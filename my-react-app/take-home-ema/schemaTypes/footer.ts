import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo & Tagline',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Logo Text',
          type: 'string',
          initialValue: 'Ema',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          description: 'Tagline displayed below the logo',
          initialValue: 'Your Universal AI Employee',
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Email address displayed in the button',
      initialValue: 'ask@ema.co',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      description: 'Physical address (use \\n for line breaks)',
      initialValue: '321 Castro St\nMountain View, CA 94041',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Platform Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter/X', value: 'twitter' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Footer Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Link Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'url',
                      title: 'Link URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
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
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'links',
            },
            prepare({title, subtitle}) {
              const count = Array.isArray(subtitle) ? subtitle.length : 0
              return {
                title: title,
                subtitle: `${count} link${count !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isButton',
              title: 'Is Button',
              type: 'boolean',
              description: 'If true, renders as a button instead of a link',
              initialValue: false,
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
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright text (year will be added automatically)',
      initialValue: '© 2024 Ema | Privacy Policy',
    }),
  ],
  preview: {
    select: {
      title: 'copyright',
    },
    prepare({title}) {
      return {
        title: 'Footer',
        subtitle: title || 'Site Footer Configuration',
      }
    },
  },
})

