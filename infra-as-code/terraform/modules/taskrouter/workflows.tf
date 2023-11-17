
# FEATURE: remove-all
resource "twilio_taskrouter_workspaces_workflows_v1" "assign_to_anyone" {
  workspace_sid = twilio_taskrouter_workspaces_v1.flex.sid
  friendly_name = "Assign to Anyone"
  configuration = templatefile("../../taskrouter/assign_to_anyone.json", local.params)
}
# END FEATURE: remove-all

# FEATURE: callback-and-voicemail
resource "twilio_taskrouter_workspaces_workflows_v1" "callback" {
  workspace_sid = twilio_taskrouter_workspaces_v1.flex.sid
  friendly_name = "Callback"
  configuration = templatefile("../../taskrouter/callback.json", local.params)
}
# END FEATURE: callback-and-voicemail

# FEATURE: conversation-transfer
resource "twilio_taskrouter_workspaces_workflows_v1" "chat_transfer" {
  workspace_sid = twilio_taskrouter_workspaces_v1.flex.sid
  friendly_name = "Chat Transfer"
  configuration = templatefile("../../taskrouter/chat_transfer.json", local.params)
}
# END FEATURE: conversation-transfer

# FEATURE: internal-call
resource "twilio_taskrouter_workspaces_workflows_v1" "internal_call" {
  workspace_sid = twilio_taskrouter_workspaces_v1.flex.sid
  friendly_name = "Internal Call"
  configuration = templatefile("../../taskrouter/internal_call.json", local.params)
}
# END FEATURE: internal-call

locals{
  params = {

# FEATURE: remove-all
    "QUEUE_SID_EVERYONE" = twilio_taskrouter_workspaces_task_queues_v1.everyone.sid
    "QUEUE_SID_TEMPLATE_EXAMPLE_SALES" = twilio_taskrouter_workspaces_task_queues_v1.template_example_sales.sid
    "QUEUE_SID_TEMPLATE_EXAMPLE_SUPPORT" = twilio_taskrouter_workspaces_task_queues_v1.template_example_support.sid
# END FEATURE: remove-all

# FEATURE: internal-call
    "QUEUE_SID_INTERNAL_CALLS" = twilio_taskrouter_workspaces_task_queues_v1.internal_calls.sid
# END FEATURE: internal-call

  }
}
