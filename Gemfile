source "https://rubygems.org"

# Use github-pages gem for GitHub Pages compatibility
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# wdm is optional - provides faster file watching on Windows
# Skip if it fails to build (requires MSYS2 DevKit)
gem "wdm", "~> 0.2", :platforms => [:mingw, :x64_mingw, :mswin], :require => false
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]