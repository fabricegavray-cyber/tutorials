/** @odoo-module **/
import { Component, xml, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

class ClickerClientAction extends Component {
    static template = xml`
        <div class="p-3">
        <h2>Clicker Game</h2>
        <p>Bienvenue dans le jeu !</p>
    </div>
    <div class="p-3">
        <h2>Clicks: <t t-esc="state.clicks"/></h2>
        <button class="btn btn-primary" t-on-click="increment">+10</button>
    </div>
    `;

    setup() {
        this.clicker = useService("clicker");
        this.state = useState(this.clicker.state);
    }

    increment(ev) {
        ev.stopPropagation();
        this.clicker.increment(10);
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClickerClientAction);