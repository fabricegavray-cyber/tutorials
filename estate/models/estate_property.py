from datetime import date

from dateutil.relativedelta import relativedelta

from odoo import api, fields, models
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero


class EstateProperty(models.Model):
    """Model for real estate properties."""
    _name = "estate.property"
    _description = "Real Estate Property"   
    _order = "id desc"

    name = fields.Char(required=True)
    description = fields.Text()
    postcode = fields.Char()
    date_availability = fields.Date(
        copy=False,
        default=lambda self: date.today() + relativedelta(months=3)
    )
    expected_price = fields.Float(required=True)
    selling_price = fields.Float(readonly=True, copy=False)
    bedrooms = fields.Integer(default=2)
    living_area = fields.Integer()
    facades = fields.Integer()
    garage = fields.Boolean()
    garden = fields.Boolean()
    garden_area = fields.Integer()
    garden_orientation = fields.Selection(
        selection=[
            ('north', 'North'),
            ('south', 'South'),
            ('east', 'East'),
            ('west', 'West'),
        ]
    )
    active = fields.Boolean(default=True)
    property_type_id = fields.Many2one("estate.property.type", string="Property Type")
    buyer_id = fields.Many2one("res.partner", string="Buyer", copy=False)
    salesperson_id = fields.Many2one(
        "res.users", string="Salesperson", default=lambda self: self.env.user)
    tag_ids = fields.Many2many("estate.property.tag", string="Tags")
    offer_ids = fields.One2many("estate.property.offer", "property_id", string="Offers")
    state = fields.Selection(
        selection=[
            ('new', 'New'),
            ('offer_received', 'Offer Received'),
            ('offer_accepted', 'Offer Accepted'),
            ('sold', 'Sold'),
            ('cancelled', 'Cancelled'),
        ],
        default='new',
        required=True,
        copy=False,
    )    

    # Computed fields
    total_area = fields.Integer(compute="_compute_total_area")
    best_price = fields.Float(compute="_compute_best_price")

    _sql_constraints = [
        ('check_expected_price', 'CHECK(expected_price > 0)', 
        'Le prix attendu doit être strictement positif.'),
        ('check_selling_price', 'CHECK(selling_price >= 0)', 
        'Le prix de vente doit être positif.'),
    ]

    @api.constrains('selling_price', 'expected_price')
    def _check_selling_price(self):
        """verify the selling price"""
        for record in self:
            # On ignore la vérification si le prix de vente est zéro
            # (aucune offre acceptée encore)
            if float_is_zero(record.selling_price, precision_digits=2):
                continue
            # Le prix de vente ne doit pas être inférieur à 90% du prix attendu
            if float_compare(record.selling_price, 
                             record.expected_price * 0.9, 
                             precision_digits=2) < 0:
                raise ValidationError(
                    self.env._("Le prix de vente ne peut pas être inférieur à 90% du prix attendu. "
                    f"Prix attendu: {record.expected_price}, "
                    f"Minimum accepté: {record.expected_price * 0.9}")
                )

    @api.depends("living_area", "garden_area")
    def _compute_total_area(self):
        """Compute total area as sum of living area and garden area."""
        for record in self:
            record.total_area = record.living_area + record.garden_area

    @api.depends("offer_ids.price")
    def _compute_best_price(self):
        """Compute the best offer price."""
        for record in self:
            record.best_price = max(record.offer_ids.mapped("price"), default=0)

    @api.onchange("garden")
    def _onchange_garden(self):
        """Set default garden area and orientation when garden is enabled."""
        if self.garden:
            self.garden_area = 10
            self.garden_orientation = 'north'
        else:
            self.garden_area = 0
            self.garden_orientation = False

    def action_cancel(self):
        """Check that selling price is at least 90% of expected price."""
        for record in self:
            if record.state == 'sold':
                raise UserError(self.env._("Une propriété vendue ne peut pas être annulée."))
            record.state = 'cancelled'
        return True

    def action_sold(self):
        """Mark the property as sold."""
        for record in self:
            if record.state == 'cancelled':
                raise UserError(self.env._("Une propriété annulée ne peut pas être vendue."))
            record.state = 'sold'
        return True   

    @api.ondelete(at_uninstall=False)
    def _check_state_before_delete(self):
        """Check the status before delete"""
        for record in self:
            if record.state not in ('new', 'canceled'):
                raise UserError(self.env._("Une propriété ne peut être supprimée que si elle est nouvelle ou annulée."))
            