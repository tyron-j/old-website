:: compiles all the less files to css files

cd C:\Users\Tyron\Documents\GitHub\website\styles

call lessc -x less/base.less > compiled/base.css
call lessc -x less/main.less > compiled/main.css
call lessc -x less/portfolio.less > compiled/portfolio.css

cd C:\Users\Tyron\Documents\GitHub\website