/** @odoo-module **/
import { Component, xml, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_service";
import { ClickValue } from "./click_value";

class ClickerClientAction extends Component {
    static components = {  ClickValue };

    static template = xml`
        <div class="p-3">
        <h2>Clicker Game</h2>
        <p>Bienvenue dans le jeu !</p>
    </div>
    <div class="p-3">
        <h2>Clicks: <ClickValue value="state.clicks"/></h2>
        <button class="btn btn-primary" t-on-click="increment">+10</button>
    </div>
    `;

    setup() {
        this.clicker = useClicker();
        this.state = useState(this.clicker.state);
    }

    increment(ev) {
        ev.stopPropagation();
        this.clicker.increment(10);
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClickerClientAction);