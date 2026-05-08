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
    <div class="p-3">
        <h2>Clicks: <ClickValue value="state.clicks"/></h2>
        <button class="btn btn-primary" t-on-click="increment">+10</button>

        <div t-if="state.level >= 1" class="mt-3">
            <h4>ClickBots: <t t-esc="state.clickBots"/></h4>
            <button class="btn btn-success"
                    t-on-click="buyClickBot"
                    t-att-disabled="state.clicks lt 1000">
                Buy ClickBot (1000 clics)
            </button>
        </div>
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

    buyClickBot() {
        this.clicker.buyClickBot();
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClickerClientAction);