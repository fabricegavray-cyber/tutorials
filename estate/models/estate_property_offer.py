from dateutil.relativedelta import relativedelta

from odoo import api,fields, models
from odoo.exceptions import UserError

class EstatePropertyOffer(models.Model):
    """Model for real estate property offers."""
    _name = "estate.property.offer"
    _description = "Real Estate Property Offer"
    _order = "price desc"

    property_type_id = fields.Many2one(
        related="property_id.property_type_id",
        store=True
    )

    price = fields.Float()
    status = fields.Selection(
        selection=[
            ('accepted', 'Accepted'),
            ('refused', 'Refused'),
        ],
        copy=False,
    )
    partner_id = fields.Many2one("res.partner", required=True)
    property_id = fields.Many2one("estate.property", required=True)
    validity = fields.Integer(default=7)
    date_deadline = fields.Date(
        compute="_compute_date_deadline",
        inverse="_inverse_date_deadline"
    )

    _sql_constraints = [
        ('check_price', 'CHECK(price > 0)', 
        'Le prix d\'une offre doit être strictement positif.'),
    ]

    @api.depends("validity", "create_date")
    def _compute_date_deadline(self):
        """Compute deadline date from validity and creation date."""
        for record in self:
            start = record.create_date.date() if record.create_date else fields.Date.today()
            record.date_deadline = start + relativedelta(days=record.validity)

    def _inverse_date_deadline(self):
        """Compute validity from deadline date."""
        for record in self:
            start = record.create_date.date() if record.create_date else fields.Date.today()
            record.validity = (record.date_deadline - start).days

    def action_accept(self):
        """Compute validity from deadline date."""
        for record in self:
            # Vérifier qu'aucune autre offre n'est déjà acceptée
            other_accepted = record.property_id.offer_ids.filtered(
                lambda o: o.status == 'accepted' and o.id != record.id
            )
            if other_accepted:
                raise UserError(self.env_("Une offre a déjà été acceptée pour cette propriété."))
            record.status = 'accepted'
            # Mettre à jour la propriété
            record.property_id.selling_price = record.price
            record.property_id.buyer_id = record.partner_id
        return True

    def action_refuse(self):
        """Refuse the offer."""
        for record in self:
            record.status = 'refused'
        return True

    @api.model
    def create(self, vals):
        """Create offer"""
        property_id = vals.get('property_id')
        price = vals.get('price')

        property_record = self.env['estate.property'].browse(property_id)

        # Vérifier prix
        existing_offers = property_record.offer_ids
        if existing_offers:
            max_price = max(existing_offers.mapped('price'))
            if price < max_price:
                raise UserError(self.env._("L'offre doit être supérieure aux offres existantes."))

        # Mettre à jour l'état du bien
        property_record.state = 'offer_received'

        return super().create(vals)
    