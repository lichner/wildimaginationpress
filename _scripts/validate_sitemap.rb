#!/usr/bin/env ruby
# Sitemap Validation Script for Wild Imagination Press
# This script validates the generated sitemap.xml for SEO compliance

require 'nokogiri'
require 'uri'
require 'net/http'
require 'colorize'

class SitemapValidator
  def initialize(sitemap_path = '_site/sitemap.xml')
    @sitemap_path = sitemap_path
    @errors = []
    @warnings = []
    @stats = { total_urls: 0, valid_urls: 0, invalid_urls: 0 }
  end

  def validate
    puts "🔍 Validating sitemap: #{@sitemap_path}".cyan
    puts "=" * 50

    unless File.exist?(@sitemap_path)
      puts "❌ Sitemap file not found: #{@sitemap_path}".red
      return false
    end

    begin
      doc = Nokogiri::XML(File.read(@sitemap_path))
      
      validate_xml_structure(doc)
      validate_urls(doc)
      validate_priorities(doc)
      validate_changefreq(doc)
      
      print_results
      
    rescue => e
      puts "❌ Error parsing sitemap: #{e.message}".red
      return false
    end

    @errors.empty?
  end

  private

  def validate_xml_structure(doc)
    # Check for XML namespace
    unless doc.root && doc.root.namespace && doc.root.namespace.href == "http://www.sitemaps.org/schemas/sitemap/0.9"
      @errors << "Missing or incorrect XML namespace"
    end

    # Check for urlset root element
    unless doc.root.name == "urlset"
      @errors << "Root element should be 'urlset'"
    end
  end

  def validate_urls(doc)
    urls = doc.xpath('//xmlns:url', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9')
    @stats[:total_urls] = urls.length

    urls.each do |url_node|
      loc = url_node.at_xpath('xmlns:loc', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9')
      
      if loc.nil? || loc.text.empty?
        @errors << "URL missing location (loc)"
        @stats[:invalid_urls] += 1
        next
      end

      url_text = loc.text
      
      # Validate URL format
      begin
        uri = URI.parse(url_text)
        unless uri.kind_of?(URI::HTTP) || uri.kind_of?(URI::HTTPS)
          @errors << "Invalid URL format: #{url_text}"
          @stats[:invalid_urls] += 1
          next
        end
      rescue URI::InvalidURIError
        @errors << "Malformed URL: #{url_text}"
        @stats[:invalid_urls] += 1
        next
      end

      # Check for localhost URLs in production
      if url_text.include?('localhost') || url_text.include?('127.0.0.1') || url_text.include?('0.0.0.0')
        @warnings << "Development URL found in sitemap: #{url_text}"
      end

      @stats[:valid_urls] += 1
    end
  end

  def validate_priorities(doc)
    priorities = doc.xpath('//xmlns:priority', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9')
    
    priorities.each do |priority|
      value = priority.text.to_f
      if value < 0.0 || value > 1.0
        @errors << "Priority value out of range (0.0-1.0): #{value}"
      end
    end
  end

  def validate_changefreq(doc)
    valid_frequencies = %w[always hourly daily weekly monthly yearly never]
    changefreqs = doc.xpath('//xmlns:changefreq', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9')
    
    changefreqs.each do |freq|
      unless valid_frequencies.include?(freq.text)
        @errors << "Invalid changefreq value: #{freq.text}"
      end
    end
  end

  def print_results
    puts "\n📊 Validation Results:".cyan
    puts "-" * 30

    # Stats
    puts "Total URLs: #{@stats[:total_urls]}"
    puts "Valid URLs: #{@stats[:valid_urls]}".green
    puts "Invalid URLs: #{@stats[:invalid_urls]}".red if @stats[:invalid_urls] > 0

    # Errors
    if @errors.any?
      puts "\n❌ Errors (#{@errors.length}):".red
      @errors.each_with_index do |error, i|
        puts "  #{i + 1}. #{error}"
      end
    end

    # Warnings
    if @warnings.any?
      puts "\n⚠️  Warnings (#{@warnings.length}):".yellow
      @warnings.each_with_index do |warning, i|
        puts "  #{i + 1}. #{warning}"
      end
    end

    # Success message
    if @errors.empty?
      puts "\n✅ Sitemap validation passed!".green
      puts "🎉 Your sitemap is SEO-ready.".green
    else
      puts "\n❌ Sitemap validation failed.".red
      puts "🔧 Please fix the errors above.".yellow
    end
  end
end

# Run validation if script is executed directly
if __FILE__ == $0
  validator = SitemapValidator.new
  success = validator.validate
  exit(success ? 0 : 1)
end
