import * as Flex from '@twilio/flex-ui';
import AppState from 'types/manager/AppState';
import sortBy from 'lodash/sortBy';
import { Activity } from 'types/task-router';

import { ActivitySkillFilterRules } from '../types/ServiceConfiguration';
import { getRules } from '../config';

export interface ActivityCssConfig {
  idx: number;
  display: string;
  order: number;
}

class AgentActivities {
  manager: Flex.Manager;

  config: ActivitySkillFilterRules;

  constructor() {
    this.manager = Flex.Manager.getInstance();

    // the supporting configuration for this utility is expected to be set
    // as a custom element on the ui_attributes of the flex configuration
    // see README for more details
    this.config = getRules();
  }

  // returns the rule for a particular activity
  // the rule is referenced by activity sid first, then activity
  // name and if no rule is found, a default rule is returned that
  // requires no skills
  getActivityRule = (activity: Activity) => {
    return this.config[activity.sid] || this.config[activity.name] || { required_skill: null, sort_order: 0 };
  };

  // Returns an array that holds CSS information for
  // which activities to show hide and what order they
  // should appear in.
  // this is used in the ActivityWrapper class that
  // targets the particular activity menu item using the index id
  getCSSConfig(): Array<ActivityCssConfig> {
    const { flex } = this.manager.store.getState() as AppState;
    const { activities } = flex.worker;

    const eligibleActivities = this.getEligibleActivities(flex.worker as unknown as Flex.IWorker);

    // for the CSS injection, we a loop through the activities and find the related
    // eligible activities entry to determine if its visible and what order it should
    // appear in.
    return Array.from(activities.values()).reduce((results, activity, idx) => {
      // default the cssConfig to hide this element
      const cssConfig: ActivityCssConfig = { idx, display: 'none', order: idx };

      const visible = eligibleActivities.find((eligibleActivity) => eligibleActivity.name === activity.name);
      const order = eligibleActivities.findIndex((eligibleActivity) => eligibleActivity.name === activity.name);

      if (visible) {
        // show the activity
        cssConfig.display = 'flex';
      }

      cssConfig.order = order;

      // return the element with all previous results into one array
      return [...results, cssConfig];
    }, [] as Array<ActivityCssConfig>);
  }

  // This will also include the worker's current activity even if it is not an allowed one, so that the menu can render the current state correctly
  getEligibleActivities(worker: Flex.IWorker): Array<Activity> {
    const { flex } = this.manager.store.getState() as AppState;
    const { attributes, activities } = flex.worker;
    const { routing = { skills: [], levels: {} } } = attributes;
    let skills = routing.skills || [];

    if (worker) {
      const { routing: agentRouting = { skills: [], levels: {} } } = worker.attributes;
      skills = agentRouting.skills || [];
    }

    const eligibleSkills = Array.from(activities.values()).reduce((results: any, activity) => {
      const activityRule = this.getActivityRule(activity);
      if (activityRule) {
        const { required_skill, sort_order } = activityRule;
        if (!required_skill || skills.includes(required_skill) || worker.activityName === activity.name) {
          return [...results, { sort_order, activity }];
        }
      } else if (worker.activityName === activity.name) {
        return [...results, { sort_order: -1, activity }];
      }
      return results;
    }, []);

    return sortBy(eligibleSkills, ['sort_order', 'activity.name']).map((result) => result.activity);
  }
}

export default new AgentActivities();
