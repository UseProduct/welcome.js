![Foyer banner logo](assets/foyer-text-logo.png)

<div style="height:50px"></div>

# Foyer.js

![Hero](assets/screenshot.png)

A friendly jumping off point for your users to get support. Designed for SaaS products that care about their customer experience.

## How to get started

The most comprehensive examples can be found in [/examples](/examples).

To add Foyer to your site:

```js
<script src="https://unpkg.com/@hiyaio/foyer/foyer.js"></script>
<script>
foyer.init({
  sections: [
    {
      label: "Help & support",
      href: "https://github.com/hiyaio/foyer.js/issues",
    },
  ]
})
</script>
```

## Tasks

- [ ] Add hosted demo page
- [ ] Add multi-section (groups) support
- [ ] Add custom event trigger support for section items
- [ ] Add full options documentation to Readme

## Contributing & running locally

Looking to develop Foyer for contributing/forking, great! Just run:

```
yarn start
```

This should build and run a demo environment for you to test on http://localhost:1234/.
