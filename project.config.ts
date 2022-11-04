import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

let env = dotenvExpand.expand(dotenv.config()).parsed;
const src = path.join(__dirname, env!.SRC);
const dist = path.join(__dirname, env!.DIST);

process.env = {
  ...process.env,
  ...{
    src,
    dist,
  },
};

/**
 * 下記は読み込み対象のファイルリストの生成
 *
 */
const listFiles = (dir) => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((dirent) =>
      dirent.isFile()
        ? [`${dir}/${dirent.name}`]
        : listFiles(`${dir}/${dirent.name}`)
    );
};

const js_dir = path.join(src, '/scripts'),
  js_entries = {},
  scss_dir = path.join(src, '/styles'),
  scss_dir_regexp = new RegExp(scss_dir),
  scss_entries = {};

listFiles(scss_dir).forEach((file) => {
  const filename = path.basename(file, '.scss');

  if (!filename.match(/^(_|\.)/)) {
    const dist_dir = file.replace(scss_dir_regexp, ''),
      dist_file = dist_dir.replace(/\.scss/, '.css');

    scss_entries[dist_file.slice(1)] = [path.resolve(__dirname, file)];
  }
});

const js_files = fs.readdirSync(js_dir);
js_files.forEach((file) => {
  if (file.match(/\.(js|ts|jsx|tsx)$/)) {
    const dist_file = file.replace(/\.(js|ts|jsx|tsx)$/, '');

    js_entries[dist_file] = [path.resolve(__dirname, `${js_dir}/${file}`)];
  }
});

const entries = {
  ...js_entries,
  ...scss_entries,
};

const ProjectConfig = {
  entries: entries,
};

export default ProjectConfig;
