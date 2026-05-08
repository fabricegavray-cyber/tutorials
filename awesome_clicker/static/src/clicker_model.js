/** @odoo-module **/
import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
    clicks = 0;
    level = 0;
    clickBots = 0;

    bus = new EventBus();
    _milestone1kReached = false;

    increment(inc = 1) {
        this.clicks += inc;
        this.checkLevel();
    }

    checkLevel() {
        if (this.clicks >= 1000 && !this._milestone1kReached) {
            this._milestone1kReached = true;
            this.level = 1;
            // Le modèle émet un événement, sans connaître l'UI
            this.bus.trigger("MILESTONE_1K");
        }
    }

    buyClickBot() {
        if (this.clicks >= 1000) {
            this.clicks -= 1000;
            this.clickBots += 1;
        }
    }

    tick() {
        this.clicks += 10 * this.clickBots;
        this.checkLevel();
    }
}