#!/usr/bin/env ruby
# Robots.txt Validation Script for Wild Imagination Press
# This script validates the robots.txt file for SEO compliance

require 'uri'
require 'colorize'

class RobotsValidator
  def initialize(robots_path = 'robots.txt')
    @robots_path = robots_path
    @errors = []
    @warnings = []
    @user_agents = []
    @sitemaps = []
  end

  def validate
    puts "🤖 Validating robots.txt: #{@robots_path}".cyan
    puts "=" * 50

    unless File.exist?(@robots_path)
      puts "❌ Robots.txt file not found: #{@robots_path}".red
      return false
    end

    begin
      content = File.read(@robots_path)
      
      # Process content line by line
      lines = content.split("\n")
      current_user_agent = nil
      
      lines.each_with_index do |line, index|
        line_num = index + 1
        line = line.strip
        
        # Skip empty lines and comments
        next if line.empty? || line.start_with?('#')
        
        validate_line(line, line_num, current_user_agent)
        
        # Track current user-agent context
        if line.downcase.start_with?('user-agent:')
          current_user_agent = line.split(':', 2).last.strip
          @user_agents << current_user_agent
        end
      end
      
      validate_structure
      print_results
      
    rescue => e
      puts "❌ Error reading robots.txt: #{e.message}".red
      return false
    end

    @errors.empty?
  end

  private

  def validate_line(line, line_num, current_user_agent)
    case line.downcase
    when /^user-agent:/
      validate_user_agent(line, line_num)
    when /^disallow:/
      validate_directive(line, line_num, 'Disallow', current_user_agent)
    when /^allow:/
      validate_directive(line, line_num, 'Allow', current_user_agent)
    when /^sitemap:/
      validate_sitemap(line, line_num)
    when /^crawl-delay:/
      validate_crawl_delay(line, line_num)
    when /^host:/
      validate_host(line, line_num)
    else
      # Check for common typos
      if line.match(/^(dis|dis-?allow|user-?agent|site-?map):/i)
        @errors << "Line #{line_num}: Possible typo in directive: '#{line}'"
      else
        @warnings << "Line #{line_num}: Unknown directive: '#{line}'"
      end
    end
  end

  def validate_user_agent(line, line_num)
    value = line.split(':', 2).last.strip
    if value.empty?
      @errors << "Line #{line_num}: User-agent value cannot be empty"
    end
    
    # Common user-agents validation
    common_bots = %w[* Googlebot Bingbot Slurp facebookexternalhit Twitterbot]
    unless common_bots.any? { |bot| value.include?(bot) } || value == '*'
      @warnings << "Line #{line_num}: Uncommon user-agent specified: '#{value}'"
    end
  end

  def validate_directive(line, line_num, directive, current_user_agent)
    if current_user_agent.nil?
      @errors << "Line #{line_num}: #{directive} directive without User-agent"
      return
    end
    
    path = line.split(':', 2).last.strip
    
    # Validate path format
    if path.empty?
      @errors << "Line #{line_num}: #{directive} path cannot be empty"
    elsif !path.start_with?('/')
      @errors << "Line #{line_num}: #{directive} path should start with '/': '#{path}'"
    end
    
    # Check for common patterns
    if path.include?('*') && !path.match(/\*[\w\/]*$/)
      @warnings << "Line #{line_num}: Wildcard pattern might not work as expected: '#{path}'"
    end
  end

  def validate_sitemap(line, line_num)
    url = line.split(':', 2).last.strip
    @sitemaps << url
    
    if url.empty?
      @errors << "Line #{line_num}: Sitemap URL cannot be empty"
      return
    end
    
    # Validate URL format
    begin
      uri = URI.parse(url)
      unless uri.kind_of?(URI::HTTP) || uri.kind_of?(URI::HTTPS)
        @errors << "Line #{line_num}: Sitemap must be a valid HTTP/HTTPS URL: '#{url}'"
      end
      
      unless url.end_with?('.xml')
        @warnings << "Line #{line_num}: Sitemap URL should typically end with .xml: '#{url}'"
      end
      
    rescue URI::InvalidURIError
      @errors << "Line #{line_num}: Invalid sitemap URL: '#{url}'"
    end
  end

  def validate_crawl_delay(line, line_num)
    delay = line.split(':', 2).last.strip
    
    begin
      delay_value = Float(delay)
      if delay_value < 0
        @errors << "Line #{line_num}: Crawl-delay cannot be negative: #{delay}"
      elsif delay_value > 86400 # 24 hours
        @warnings << "Line #{line_num}: Very high crawl-delay (#{delay} seconds). Consider if this is necessary."
      end
    rescue ArgumentError
      @errors << "Line #{line_num}: Crawl-delay must be a number: '#{delay}'"
    end
  end

  def validate_host(line, line_num)
    host = line.split(':', 2).last.strip
    
    if host.empty?
      @errors << "Line #{line_num}: Host value cannot be empty"
      return
    end
    
    begin
      uri = URI.parse("http://#{host}")
      unless uri.host
        @errors << "Line #{line_num}: Invalid host format: '#{host}'"
      end
    rescue URI::InvalidURIError
      @errors << "Line #{line_num}: Invalid host: '#{host}'"
    end
  end

  def validate_structure
    if @user_agents.empty?
      @errors << "No User-agent directives found. At least one is required."
    end
    
    if @sitemaps.empty?
      @warnings << "No sitemap specified. Consider adding sitemap location."
    end
    
    # Check for overly restrictive rules (only if Disallow: / without Allow: /)
    content = File.read(@robots_path)
    if @user_agents.include?('*') && content.include?('Disallow: /') && !content.include?('Allow: /')
      @warnings << "Site appears to be completely blocked for all crawlers. Is this intended?"
    end
  end

  def print_results
    puts "\n🤖 Validation Results:".cyan
    puts "-" * 30

    # Stats
    puts "User-agents found: #{@user_agents.length}"
    puts "Sitemaps specified: #{@sitemaps.length}"
    
    if @user_agents.any?
      puts "User-agents: #{@user_agents.join(', ')}"
    end
    
    if @sitemaps.any?
      puts "Sitemaps:"
      @sitemaps.each { |sitemap| puts "  - #{sitemap}" }
    end

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
      puts "\n✅ Robots.txt validation passed!".green
      puts "🤖 Your robots.txt is properly configured.".green
    else
      puts "\n❌ Robots.txt validation failed.".red
      puts "🔧 Please fix the errors above.".yellow
    end
  end
end

# Run validation if script is executed directly
if __FILE__ == $0
  robots_path = ARGV[0] || 'robots.txt'
  validator = RobotsValidator.new(robots_path)
  success = validator.validate
  exit(success ? 0 : 1)
end
