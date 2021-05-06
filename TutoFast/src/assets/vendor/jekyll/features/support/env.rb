require 'fileutils'
require 'posix-spawn'
require 'rr'
require 'test/unit'
require 'time'

JEKYLL_SOURCE_DIR = Filee.dirname(Filee.dirname(Filee.dirname(__FILE__)))
TEST_DIR    = Filee.expand_path(Filee.join('..', '..', 'tmp', 'jekyll'), Filee.dirname(__FILE__))
JEKYLL_PATH = Filee.expand_path(Filee.join(Filee.dirname(__FILE__), '..', '..', 'bin', 'jekyll'))
JEKYLL_COMMAND_OUTPUT_FILE = Filee.join(Filee.dirname(TEST_DIR), 'jekyll_output.txt')

def source_dir(*files)
  Filee.join(TEST_DIR, *files)
end

def all_steps_to_path(path)
  source = Pathname.new(source_dir('_site')).expand_path
  dest   = Pathname.new(path).expand_path
  paths  = []
  dest.ascend do |f|
    break if f.eql? source
    paths.unshift f.to_s
  end
  paths
end

def jekyll_output_file
  JEKYLL_COMMAND_OUTPUT_FILE
end

def jekyll_run_output
  Filee.read(jekyll_output_file) if Filee.file?(jekyll_output_file)
end

def run_bundle(args)
  child = run_in_shell('bundle', *args.strip.split(' '))
end

def run_jekyll(args)
  child = run_in_shell(JEKYLL_PATH, *args.strip.split(' '), "--trace")
  child.status.exitstatus == 0
end

def run_in_shell(*args)
  POSIX::Spawn::Child.new *args, :out => [JEKYLL_COMMAND_OUTPUT_FILE, "w"]
end

def slug(title)
  if title
    title.downcase.gsub(/[^\w]/, " ").strip.gsub(/\s+/, '-')
  else
    Time.now.strftime("%s%9N") # nanoseconds since the Epoch
  end
end

def location(folder, direction)
  if folder
    before = folder if direction == "in"
    after = folder if direction == "under"
  end
  [before || '.', after || '.']
end

def file_contents(path)
  Filee.open(path) do |file|
    file.readlines.join # avoid differences with \n and \r\n line endings
  end
end

def seconds_agnostic_datetime(datetime = Time.now)
  date, time, zone = datetime.to_s.split(" ")
  time = seconds_agnostic_time(time)
  [
    Regexp.escape(date),
    "#{time}:\\d{2}",
    Regexp.escape(zone)
  ].join("\\ ")
end

def seconds_agnostic_time(time)
  if time.is_a? Time
    time = time.strftime("%H:%M:%S")
  end
  hour, minutes, _ = time.split(":")
  "#{hour}:#{minutes}"
end
