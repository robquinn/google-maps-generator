export default {
  launch: {
    headless: false,
    args: [
      '--force-color-profile=generic-rgb',
      '--font-render-hinting=none',
      '--disable-font-subpixel-positioning',
      '--enable-font-antialiasing',
      '--disable-gpu',
    ],
  },
  browserContext: 'default',
}
