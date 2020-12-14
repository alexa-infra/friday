
JS_DIR := ui
JS_SRC := $(shell find $(JS_DIR) -name "*.js")
JS_DST := $(patsubst $(JS_DIR)/%, .cache/%, $(JS_SRC))

CSS_SRC := $(shell find $(JS_DIR) -name "*.css" -or -name "*.scss")

FA_DIR := node_modules/@fortawesome/fontawesome-free/webfonts
FA_SRC := $(wildcard $(FA_DIR)/*.ttf) $(wildcard $(FA_DIR)/*.woff) $(wildcard $(FA_DIR)/*.woff2) $(wildcard $(FA_DIR)/*.eot)
FA_DST := $(patsubst $(FA_DIR)/%, build/webfonts/%, $(FA_SRC))


.cache/%: $(JS_DIR)/%
	@test -d $(dirname $@) || mkdir -p $(dirname $@)
	@npx babel \
    		--presets \@babel/preset-env,\@babel/preset-react \
		--plugins \@babel/plugin-proposal-class-properties \
    		--out-file $@ $<

build/app.js: $(JS_DST)
	@test -d $(dirname $<) || mkdir -p $(dirname $<)
	@npx browserify \
		-x react \
		-x react-dom \
		-x react-redux \
		-x react-bootstrap/Navbar \
		-x react-bootstrap/Nav \
		-x react-bootstrap/Modal \
		-x react-router-dom \
		-x react-router-bootstrap \
		-x \@reduxjs/toolkit \
		-x react-final-form \
		-x dayjs \
		-x dayjs/plugin/relativeTime \
		-x dayjs/plugin/customParseFormat \
		-x dayjs/plugin/isSameOrBefore \
		-x dayjs/plugin/isoWeek \
		-x classnames \
		-x core-js/stable \
		-x regenerator-runtime/runtime \
		.cache/index.js -o $@

build/bundle.js:
	@npx browserify \
	    -t [ babelify --presets [ \@babel/preset-env \@babel/preset-react ] --plugins [ \@babel/plugin-proposal-class-properties ] ] \
	    -r react \
	    -r react-dom \
	    -r react-redux \
	    -r react-bootstrap/Navbar \
	    -r react-bootstrap/Nav \
	    -r react-bootstrap/Modal \
	    -r react-router-dom \
	    -r react-router-bootstrap \
	    -r @reduxjs/toolkit \
	    -r react-final-form \
	    -r dayjs \
	    -r dayjs/plugin/relativeTime \
	    -r dayjs/plugin/customParseFormat \
	    -r dayjs/plugin/isSameOrBefore \
	    -r dayjs/plugin/isoWeek \
	    -r classnames \
	    -r core-js/stable \
	    -r regenerator-runtime/runtime \
	    -o $@

build/styles.css: $(CSS_SRC)
	@npx postcss ui/index.scss --use postcss-import postcss-nested autoprefixer -o $@

build/webfonts/%: $(FA_DIR)/%
	@test -d build/webfonts || mkdir -p build/webfonts
	@cp $< $@

build/index.html: $(JS_DIR)/index.html
	@test -d build || mkdir -p build
	@cp $< $@

build/manifest.json: $(JS_DIR)/manifest.json
	@test -d build || mkdir -p build
	@cp $< $@

build/favicon.ico: $(JS_DIR)/favicon.ico
	@test -d build || mkdir -p build
	@cp $< $@

all: build/styles.css build/bundle.js build/app.js build/index.html build/favicon.ico build/manifest.json $(FA_DST)

build/styles.min.css: build/styles.css
	@npx postcss -o build/styles.min.css build/styles.css --use cssnano

build/app.min.js: build/app.js
	@npx babel --presets minify --out-file build/app.min.js build/app.js

build/bundle.min.js: build/bundle.js
	@npx babel --presets minify --out-file build/bundle.min.js build/bundle.js

minify: build/styles.min.css build/bundle.min.js build/app.min.js
