/** @odoo-module **/
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";
import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

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

export function useClicker() {
    const clicker = useService("clicker");
    // useState s'abonne aux changements du reactive
    clicker.state = useState(clicker.state);
    return clicker;
}

registry.category("services").add("clicker", clickerService);