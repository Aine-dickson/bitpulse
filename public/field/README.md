# Field services photos

Drop real installation photos here. They render in the "Our work" grid on
`/field`, which is the section that does the actual convincing: the visitor has
already met Aine and is checking the business is real.

## Filenames

Use exactly these names, then set `ready: true` for that entry in
`src/data/field.ts`:

```
work-01.webp
work-02.webp
work-03.webp
work-04.webp
work-05.webp
work-06.webp
```

Until a photo is marked ready the page draws a labelled placeholder instead of
requesting the file, so there is never a broken image and never a wasted request
on a metered connection. A partial set is fine and still looks deliberate.

## Requirements

- **4:3 landscape**, 800x600 or larger. The grid reserves a 4:3 box via
  `width`/`height`, so an off-ratio photo will be cropped, not shifted.
- **WebP**, quality ~80. Aim for under 80KB each; they are lazy-loaded, but this
  page is built for 3G.
- **Real jobs only.** No stock photography, no renders, no photos of someone
  else's work. The whole section is worthless if any of it is invented.
- **Faces:** get permission, or frame the work rather than the people. Avoid
  photographing pupils.
- **Don't include** anything that leaks a client's security posture: full camera
  layouts, router passwords on a whiteboard, visible serial numbers.

## Captions

Rewrite the caption in `src/data/field.ts` to match what the photo actually
shows. Keep it factual and short: "Access point mounted in a school corridor",
not "Transforming connectivity for education". No client names without written
permission.

## Converting

```bash
# from a phone photo, with ImageMagick
magick input.jpg -resize 1200x900^ -gravity center -extent 1200x900 -quality 80 work-01.webp
```
