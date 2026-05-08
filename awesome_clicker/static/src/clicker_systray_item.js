/** @odoo-module **/
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_service";
import { ClickValue } from "./click_value";

class ClickerSystrayItem extends Component {
    static components = { ClickValue };
    static template = "awesome_clicker.ClickerSystrayItem";

    setup() {
        this.action = useService("action");
        this.clicker = useClicker();  

        useExternalListener(document.body, "click", this.onExternalClick.bind(this), {
            capture: true,
        });
    }

    onExternalClick() {
        this.clicker.increment(1);
    }

    increment(ev) {
        ev.stopImmediatePropagation();
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