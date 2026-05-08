/** @odoo-module **/
import { Reactive } from "@web/core/utils/reactive";

export class ClickerModel extends Reactive {
    clicks = 0;
    level = 0;
    clickBots = 0;

    increment(inc = 1) {
        this.clicks += inc;
        this.checkLevel();
    }

    checkLevel() {
        if (this.clicks >= 1000 && this.level < 1) {
            this.level = 1;
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