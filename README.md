# Onyx

A documentation theme forked from [Hugo Alabaster
theme](https://github.com/digitalcraftsman/hugo-alabaster-theme). It is an
indirect port of [Sphinx](http://www.sphinx-doc.org/en/stable/).

# Requirements

You need to install the latest version of Go from
https://go.dev/doc/install because this theme component requires
[`hugo mod ..` commands](https://gohugo.io/hugo-modules/use-modules/)
to work.

This update on switch to using Hugo Modules was last tested with Hugo
v0.92.0.

# Installing this theme

To use this component,

1.  Add this to your site's TOML config file:

    ```toml
    [module]
      [[module.imports]]
        path = "github.com/kaushalmodi/hugo-onyx-theme"
    ```

2.  Run `hugo mod tidy` in your main site directory.

## Theme components

This theme is composed of the base theme "hugo-onyx-theme", and the
"hugo-debugprint" component (which gets auto-fetched using `hugo
mod`).

## Alabaster screenshot

[![Screenshot](https://raw.githubusercontent.com/digitalcraftsman/hugo-alabaster-theme/dev/images/screenshot.png)](https://digitalcraftsman.github.io/hugo-alabaster-theme/)

## Demo

[**Demo**][demo]

## Acknowledgements

I want to give a big shout-out to
[Digitalcraftsman](https://github.com/digitalcraftsman), and also to
the original theme (from which the Alabaster theme was ported) authors
[Jeff Forcier](https://github.com/bitprophet), [Kenneth
Reitz](https://github.com/kennethreitz) and [Armin
Ronacher](https://github.com/mitsuhiko).

Furthermore, thanks to [Steve Francia](https://github.com/spf13) for
creating Hugo, [Bjørn Erik Pedersen](https://github.com/bep) for
leading the current Hugo development, and the [awesome
community](https://github.com/spf13/hugo/graphs/contributors) around
the project.


## License

The theme is released under the BSD license. Read the
[license](https://github.com/kaushalmodi/hugo-onyx-theme/blob/master/LICENSE.md)
for more information.

[demo]: https://hugo-onyx.netlify.com/
