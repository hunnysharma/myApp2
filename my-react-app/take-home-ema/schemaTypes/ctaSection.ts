import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'string',
      description: 'Main description text on the right side',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the CTA button',
      default: 'Hire Ema Today',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      description: 'URL for the CTA button',
      default: '#',
    }),
    defineField({
      name: 'circleImage',
      title: 'Circle Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Background image for the green circle (the entire circle design)',
      validation: (Rule) => Rule.required(),
    }),
    // Keep legacy fields for backward compatibility
    defineField({
      name: 'title',
      title: 'Title (Legacy)',
      type: 'string',
      description: 'Legacy field - use circleText instead',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (Legacy)',
      type: 'text',
      description: 'Legacy field - use description instead',
    }),
  ],
  preview: {
    select: {
      title: 'description',
      subtitle: 'buttonText',
    },
  },
})

