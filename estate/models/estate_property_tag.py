from odoo import fields, models

class EstatePropertyTag(models.Model):
    _name = "estate.property.tag"
    _description = "Real Estate Property Tag"

    name = fields.Char(required=True)

    _sql_constraints = [
        ('unique_name', 'UNIQUE(name)', 
         'Le nom du tag doit être unique.'),
    ]