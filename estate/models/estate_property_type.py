from odoo import fields, models

class EstatePropertyType(models.Model):
    _name = "estate.property.type"
    _description = "Real Estate Property Type"

    name = fields.Char(required=True)

    _sql_constraints = [
        ('unique_name', 'UNIQUE(name)', 
         'Le nom du type de propriété doit être unique.'),
    ]