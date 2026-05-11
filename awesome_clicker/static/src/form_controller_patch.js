/** @odoo-module **/
import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { getReward } from "./clicker_rewards";

patch(FormController.prototype, {
    setup() {
        super.setup();
        this.clicker = useService("clicker");
        this.notification = useService("notification");
        this.action = useService("action");

        // 1% de chance d'avoir une récompense
        if (Math.random() < 0.01) {
            const reward = getReward(this.clicker.level);
            if (reward) {
                this.notification.add(reward.description, {
                    type: "info",
                    sticky: true,
                    buttons: [{
                        name: "Collect",
                        onClick: () => {
                            reward.apply(this.clicker);
                            this.action.doAction({
                                type: "ir.actions.client",
                                tag: "awesome_clicker.client_action",
                                target: "new",
                                name: "Clicker",
                            });
                        },
                    }],
                });
            }
        }
    }
});