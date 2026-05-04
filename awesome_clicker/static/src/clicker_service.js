/** @odoo-module **/
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

const clickerService = {
    start() {
        const state = reactive({ clicks: 0 });

        return {
            state,
            increment(inc = 1) {
                state.clicks += inc;
            },
        };
    },
};

registry.category("services").add("clicker", clickerService);