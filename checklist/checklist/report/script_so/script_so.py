# Copyright (c) 2013, Deepak and contributors
# License: MIT. See LICENSE

import frappe

# translator

from frappe import _
# this retrieves filter from the browser
# this event is triggered everytime the filter changes
# this is taken care by ff

def execute(filters=None):
	# check what is in the filters
	# prints to console
	# print (filters, "\n\n") 

	# initializing the 2 arrays
	columns, data = get_coloumns(), get_data(filters)
	
	# print (data)
	# returning

	return columns, data

def get_data (filters) :
	
	# get filters from the front end
	_from = filters.get ("creation_from")
	_to = filters.get ("creation_to")

	return frappe.db.sql (f""" 
		SELECT so.name, si.item_code, si.quantity, si.amount FROM `tabSales Order Items` si, `tabSales Order` so 
			WHERE si.parent = so.name AND
				so.creation BETWEEN '{_from}' AND '{_to}';	;
	""", as_dict=1)

	# 	SELECT name FROM `tabSales Order` 
	# 	WHERE creation BETWEEN '{_from}' and '{_to}';
	# 

def get_coloumns () : 
	return  [
		{
			"fieldname": "name",
			"label": _("Sales Order"),
			"fieldtype": "Link",
			"options" : "Sales Order",
			"width": 100		
		}, 
		{
			"fieldname": "quantity",
			"label": _("Quantity"),
			"fieldtype": "Float",
			"width": 100		
		}, 
		{
			"fieldname": "item_code",
			"label": _("Item Code"),
			"fieldtype": "Link",
			"options" : "Item",
			"width": 100		
		}, 
		{
			"fieldname": "amount",
			"label": _("Amount"),
			"fieldtype": "Currency",
			"width": 100		
		}, 
	]



