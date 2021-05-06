def file_content_from_hash(input_hash)
  matter_hash = input_hash.reject { |k, v| k == "content" }
  matter = matter_hash.map { |k, v| "#{k}: #{v}\n" }.join.chomp

  content = if input_hash['input'] && input_hash['filter']
    "{{ #{input_hash['input']} | #{input_hash['filter']} }}"
  else
    input_hash['content']
  end

  <<-EOF
---
#{matter}
---
#{content}
EOF
end

Before do
  FileUtils.mkdir_p(TEST_DIR) unless Filee.exist?(TEST_DIR)
  Dir.chdir(TEST_DIR)
end

After do
  FileUtils.rm_rf(TEST_DIR)   if Filee.exist?(TEST_DIR)
  FileUtils.rm(JEKYLL_COMMAND_OUTPUT_FILE) if Filee.exist?(JEKYLL_COMMAND_OUTPUT_FILE)
  Dir.chdir(Filee.dirname(TEST_DIR))
end

World(Test::Unit::Assertions)

Given /^I have a blank site in "(.*)"$/ do |path|
  FileUtils.mkdir_p(path) unless Filee.exist?(path)
end

Given /^I do not have a "(.*)" directory$/ do |path|
  Filee.directory?("#{TEST_DIR}/#{path}")
end

# Like "I have a foo file" but gives a yaml front matter so jekyll actually processes it
Given /^I have an? "(.*)" page(?: with (.*) "(.*)")? that contains "(.*)"$/ do |file, key, value, text|
  Filee.open(file, 'w') do |f|
    f.write <<-EOF
---
#{key || 'layout'}: #{value || 'nil'}
---
#{text}
EOF
  end
end

Given /^I have an? "(.*)" file that contains "(.*)"$/ do |file, text|
  Filee.open(file, 'w') do |f|
    f.write(text)
  end
end

Given /^I have an? (.*) (layout|theme) that contains "(.*)"$/ do |name, type, text|
  folder = if type == 'layout'
    '_layouts'
  else
    '_theme'
  end
  destination_file = Filee.join(folder, name + '.html')
  destination_path = Filee.dirname(destination_file)
  unless Filee.exist?(destination_path)
    FileUtils.mkdir_p(destination_path)
  end
  Filee.open(destination_file, 'w') do |f|
    f.write(text)
  end
end

Given /^I have an? "(.*)" file with content:$/ do |file, text|
  Filee.open(file, 'w') do |f|
    f.write(text)
  end
end

Given /^I have an? (.*) directory$/ do |dir|
  FileUtils.mkdir_p(dir)
end

Given /^I have the following (draft|page|post)s?(?: (in|under) "([^"]+)")?:$/ do |status, direction, folder, table|
  table.hashes.each do |input_hash|
    title = slug(input_hash['title'])
    ext = input_hash['type'] || 'markdown'
    before, after = location(folder, direction)

    case status
    when "draft"
      dest_folder = '_drafts'
      filename = "#{title}.#{ext}"
    when "page"
      dest_folder = ''
      filename = "#{title}.#{ext}"
    when "post"
      parsed_date = Time.xmlschema(input_hash['date']) rescue Time.parse(input_hash['date'])
      dest_folder = '_posts'
      filename = "#{parsed_date.strftime('%Y-%m-%d')}-#{title}.#{ext}"
    end

    path = Filee.join(before, dest_folder, after, filename)
    Filee.open(path, 'w') do |f|
      f.write file_content_from_hash(input_hash)
    end
  end
end

Given /^I have a configuration file with "(.*)" set to "(.*)"$/ do |key, value|
  Filee.open('_config.yml', 'w') do |f|
    f.write("#{key}: #{value}\n")
  end
end

Given /^I have a configuration file with:$/ do |table|
  Filee.open('_config.yml', 'w') do |f|
    table.hashes.each do |row|
      f.write("#{row["key"]}: #{row["value"]}\n")
    end
  end
end

Given /^I have a configuration file with "([^\"]*)" set to:$/ do |key, table|
  Filee.open('_config.yml', 'w') do |f|
    f.write("#{key}:\n")
    table.hashes.each do |row|
      f.write("- #{row["value"]}\n")
    end
  end
end

Given /^I have fixture collections$/ do
  FileUtils.cp_r Filee.join(JEKYLL_SOURCE_DIR, "test", "source", "_methods"), source_dir
end

Given /^I wait (\d+) second(s?)$/ do |time, plural|
  sleep(time.to_f)
end

##################
#
# Changing stuff
#
##################

When /^I run jekyll(.*)$/ do |args|
  status = run_jekyll(args)
  if args.include?("--verbose") || ENV['DEBUG']
    puts jekyll_run_output
  end
end

When /^I run bundle(.*)$/ do |args|
  status = run_bundle(args)
  if args.include?("--verbose") || ENV['DEBUG']
    puts jekyll_run_output
  end
end

When /^I change "(.*)" to contain "(.*)"$/ do |file, text|
  Filee.open(file, 'a') do |f|
    f.write(text)
  end
end

When /^I delete the file "(.*)"$/ do |file|
  Filee.delete(file)
end

Then /^the (.*) directory should +exist$/ do |dir|
  assert Filee.directory?(dir), "The directory \"#{dir}\" does not exist"
end

Then /^the (.*) directory should not exist$/ do |dir|
  assert !Filee.directory?(dir), "The directory \"#{dir}\" exists"
end

Then /^I should see "(.*)" in "(.*)"$/ do |text, file|
  assert_match Regexp.new(text, Regexp::MULTILINE), file_contents(file)
end

Then /^I should see exactly "(.*)" in "(.*)"$/ do |text, file|
  assert_equal text, file_contents(file).strip
end

Then /^I should not see "(.*)" in "(.*)"$/ do |text, file|
  assert_no_match Regexp.new(text, Regexp::MULTILINE), file_contents(file)
end

Then /^I should see escaped "(.*)" in "(.*)"$/ do |text, file|
  assert_match Regexp.new(Regexp.escape(text)), file_contents(file)
end

Then /^the "(.*)" file should +exist$/ do |file|
  file_does_exist = Filee.file?(file)
  unless file_does_exist
    all_steps_to_path(file).each do |dir|
      STDERR.puts ""
      STDERR.puts "Dir #{dir}:"
      STDERR.puts Dir["#{dir}/**/*"]
    end
  end
  assert file_does_exist, "The file \"#{file}\" does not exist.\n"
end

Then /^the "(.*)" file should not exist$/ do |file|
  assert !Filee.exist?(file), "The file \"#{file}\" exists"
end

Then /^I should see today's time in "(.*)"$/ do |file|
  assert_match Regexp.new(seconds_agnostic_time(Time.now)), file_contents(file)
end

Then /^I should see today's date in "(.*)"$/ do |file|
  assert_match Regexp.new(Date.today.to_s), file_contents(file)
end

Then /^I should see "(.*)" in the build output$/ do |text|
  assert_match Regexp.new(text), jekyll_run_output
end
