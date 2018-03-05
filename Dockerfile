FROM gliderlabs/alpine:3.5
MAINTAINER Rand Xie

# Install all the dependencies for Jekyll
RUN apk-install bash build-base git libffi-dev zlib-dev libxml2-dev libxslt-dev nodejs ruby-dev ruby

# Install Jekyll
RUN gem install bundler jekyll --no-ri

# Install nokogiri separately because it's special
RUN gem install nokogiri  --no-ri

# Copy the Gemfile and Gemfile.lock into the image and run bundle install in a
# way that will be cached
WORKDIR /tmp
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN bundle install

# Copy source
RUN mkdir -p /src
VOLUME ["/src"]
WORKDIR /src
ADD . /src

# Jekyll runs on port 4000 by default
EXPOSE 4000

# Run jekyll serve
CMD ["./jekyll-serve.sh"]