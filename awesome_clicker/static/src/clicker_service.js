/** @odoo-module **/
import { registry } from "@web/core/registry";
import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { ClickerModel } from "./clicker_model";

const clickerService = {
    dependencies: ["effect"],  
    start(env, { effect }) {   
        const model = new ClickerModel();

        model.bus.addEventListener("MILESTONE_1K", () => {
            effect.add({
                type: "rainbow_man",
                message: "1000 clics ! Vous pouvez maintenant acheter des ClickBots !",
            });
        });

        setInterval(() => model.tick(), 10000);

        return model;
    },
};

export function useClicker() {
    return useState(useService("clicker"));
}

registry.category("services").add("clicker", clickerService);
