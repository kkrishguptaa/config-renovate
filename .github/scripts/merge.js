// @ts-check
/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ core, github, exec }) => {
  core.startGroup('Fetching PRs');

  const { data: search } = await github.rest.search.issuesAndPullRequests({
    q: `owner:${process.env.TARGET} is:pr is:open label:"dependencies"`,
    sort: 'created'
  });

  core.info(`Found ${search.total_count} PRs`);

  core.endGroup();

  const prs = []

  for (const item of search.items) {
    const repo = item.repository_url.replace('https://api.github.com/repos/', '').split('/');

    const { data: pr } = await github.rest.pulls.get({
      owner: repo[0],
      repo: repo[1],
      pull_number: item.number
    });

    prs.push({
      repo: repo.join('/'),
      number: item.number,
      url: item.html_url,
      ref: pr.head.ref
    });
  }

  const failedPRs = [];

  for (const pr of prs) {
    core.startGroup(`${pr.repo}#${pr.number}`)

    const { check_runs: checks,  } = await github.paginate(github.rest.checks.listForRef, {
      owner: pr.repo.split('/')[0],
      repo: pr.repo.split('/')[1],
      ref: `${pr.ref}`
    });

    if (!checks) {
      core.info('No checks found');
    } else if (checks.every(check => check.conclusion === 'success')) {
      core.info('All checks passed');
    } else {
      failedPRs.push(pr);
      core.info('Some checks failed');
    }

    core.endGroup()
  }

  const lgtmPRs = prs.filter(pr => !failedPRs.includes(pr));

  if (lgtmPRs.length === 0) {
    core.info('No PRs to merge');
    return;
  }

  for (const pr of lgtmPRs) {
    core.startGroup(`${pr.repo}#${pr.number}`)

    await exec.exec('gh', ['pr', `-R=${pr.repo}`, 'merge', `${pr.number}`, '--admin', '--squash', '--delete-branch']);

    core.info(`Merged PR #${pr.number}`)

    core.endGroup()
  }

  core.notice(`${lgtmPRs.length} PRs merged successfully ― ${failedPRs.length} retained due to check failure`)
};
