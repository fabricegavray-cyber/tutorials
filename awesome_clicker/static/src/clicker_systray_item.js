/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_service";

class ClickerSystrayItem extends Component {
    static template = "awesome_clicker.ClickerSystrayItem";

    setup() {
        this.action = useService("action");
        this.clicker = useClicker();
        this.state = useState(this.clicker.state);


        useExternalListener(document.body, "click", this.onExternalClick.bind(this), {
            capture: true,  // capture AVANT que le clic arrive au composant
        });
    }

    onExternalClick() {
        this.clicker.increment(1);
    }

    increment(ev) {
        ev.stopPropagation();
        this.clicker.increment(10);
    }

    openGame() {
        this.action.doAction({
            type: "ir.actions.client",
            tag: "awesome_clicker.client_action",
            target: "new",
            name: "Clicker",
        });
    }
}

registry.category("systray").add("awesome_clicker.ClickerSystrayItem", {
    Component: ClickerSystrayItem,
});