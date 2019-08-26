import fs from 'fs';
import path from 'path';

/**
 * Recursively and asyncronusly walk a directory, and return an array of found
 * file paths (wrapped in a promise).
 * @param  dir The directory to walk.
 * @return     Resolves with an array of file paths found. Rejects with any
 *             errors encountered.
 * @see https://stackoverflow.com/a/5827895/5013691
 */
export function fileWalk(dir: string): Promise<string[]> {
  let results: string[] = [];

  return new Promise((resolve, reject) => fs.readdir(dir, (err, list) => {
    if (err) {
      return reject(err);
    }

    let pending = list.length;

    if (!pending) {
      return resolve(results);
    }

    list.forEach((file) => {
      const filePath = path.resolve(dir, file);

      fs.stat(filePath, (err, stat) => {
        if (err) {
          return reject(err);
        }

        // If directory, recurse
        if (stat && stat.isDirectory()) {
          fileWalk(filePath)
            .then((res) => {
              results = results.concat(res);
              pending--;
              if (!pending) {
                return resolve(results);
              }
            })
            .catch(reject);
        }
        else {
          results.push(filePath);
          pending--;
          if (!pending) {
            return resolve(results);
          }
        }
      });
    });
  }));
};
