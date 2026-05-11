/** @odoo-module **/
import { registry } from "@web/core/registry";
import { useClicker } from "./clicker_service";
import { useService } from "@web/core/utils/hooks";

registry.category("command_provider").add("clicker", {
    provide(env) {
        const clicker = env.services.clicker;
        const action = env.services.action;

        return [
            {
                name: "Open Clicker Game",
                action() {
                    action.doAction({
                        type: "ir.actions.client",
                        tag: "awesome_clicker.client_action",
                        target: "new",
                        name: "Clicker",
                    });
                },
            },
            {
                name: "Buy 1 ClickBot",
                action() {
                    clicker.buyClickBot();
                },
            },
        ];
    },
});
