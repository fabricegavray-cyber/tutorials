/** @odoo-module **/
import { Component, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClicker } from "./clicker_service";
import { ClickValue } from "./click_value";

class ClickerClientAction extends Component {
    static components = { ClickValue };
    static template = xml`
        <div class="p-3">
            <h2>Clicker Game</h2>
            <h3>Clicks: <ClickValue value="clicker.clicks"/></h3>
            <button class="btn btn-primary" t-on-click="increment">+10</button>

            <div t-if="clicker.level >= 1" class="mt-3">
                <h4>ClickBots: <t t-esc="clicker.clickBots"/></h4>
                <button class="btn btn-success"
                        t-on-click="buyClickBot"
                        t-att-disabled="clicker.clicks lt 1000">
                    Buy ClickBot (1000 clics)
                </button>
            </div>
        </div>
    `;

    setup() {
        this.clicker = useClicker();
    }

    increment(ev) {
        ev.stopImmediatePropagation();
        this.clicker.increment(10);
    }

    buyClickBot() {
        this.clicker.buyClickBot();
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClickerClientAction);
