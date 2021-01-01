
JS_DIR := ui
JS_SRC := $(shell find $(JS_DIR) -name "*.js")
JS_DST := $(patsubst $(JS_DIR)/%, .cache/%, $(JS_SRC))

CSS_SRC := $(shell find $(JS_DIR) -name "*.css" -or -name "*.scss")

FA_DIR := node_modules/@fortawesome/fontawesome-free/webfonts
FA_SRC := $(wildcard $(FA_DIR)/*.ttf) $(wildcard $(FA_DIR)/*.woff) $(wildcard $(FA_DIR)/*.woff2) $(wildcard $(FA_DIR)/*.eot)
FA_DST := $(patsubst $(FA_DIR)/%, build/webfonts/%, $(FA_SRC))
FA_DST2 := $(patsubst $(FA_DIR)/%, prod/webfonts/%, $(FA_SRC))


.cache/%: $(JS_DIR)/%
	@test -d $(dirname $@) || mkdir -p $(dirname $@)
	@npx babel --out-file $@ $<

build/app.js: $(JS_DST)
	@test -d $(dirname $<) || mkdir -p $(dirname $<)
	@npx browserify \
		-g [ envify --NODE_ENV development ] \
		-x react \
		-x react-dom \
		-x react-redux \
		-x react-modal \
		-x react-router-dom \
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

prod/app.js: $(JS_DST)
	@test -d $(dirname $<) || mkdir -p $(dirname $<)
	@npx browserify \
		-g [ envify --NODE_ENV production ] \
		-g uglifyify \
		-x react \
		-x react-dom \
		-x react-redux \
		-x react-modal \
		-x react-router-dom \
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
		.cache/index.js | npx terser --compress --mangle > $@

build/bundle.js:
	@test -d build || mkdir -p build
	@npx browserify \
	    -t babelify \
	    -g [ envify --NODE_ENV development ] \
	    -r react \
	    -r react-dom \
	    -r react-redux \
	    -r react-modal \
	    -r react-router-dom \
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
	    > $@

prod/bundle.js:
	@test -d prod || mkdir -p prod
	@npx browserify \
	    -t babelify \
	    -g [ envify --NODE_ENV production ] \
	    -g uglifyify \
	    -r react \
	    -r react-dom \
	    -r react-redux \
	    -r react-modal \
	    -r react-router-dom \
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
	    | npx terser --compress --mangle > $@

build/styles.css: $(CSS_SRC)
	@test -d build || mkdir -p build
	@npx postcss \
		--env=development \
		ui/index.scss \
		-o $@

prod/styles.css: $(CSS_SRC)
	@test -d prod || mkdir -p prod
	@npx postcss \
		--env=production \
		ui/index.scss \
		-o $@

build/webfonts/%: $(FA_DIR)/%
	@test -d build/webfonts || mkdir -p build/webfonts
	@cp $< $@

prod/webfonts/%: $(FA_DIR)/%
	@test -d prod/webfonts || mkdir -p prod/webfonts
	@cp $< $@

build/index.html: $(JS_DIR)/index.html
	@test -d build || mkdir -p build
	@cp $< $@

prod/index.html: $(JS_DIR)/index.html
	@test -d prod || mkdir -p prod
	@cp $< $@

build/manifest.json: $(JS_DIR)/manifest.json
	@test -d build || mkdir -p build
	@cp $< $@

prod/manifest.json: $(JS_DIR)/manifest.json
	@test -d prod || mkdir -p prod
	@cp $< $@

build/favicon.ico: $(JS_DIR)/favicon.ico
	@test -d build || mkdir -p build
	@cp $< $@

prod/favicon.ico: $(JS_DIR)/favicon.ico
	@test -d prod || mkdir -p prod
	@cp $< $@

dev: build/styles.css build/bundle.js build/app.js build/index.html build/favicon.ico build/manifest.json $(FA_DST)

prod: prod/styles.css prod/bundle.js prod/app.js prod/index.html prod/favicon.ico prod/manifest.json $(FA_DST2)

all: dev prod
