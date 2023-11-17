---
sidebar_label: Remove features
title: Removing features
---

When deploying the template, you may not wish to include every feature if you are deploying to an existing production environment that has prior customizations in place. Or, you may wish to deploy only a single feature from the template. There are two ways to remove features from the template:

- The `remove-features` script, which allows you to remove some or all features from the template, based on the parameters provided. This script also removes those feature references from GitHub Actions workflows and from flex-config JSON if necessary.
- Delete the individual feature directories from the plugin and serverless packages manually.

## Using the `remove-features` script

If you'd like to remove all features from the template, run the script without any arguments:

```bash
npm run remove-features
```

If you'd like to remove a few specific features, you may include them as additional arguments to the command. The following example will remove only the `chat-to-video-escalation` and `schedule-manager` features:

```bash
npm run remove-features chat-to-video-escalation schedule-manager
```

If you'd like to remove everything _except_ certain features, you may provide an `except` argument to the command, then list the features to keep as additional arguments. The following example will remove all features _except_ `admin-ui`, `attribute-viewer`, and `dual-channel-recording`:

```bash
npm run remove-features except admin-ui attribute-viewer dual-channel-recording
```

:::info Note
If you have already deployed to the environment before removing features, the configuration for removed features will remain in the environment, which will result in them appearing in the admin-ui panel. To remove these, run the deployment again with the `Override config set by Admin UI Panel?` option selected.
:::

## How it works

The `remove-features` script performs the following operations:

1. Remove feature references from the infra-as-code package
2. Remove feature references from flex-config JSON files
3. Remove feature directories from the Flex plugin
4. Remove feature directories from the serverless functions and assets
5. Remove the schedule-manager serverless package if the feature is not being excluded
6. Remove the chat-to-video-escalation web app package if the feature is not being excluded

For GitHub Action workflow modifications, the script looks for `# FEATURE:` and `# END FEATURE:` blocks within the workflow YAML. If that feature is being removed, the block(s) corresponding to that feature name are removed.

For flex-config JSON modifications, the script simply filters the `features` object keys to keep only the feature(s) not being removed.

For the rest of the removals, the script removes feature directories as appropriate.