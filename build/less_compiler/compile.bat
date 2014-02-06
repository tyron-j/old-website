:: compiles all the less files to css files

cd C:\Users\Tyron\Documents\GitHub\website\styles

call lessc -x less/about.less > compiled/about.css
call lessc -x less/base.less > compiled/base.css
call lessc -x less/externals.less > compiled/externals.css
call lessc -x less/gallery.less > compiled/gallery.css
call lessc -x less/main.less > compiled/main.css
call lessc -x less/portfolio.less > compiled/portfolio.css
call lessc -x less/resume.less > compiled/resume.css
call lessc -x less/slideshow.less > compiled/slideshow.css

cd C:\Users\Tyron\Documents\GitHub\website