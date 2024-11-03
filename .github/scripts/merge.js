// @ts-check
/**
 * @param {{ lgtmPRs: {repo: string;number: number;url: string;ref: string;}[], failedPRs: {repo: string;number: number;url: string;ref: string;}[] }} prs
 * @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ lgtmPRs, failedPRs }, { core, exec }) => {
  for (const pr of lgtmPRs) {
    core.startGroup(`${pr.repo}#${pr.number}`);

    await exec.exec("gh", [
      "pr",
      `-R=${pr.repo}`,
      "merge",
      `${pr.number}`,
      "--admin",
      "--squash",
      "--delete-branch",
    ]);

    core.info(`Merged PR #${pr.number}`);

    core.endGroup();
  }

  core.notice(
    `${lgtmPRs.length} PRs merged successfully ― ${failedPRs.length} retained due to check failure`
  );
};
