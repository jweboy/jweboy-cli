import semver from 'semver';

export const checkNodeVersion = (expectedVersion: string, id: string) => {
  if (!semver.satisfies(process.version, expectedVersion, { includePrerelease: true })) {
    // log.print(
    //   log.warningColor('你正在使用 ') +
    //     log.infoColor(`Node ${process.version}`) +
    //     log.warningColor('，此版本的\b') +
    //     log.infoColor(id) +
    //     log.warningColor(' 需要 ') +
    //     log.infoColor(`Node ${expectedVersion}`) +
    //     log.warningColor('，请升级你的Node版本。'),
    // );
    process.exit(1);
  }
};
