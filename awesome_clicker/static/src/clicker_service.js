/** @odoo-module **/
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";
import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

const clickerService = {
    start() {
        const state = reactive({
            clicks: 0,
            level: 0,
            clickBots: 0,
        });

        // Vérifie les milestones à chaque incrément
        function checkLevel() {
            if (state.clicks >= 1000 && state.level < 1) {
                state.level = 1;
            }
        }

        // Interval : les bots génèrent des clics toutes les 10s
        setInterval(() => {
            state.clicks += 10 * state.clickBots;
        }, 10000);

        return {
            state,
            increment(inc = 1) {
                state.clicks += inc;
                checkLevel();
            },
            buyClickBot() {
                if (state.clicks >= 1000) {
                    state.clicks -= 1000;
                    state.clickBots += 1;
                }
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