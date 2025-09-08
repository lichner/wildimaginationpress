#!/usr/bin/env ruby
# Combined SEO Validation Script for Wild Imagination Press
# This script runs both robots.txt and sitemap.xml validation

require_relative 'validate_robots'
require_relative 'validate_sitemap'

class SEOValidator
  def initialize
    @robots_validator = RobotsValidator.new('_site/robots.txt')
    @sitemap_validator = SitemapValidator.new('_site/sitemap.xml')
  end

  def validate_all
    puts "🚀 Starting SEO Validation Suite for Wild Imagination Press".green
    puts "=" * 60
    
    robots_valid = validate_robots
    puts "\n" + "=" * 60
    sitemap_valid = validate_sitemap
    
    print_overall_results(robots_valid, sitemap_valid)
    
    robots_valid && sitemap_valid
  end

  private

  def validate_robots
    puts "\n🤖 ROBOTS.TXT VALIDATION".cyan
    @robots_validator.validate
  end

  def validate_sitemap
    puts "\n🔍 SITEMAP.XML VALIDATION".cyan
    @sitemap_validator.validate
  end

  def print_overall_results(robots_valid, sitemap_valid)
    puts "\n" + "=" * 60
    puts "🏆 OVERALL SEO VALIDATION RESULTS".magenta
    puts "=" * 60

    if robots_valid && sitemap_valid
      puts "✅ ALL VALIDATIONS PASSED!".green
      puts "🎉 Your site is SEO-optimized and ready for search engines.".green
      puts ""
      puts "Next steps:".cyan
      puts "• Submit your sitemap to Google Search Console"
      puts "• Test robots.txt with Google's robots.txt Tester"
      puts "• Monitor search engine indexing status"
    else
      puts "❌ SOME VALIDATIONS FAILED".red
      puts ""
      puts "Issues found:".yellow
      puts "• Robots.txt: #{robots_valid ? '✅ Valid' : '❌ Errors found'}"
      puts "• Sitemap.xml: #{sitemap_valid ? '✅ Valid' : '❌ Errors found'}"
      puts ""
      puts "Please fix the issues above before deploying to production.".yellow
    end
  end
end

# Run validation if script is executed directly
if __FILE__ == $0
  validator = SEOValidator.new
  success = validator.validate_all
  exit(success ? 0 : 1)
end
