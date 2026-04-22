from odoo import Command, models

class EstateProperty(models.Model):
    _inherit = "estate.property"

    def action_sold(self):
        # On crée la facture AVANT d'appeler super()
        # pour s'assurer que la propriété n'est pas encore marquée comme vendue
        for record in self:
            self.env["account.move"].create({
                # Le client est l'acheteur de la propriété
                "partner_id": record.buyer_id.id,
                # "out_invoice" = Facture Client
                "move_type": "out_invoice",
                # Les lignes de facture sont créées en même temps
                "invoice_line_ids": [
                    # Ligne 1 : 6% du prix de vente
                    Command.create({
                        "name": f"Commission 6% - {record.name}",
                        "quantity": 1,
                        "price_unit": record.selling_price * 0.06,
                    }),
                    # Ligne 2 : Frais administratifs fixes
                    Command.create({
                        "name": "Frais administratifs",
                        "quantity": 1,
                        "price_unit": 100.00,
                    }),
                ],
            })

        # On appelle la méthode originale pour garder le comportement existant
        # (marquer la propriété comme vendue)
        return super().action_sold()