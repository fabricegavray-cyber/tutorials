/** @odoo-module **/
import { KanbanController } from "@web/views/kanban/kanban_controller";
import { registry } from "@web/core/registry";
import { kanbanView } from "@web/views/kanban/kanban_view";

export class AwesomeKanbanController extends KanbanController {}

export const awesomeKanbanView = {
    ...kanbanView,
    Controller: AwesomeKanbanController,
};

registry.category("views").add("awesome_kanban", awesomeKanbanView);