/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - elements contextually close to each other
 * 2 = smaller - for groups of closely related items or perhaps borders
 * 3 = small   - ?
 * 4 = medium  - ?
 * 5 = medium+ - ?
 * 6 = large   - between groups of content that aren't related?
 * 7 = huge    - ?
 * 8 = massive - an uncomfortable amount of whitespace
 */

export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64]

type SpacingScale =
  | 'none'
  | 'tiny'
  | 'smaller'
  | 'small'
  | 'medium'
  | 'medium+'
  | 'large'
  | 'huge'
  | 'massive'

type Spacing = { [K in SpacingScale]: number }

export const NamedSpacing: Spacing = [
  'none',
  'tiny',
  'smaller',
  'small',
  'medium+',
  'medium',
  'large',
  'huge',
  'massive',
].reduce((acc, key: SpacingScale, index) => {
  acc[key] = spacing[index]
  return acc
}, {} as Spacing)
